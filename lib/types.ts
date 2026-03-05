export interface MovieData {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: { Source: string; Value: string }[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
  Error?: string
}

export interface SentimentAnalysis {
  sentimentLabel: "Positive" | "Negative" | "Mixed" | "Neutral"
  sentimentScore: number
  summary: string
  keyThemes: string[]
  audienceAppeal: string
}

export interface MovieInsightResponse {
  movie: MovieData
  sentiment: SentimentAnalysis
}
