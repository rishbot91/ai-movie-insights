"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

import { MovieSearch } from "@/components/movie-search"
import { MovieCard } from "@/components/movie-card"
import { SentimentCard } from "@/components/sentiment-card"
import {
  MovieCardSkeleton,
  SentimentCardSkeleton,
} from "@/components/loading-skeletons"

import type { MovieData, SentimentAnalysis } from "@/lib/types"

export default function HomePage() {

  const [movie, setMovie] = useState<MovieData | null>(null)
  const [sentiment, setSentiment] = useState<SentimentAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch(id: string) {

    setError(null)
    setMovie(null)
    setSentiment(null)
    setLoading(true)

    try {

      const res = await fetch(`/api/movie?imdbId=${id}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch movie")
      }

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found")
      }

      setMovie(data)

      // Temporary sentiment data (replace later with AI)
      setSentiment({
        sentimentLabel: "Positive",
        sentimentScore: 82,
        summary:
          "Audience reactions are largely positive, praising the performances, direction, and engaging storyline.",
        keyThemes: ["Performances", "Storytelling", "Cinematography"],
        audienceAppeal:
          "Strong appeal for viewers who enjoy visually rich films with compelling characters and dramatic storytelling.",
      })

    } catch (err: unknown) {

      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unexpected error occurred")
      }

    } finally {

      setLoading(false)

    }

  }

  return (
    <main className="min-h-screen bg-background">

      {/* Background glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-1/4 h-72 w-72 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:py-16">

        {/* Search Section */}
        <section>
          <MovieSearch onSearch={handleSearch} isLoading={loading} />
        </section>

        {/* Error State */}
        {error && (
          <div
            className="mx-auto flex max-w-md items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col gap-6">
            <MovieCardSkeleton />
            <SentimentCardSkeleton />
          </div>
        )}

        {/* Results */}
        {movie && !loading && (
          <div className="flex flex-col gap-6">
            <MovieCard movie={movie} />
            {sentiment && <SentimentCard sentiment={sentiment} />}
          </div>
        )}

        {/* Empty State */}
        {!movie && !loading && !error && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              Enter an IMDb ID above to get started
            </p>
            <p className="text-xs text-muted-foreground/60">
              Tip: Example — imdb.com/title/tt1375666
            </p>
          </div>
        )}

      </div>

    </main>
  )
}