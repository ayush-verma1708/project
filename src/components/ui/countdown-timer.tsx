import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ hours, minutes, seconds }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: seconds || 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex justify-center md:justify-start space-x-4 mb-6">
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold">
          {padZero(timeLeft.hours)}
        </div>
        <span className="text-xs mt-1">Hours</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold">
          {padZero(timeLeft.minutes)}
        </div>
        <span className="text-xs mt-1">Minutes</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold">
          {padZero(timeLeft.seconds)}
        </div>
        <span className="text-xs mt-1">Seconds</span>
      </div>
    </div>
  );
}
