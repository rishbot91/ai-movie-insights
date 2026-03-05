"use client"

import { useState } from "react"
import { Search, Film } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const EXAMPLE_MOVIES = [
  { id: "tt1375666", title: "Inception" },
  { id: "tt0111161", title: "Shawshank Redemption" },
  { id: "tt33014583", title: "Dhurandhar" },
  { id: "tt0468569", title: "The Dark Knight" },
  { id: "tt0120737", title: "LOTR: Fellowship" },
]

interface MovieSearchProps {
  onSearch: (imdbId: string) => void
  isLoading: boolean
}

export function MovieSearch({ onSearch, isLoading }: MovieSearchProps) {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState("")

  const validateAndSearch = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      setError("Please enter an IMDb ID")
      return
    }

    const imdbIdPattern = /^tt\d{7,8}$/
    if (!imdbIdPattern.test(trimmed)) {
      setError('Invalid format. IMDb IDs start with "tt" followed by 7-8 digits')
      return
    }

    setError("")
    onSearch(trimmed)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validateAndSearch(inputValue)
  }

  const handleExampleClick = (id: string) => {
    setInputValue(id)
    setError("")
    onSearch(id)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Film className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            CineInsight
          </h1>
        </div>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          Enter an IMDb ID to get detailed movie information and AI-powered audience sentiment analysis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="e.g. tt1375666"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              if (error) setError("")
            }}
            className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground font-mono text-sm"
            disabled={isLoading}
            aria-label="IMDb ID input"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="shrink-0">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              <span className="sr-only">Analyzing</span>
            </span>
          ) : (
            "Analyze"
          )}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Try an example:</span>
        <div className="flex flex-wrap justify-center gap-2">
          {EXAMPLE_MOVIES.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleExampleClick(movie.id)}
              disabled={isLoading}
              className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {movie.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
