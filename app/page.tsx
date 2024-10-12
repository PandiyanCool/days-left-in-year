"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const motivationalMessages = [
  "Every day is a new opportunity to make progress!",
  "You've got this! Keep pushing forward!",
  "Small steps lead to big achievements. Stay focused!",
  "Believe in yourself and all that you are capable of!",
  "Your future is created by what you do today, not tomorrow.",
];

export default function Home() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const calculateDaysLeft = () => {
    const now = new Date();
    const endOfYear = new Date(now.getFullYear(), 11, 31);
    const timeDiff = endOfYear.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateProgress = (daysLeft: number) => {
    const totalDays = 365;
    return ((totalDays - daysLeft) / totalDays) * 100;
  };

  const updateCountdown = () => {
    const remaining = calculateDaysLeft();
    setDaysLeft(remaining);
    setProgress(calculateProgress(remaining));
    setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
  };

  useEffect(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Year Countdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">{daysLeft}</h2>
            <p className="text-xl text-gray-600">days left in {new Date().getFullYear()}</p>
          </div>
          <Progress value={progress} className="w-full h-3" />
          <p className="text-sm text-gray-500 text-center">{progress.toFixed(1)}% of the year completed</p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 text-center italic">&quot;{message}&quot;</p>
          </div>
          <Button onClick={updateCountdown} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh Countdown
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}