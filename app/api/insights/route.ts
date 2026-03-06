import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import type {
  MovieInsightResponse,
  SentimentAnalysis,
  MovieData,
} from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get("imdbId");

  if (!imdbId) {
    return NextResponse.json(
      { error: "Missing imdbId parameter" },
      { status: 400 },
    );
  }

  if (!process.env.OMDB_API_KEY) {
    return NextResponse.json(
      { error: "OMDB API key not configured" },
      { status: 500 },
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&apikey=${process.env.OMDB_API_KEY}`,
    );

    const movie: MovieData = await res.json();

    if (movie.Response === "False") {
      return NextResponse.json({ error: movie.Error }, { status: 404 });
    }

    const prompt = `
Analyze audience sentiment for the following movie.

Title: ${movie.Title}
Plot: ${movie.Plot}

Return ONLY valid JSON in this format:

{
  "sentimentLabel": "Positive | Negative | Mixed | Neutral",
  "sentimentScore": number between 0 and 100,
  "summary": "2-3 sentence audience reaction summary",
  "keyThemes": ["theme1", "theme2", "theme3"],
  "audienceAppeal": "who this movie appeals to"
}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent(prompt);

    const aiText = result.response.text() || "{}";

    let sentiment: SentimentAnalysis;

    try {
      sentiment = JSON.parse(aiText);
    } catch {
      // fallback in case AI returns invalid JSON
      sentiment = {
        sentimentLabel: "Neutral",
        sentimentScore: 50,
        summary:
          "Sentiment analysis could not be fully generated, but the film appears to have mixed audience reactions.",
        keyThemes: ["Story", "Characters", "Visuals"],
        audienceAppeal:
          "Appeals to viewers interested in the film's genre and themes.",
      };
    }

    const response: MovieInsightResponse = {
      movie,
      sentiment,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Insights API error:", error);

    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 },
    );
  }
}
