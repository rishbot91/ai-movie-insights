import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get("imdbId");

  if (!imdbId) {
    return NextResponse.json(
      { error: "IMDb ID required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.OMDB_API_KEY;

  const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`;

  const response = await fetch(url);

  const data = await response.json();

  return NextResponse.json(data);
}