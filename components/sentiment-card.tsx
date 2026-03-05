import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Users,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { SentimentAnalysis } from "@/lib/types"

interface SentimentCardProps {
  sentiment: SentimentAnalysis
}

function getSentimentConfig(label: SentimentAnalysis["sentimentLabel"]) {
  switch (label) {
    case "Positive":
      return {
        icon: TrendingUp,
        badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        barColor: "bg-emerald-500",
        scoreColor: "text-emerald-400",
      }
    case "Negative":
      return {
        icon: TrendingDown,
        badgeClass: "bg-red-500/15 text-red-400 border-red-500/30",
        barColor: "bg-red-500",
        scoreColor: "text-red-400",
      }
    case "Mixed":
      return {
        icon: Minus,
        badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        barColor: "bg-amber-500",
        scoreColor: "text-amber-400",
      }
    case "Neutral":
      return {
        icon: Minus,
        badgeClass: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        barColor: "bg-blue-500",
        scoreColor: "text-blue-400",
      }
  }
}

export function SentimentCard({ sentiment }: SentimentCardProps) {
  const config = getSentimentConfig(sentiment.sentimentLabel)
  const SentimentIcon = config.icon

  return (
    <Card className="border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Sentiment Analysis
          </CardTitle>
          <Badge variant="outline" className={config.badgeClass}>
            <SentimentIcon className="mr-1 h-3 w-3" />
            {sentiment.sentimentLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {/* Sentiment Score */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Sentiment Score
            </span>
            <span className={`text-lg font-bold font-mono ${config.scoreColor}`}>
              {sentiment.sentimentScore}
              <span className="text-sm text-muted-foreground font-normal">
                /100
              </span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${config.barColor}`}
              style={{ width: `${sentiment.sentimentScore}%` }}
            />
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Summary */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
            Summary
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {sentiment.summary}
          </p>
        </div>

        {/* Key Themes */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Key Themes
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sentiment.keyThemes.map((theme, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs"
              >
                {theme}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Audience Appeal */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            Audience Appeal
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {sentiment.audienceAppeal}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
