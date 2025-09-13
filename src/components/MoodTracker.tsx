import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Smile, Meh, Frown, Angry } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { icon: Heart, label: "Excellent", value: 5, color: "text-pink-500" },
  { icon: Smile, label: "Good", value: 4, color: "text-green-500" },
  { icon: Meh, label: "Neutral", value: 3, color: "text-yellow-500" },
  { icon: Frown, label: "Low", value: 2, color: "text-orange-500" },
  { icon: Angry, label: "Poor", value: 1, color: "text-red-500" },
];

interface MoodTrackerProps {
  onMoodSelected?: (mood: number) => void;
}

export const MoodTracker = ({ onMoodSelected }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (moodValue: number) => {
    setSelectedMood(moodValue);
    onMoodSelected?.(moodValue);
    
    const moodLabel = moods.find(m => m.value === moodValue)?.label;
    toast({
      title: "Mood recorded!",
      description: `Your mood has been set to ${moodLabel}`,
    });
  };

  return (
    <Card className="wellness-card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          How are you feeling today?
        </h2>
        <p className="text-muted-foreground">
          Track your daily mood to build wellness insights
        </p>
      </div>
      
      <div className="flex justify-center gap-4 flex-wrap">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.value;
          
          return (
            <Button
              key={mood.value}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              className={`mood-button flex-col h-20 w-20 p-2 ${
                isSelected ? "gradient-primary text-primary-foreground" : ""
              }`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <Icon className={`h-6 w-6 mb-1 ${isSelected ? "" : mood.color}`} />
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};