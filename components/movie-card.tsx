import Image from "next/image";
import { Star, Clock, Calendar, Award, DollarSign, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { MovieData } from "@/lib/types";

interface MovieCardProps {
  movie: MovieData;
}

export function MovieCard({ movie }: MovieCardProps) {
  const genres = movie.Genre?.split(", ") || [];
  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <Card className="overflow-hidden border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Poster */}
          <div className="shrink-0 sm:w-64 p-4">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md">
              {hasPoster ? (
                <Image
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-secondary text-muted-foreground">
                  <span className="text-sm">No poster available</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col gap-4 p-5">
            {/* Title + Year */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
                {movie.Title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-mono">{movie.Year}</span>
                <span className="text-border">|</span>
                <span>{movie.Rated}</span>
                <span className="text-border">|</span>
                <span>{movie.Runtime}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Ratings row */}
            <div className="flex flex-wrap gap-3">
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {movie.imdbRating}
                  </span>
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              )}
              {movie.Metascore && movie.Metascore !== "N/A" && (
                <div className="flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5">
                  <span className="text-xs text-muted-foreground">
                    Metascore
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {movie.Metascore}
                  </span>
                </div>
              )}
            </div>

            {/* Plot */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {movie.Plot}
            </p>

            <Separator className="bg-border" />

            {/* Meta grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MetaItem
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="Director"
                value={movie.Director}
              />
              <MetaItem
                icon={<Globe className="h-3.5 w-3.5" />}
                label="Cast"
                value={movie.Actors}
              />
              {movie.Awards && movie.Awards !== "N/A" && (
                <MetaItem
                  icon={<Award className="h-3.5 w-3.5" />}
                  label="Awards"
                  value={movie.Awards}
                />
              )}
              {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                <MetaItem
                  icon={<DollarSign className="h-3.5 w-3.5" />}
                  label="Box Office"
                  value={movie.BoxOffice}
                />
              )}
              <MetaItem
                icon={<Clock className="h-3.5 w-3.5" />}
                label="Released"
                value={movie.Released}
              />
              <MetaItem
                icon={<Globe className="h-3.5 w-3.5" />}
                label="Language"
                value={movie.Language}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  if (!value || value === "N/A") return null;
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm text-foreground">{value}</span>
      </div>
    </div>
  );
}
