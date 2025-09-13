import { useState, useEffect } from "react";
import { MoodTracker } from "./MoodTracker";
import { MoodTrends } from "./MoodTrends";
import { WellnessRecommendations } from "./WellnessRecommendations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Heart, Smile } from "lucide-react";
import wellnessHero from "@/assets/wellness-hero.jpg";

const getMoodSentiment = (mood: number) => {
  if (mood >= 4) return { text: "Positive", color: "bg-green-100 text-green-700", icon: Smile };
  if (mood === 3) return { text: "Neutral", color: "bg-yellow-100 text-yellow-700", icon: Brain };
  return { text: "Needs attention", color: "bg-orange-100 text-orange-700", icon: Heart };
};

const getWellnessInsight = (mood: number) => {
  if (mood >= 4) return "You're doing great! Keep up the positive momentum.";
  if (mood === 3) return "You're in balance. Consider adding some energizing activities.";
  return "Take some time for self-care. Small steps can make a big difference.";
};

export const WellnessDashboard = () => {
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<Array<{ day: string; mood: number; date: string }>>([]);

  // Load saved mood data on component mount
  useEffect(() => {
    const savedMood = localStorage.getItem("currentMood");
    const savedHistory = localStorage.getItem("moodHistory");
    
    if (savedMood) {
      setCurrentMood(parseInt(savedMood));
    }
    
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    } else {
      // Sample data for demo
      const sampleData = [
        { day: "Mon", mood: 4, date: "Dec 9" },
        { day: "Tue", mood: 3, date: "Dec 10" },
        { day: "Wed", mood: 5, date: "Dec 11" },
        { day: "Thu", mood: 2, date: "Dec 12" },
        { day: "Fri", mood: 4, date: "Dec 13" },
        { day: "Sat", mood: 5, date: "Dec 14" },
        { day: "Sun", mood: 4, date: "Dec 15" },
      ];
      setMoodHistory(sampleData);
    }
  }, []);

  const handleMoodSelected = (mood: number) => {
    setCurrentMood(mood);
    localStorage.setItem("currentMood", mood.toString());
    
    // Add to history (in a real app, this would be handled by the backend)
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const updatedHistory = [...moodHistory];
    updatedHistory[updatedHistory.length - 1] = { day: dayName, mood, date: dateStr };
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
  };

  const averageMood = moodHistory.length > 0 
    ? moodHistory.reduce((sum, item) => sum + item.mood, 0) / moodHistory.length 
    : 0;

  const sentiment = currentMood ? getMoodSentiment(currentMood) : null;
  const SentimentIcon = sentiment?.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${wellnessHero})` }}
        />
        <div className="relative gradient-primary">
          <div className="container mx-auto px-4 py-16 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Wellness Journey
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Track your mood, understand your patterns, improve your well-being
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="wellness-card text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">Average Mood</h3>
            <p className="text-2xl font-bold text-primary">
              {averageMood > 0 ? averageMood.toFixed(1) : "--"}
            </p>
            <p className="text-sm text-muted-foreground">Past 7 days</p>
          </Card>
          
          <Card className="wellness-card text-center">
            <Brain className="h-8 w-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">Sentiment Analysis</h3>
            {sentiment && SentimentIcon && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <SentimentIcon className="h-5 w-5" />
                <Badge className={sentiment.color}>
                  {sentiment.text}
                </Badge>
              </div>
            )}
            {!currentMood && (
              <p className="text-sm text-muted-foreground mt-2">Track your mood first</p>
            )}
          </Card>
          
          <Card className="wellness-card text-center">
            <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-foreground">Wellness Score</h3>
            <p className="text-2xl font-bold text-pink-500">
              {currentMood ? Math.round((currentMood / 5) * 100) : "--"}%
            </p>
            <p className="text-sm text-muted-foreground">Today's score</p>
          </Card>
        </div>

        {/* Current insight */}
        {currentMood && (
          <Card className="wellness-card mb-8 gradient-calm">
            <div className="text-center">
              <Brain className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Today's Insight</h3>
              <p className="text-muted-foreground">
                {getWellnessInsight(currentMood)}
              </p>
            </div>
          </Card>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <MoodTracker onMoodSelected={handleMoodSelected} />
            <WellnessRecommendations currentMood={currentMood || undefined} />
          </div>
          
          <div>
            <MoodTrends data={moodHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};