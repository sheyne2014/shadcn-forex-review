import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface ExecutiveSummaryProps {
  summary: {
    text: string;
    overallVerdict: string;
    scores: Array<{
      label: string;
      score: string;
    }>;
    overallScore: string;
  };
  brokerName: string;
}

export function BrokerExecutiveSummary({ summary, brokerName }: ExecutiveSummaryProps) {
  // Convert score strings to numbers for the progress bars
  const normalizedScores = summary.scores.map(item => ({
    name: item.label,
    score: parseInt(item.score.split('/')[0]) * 10
  }));

  const overallScoreNumber = parseInt(summary.overallScore.split('/')[0]) * 10;

  return (
    <div className="w-full space-y-6 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-2">{brokerName} Executive Summary</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Detailed Review</Badge>
            <Badge variant="secondary">Expert Analysis</Badge>
            <Badge className="bg-green-100 text-green-800">Updated Summary</Badge>
          </div>
        </div>
        <Card className="p-6 text-center bg-primary/5">
          <div className="text-3xl font-bold text-primary mb-1">{overallScoreNumber}%</div>
          <div className="text-sm text-muted-foreground">Overall Rating</div>
        </Card>
      </div>

      {/* Summary Text */}
      <Card className="p-6">
        <p className="text-muted-foreground leading-relaxed">{summary.text}</p>
        <p className="mt-4 font-medium">{summary.overallVerdict}</p>
      </Card>

      {/* Rating Breakdown */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Rating Breakdown</h2>
        <div className="space-y-4">
          {normalizedScores.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{category.name}</span>
                <span className="font-medium">{category.score}%</span>
              </div>
              <Progress value={category.score} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Performance Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {normalizedScores.map((score) => (
          <Card key={score.name} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{score.name}</span>
              <Badge 
                variant={score.score >= 80 ? "default" : "secondary"}
                className={score.score >= 80 ? "bg-green-100 text-green-800" : ""}
              >
                {score.score}%
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}