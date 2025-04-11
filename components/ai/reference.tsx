import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TextPreviewCardProps {
  name: string;
  similarity: number;
  maxLines?: number;
}

export function ReferenceCard({
  name,
  similarity,
  maxLines = 10,
}: TextPreviewCardProps) {
  // Format similarity as percentage with 2 decimal places
  const similarityPercentage = (similarity * 100).toFixed(2);

  // Truncate content if it exceeds maxLines
  const lines = name.split("\n");
  const truncated = lines.length > maxLines;
  const displayContent = truncated
    ? lines.slice(0, maxLines).join("\n") + "\n..."
    : name;

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <Badge className="px-2 py-1 text-xs font-medium">Reference</Badge>
          <Badge
            className="px-2 py-1 text-xs font-medium"
            style={{
              backgroundColor: `rgba(52, 211, 153, ${similarity})`,
              color: similarity > 0.5 ? "white" : "black",
            }}
          >
            {similarityPercentage}% match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="rounded-md bg-muted p-3 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap break-words">
            {displayContent}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
