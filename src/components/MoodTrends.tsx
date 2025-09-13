import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data - in a real app this would come from the backend
const sampleData = [
  { day: "Mon", mood: 4, date: "Dec 9" },
  { day: "Tue", mood: 3, date: "Dec 10" },
  { day: "Wed", mood: 5, date: "Dec 11" },
  { day: "Thu", mood: 2, date: "Dec 12" },
  { day: "Fri", mood: 4, date: "Dec 13" },
  { day: "Sat", mood: 5, date: "Dec 14" },
  { day: "Sun", mood: 4, date: "Dec 15" },
];

const getMoodLabel = (value: number) => {
  const labels = ["", "Poor", "Low", "Neutral", "Good", "Excellent"];
  return labels[value] || "Unknown";
};

const getMoodColor = (value: number) => {
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e", "#ec4899"];
  return colors[value] || "#6b7280";
};

interface MoodTrendsProps {
  data?: Array<{ day: string; mood: number; date: string }>;
}

export const MoodTrends = ({ data = sampleData }: MoodTrendsProps) => {
  const averageMood = data.reduce((sum, item) => sum + item.mood, 0) / data.length;
  
  return (
    <Card className="wellness-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Your Mood Trends
        </h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Past 7 days</span>
          <span className="text-primary font-medium">
            Average: {getMoodLabel(Math.round(averageMood))} ({averageMood.toFixed(1)}/5)
          </span>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              domain={[1, 5]} 
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium">{data.date}</p>
                      <p className="text-sm">
                        Mood: <span className="font-medium">{getMoodLabel(data.mood)}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: getMoodColor(value) }}
            />
            <span className="text-muted-foreground">{getMoodLabel(value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};