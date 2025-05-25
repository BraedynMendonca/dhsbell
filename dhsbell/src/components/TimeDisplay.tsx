import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getCurrentFormattedDate, getDayOfWeek } from '../utils/timeUtils';

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }));
      setCurrentDate(getCurrentFormattedDate());
      setDayOfWeek(getDayOfWeek());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 fadeIn">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dublin High School
        </h1>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="w-5 h-5 mr-1" />
          <span className="text-lg font-medium">{currentTime}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {currentDate} • {dayOfWeek}
      </p>
    </div>
  );
};

export default TimeDisplay;