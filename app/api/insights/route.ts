import { NextResponse } from "next/server";

import type {
  MovieInsightResponse,
  SentimentAnalysis,
  MovieData,
} from "@/lib/types";

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

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&apikey=${process.env.OMDB_API_KEY}`,
    );

    const movie: MovieData = await res.json();

    if (movie.Response === "False") {
      return NextResponse.json({ error: movie.Error }, { status: 404 });
    }

    // Temporary sentiment (will replace with AI next)
    const sentiment: SentimentAnalysis = {
      sentimentLabel: "Positive",
      sentimentScore: 84,
      summary:
        "Audience reactions are mostly positive, highlighting strong performances and engaging storytelling.",
      keyThemes: ["Storytelling", "Acting", "Visuals"],
      audienceAppeal:
        "Appeals to viewers who enjoy high-production films with strong characters and immersive plots.",
    };

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
