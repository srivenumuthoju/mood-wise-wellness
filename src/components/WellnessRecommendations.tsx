import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Book, Music, Coffee, Users, Zap } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Take a 5-minute breathing break",
    description: "Deep breathing can help reduce stress and improve focus",
    icon: Lightbulb,
    category: "Mindfulness",
    duration: "5 min",
    mood: "stressed",
  },
  {
    id: 2,
    title: "Listen to calming music",
    description: "Soft instrumental music can help lift your mood",
    icon: Music,
    category: "Audio",
    duration: "15 min",
    mood: "low",
  },
  {
    id: 3,
    title: "Read an inspiring article",
    description: "Positive content can help shift your mindset",
    icon: Book,
    category: "Learning",
    duration: "10 min",
    mood: "neutral",
  },
  {
    id: 4,
    title: "Connect with a friend",
    description: "Social connections boost happiness and well-being",
    icon: Users,
    category: "Social",
    duration: "20 min",
    mood: "lonely",
  },
  {
    id: 5,
    title: "Take an energizing walk",
    description: "Physical activity releases endorphins and boosts energy",
    icon: Zap,
    category: "Exercise",
    duration: "15 min",
    mood: "low-energy",
  },
  {
    id: 6,
    title: "Practice gratitude",
    description: "Write down three things you're grateful for today",
    icon: Coffee,
    category: "Reflection",
    duration: "5 min",
    mood: "general",
  },
];

const getCategoryColor = (category: string) => {
  const colors = {
    Mindfulness: "bg-calm text-calm-foreground",
    Audio: "bg-peace text-peace-foreground", 
    Learning: "bg-energy text-energy-foreground",
    Social: "bg-focus text-focus-foreground",
    Exercise: "bg-primary text-primary-foreground",
    Reflection: "bg-secondary text-secondary-foreground",
  };
  return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
};

interface WellnessRecommendationsProps {
  currentMood?: number;
}

export const WellnessRecommendations = ({ currentMood = 3 }: WellnessRecommendationsProps) => {
  // Filter recommendations based on mood
  const filteredRecommendations = recommendations.slice(0, 3);

  return (
    <Card className="wellness-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Personalized Recommendations
        </h2>
        <p className="text-muted-foreground">
          Activities tailored to help improve your well-being
        </p>
      </div>
      
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => {
          const Icon = rec.icon;
          
          return (
            <div key={rec.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{rec.title}</h3>
                    <Badge variant="secondary" className={getCategoryColor(rec.category)}>
                      {rec.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {rec.duration}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="mood-button"
                    >
                      Try it
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary">
          View all recommendations
        </Button>
      </div>
    </Card>
  );
};