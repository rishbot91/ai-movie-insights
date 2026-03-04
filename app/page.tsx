"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Movie = {
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Actors: string;
  imdbRating: string;
};

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setError(null);
    setMovie(null);

    const trimmed = imdbId.trim();

    if (!/^tt\d{7,8}$/.test(trimmed)) {
      setError("Please enter a valid IMDb ID (example: tt0133093)");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/movie?imdbId=${trimmed}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMovie(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">
          AI Movie Insight Builder
        </h1>

        <Card>
          <CardContent className="p-6 flex gap-3">
            <Input
              placeholder="Enter IMDb ID (example: tt0133093)"
              value={imdbId}
              onChange={(e) => setImdbId(e.target.value)}
            />

            <Button onClick={handleClick}>
              {loading ? "Loading..." : "Get Insights"}
            </Button>
          </CardContent>
        </Card>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {movie && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Image
                  src={movie.Poster}
                  alt={movie.Title}
                  width={300}
                  height={450}
                  className="rounded-lg"
                />

                <div className="md:col-span-2 space-y-2">
                  <h2 className="text-2xl font-semibold">{movie.Title}</h2>

                  <p>Year: {movie.Year}</p>
                  <p>Rating: {movie.imdbRating}</p>

                  <p className="text-sm text-gray-400">Cast: {movie.Actors}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Plot</h3>

                <p className="text-gray-300">{movie.Plot}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
