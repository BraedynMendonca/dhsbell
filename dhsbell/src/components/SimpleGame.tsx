import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

const SimpleGame: React.FC = () => {
  const [state, setState] = useState<'waiting' | 'ready' | 'clicked'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (state === 'ready') {
      // Random delay between 1-5 seconds
      const delay = Math.floor(Math.random() * 4000) + 1000;
      timeoutId = setTimeout(() => {
        setStartTime(Date.now());
        setState('clicked');
      }, delay);
    }

    return () => clearTimeout(timeoutId);
  }, [state]);

  const handleClick = () => {
    if (state === 'waiting') {
      setState('ready');
    } else if (state === 'clicked') {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
      
      setState('waiting');
    } else if (state === 'ready') {
      // Clicked too early
      setState('waiting');
      setReactionTime(null);
    }
  };

  const getButtonStyles = () => {
    if (state === 'clicked') {
      return 'bg-green-500 hover:bg-green-600';
    } else if (state === 'ready') {
      return 'bg-red-500 hover:bg-red-600';
    }
    return 'bg-blue-500 hover:bg-blue-600';
  };

  const getButtonText = () => {
    if (state === 'clicked') {
      return 'Click Now!';
    } else if (state === 'ready') {
      return 'Wait for green...';
    }
    return 'Start Test';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          <Timer className="w-5 h-5 mr-2" />
          Reaction Time Test
        </h2>
        {bestTime && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Best Time: {bestTime}ms
          </span>
        )}
      </div>
      
      <div className="text-center">
        {reactionTime && (
          <div className="mb-4">
            <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {reactionTime}ms
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {reactionTime < 200 ? 'Amazing!' : 
               reactionTime < 300 ? 'Great!' : 
               reactionTime < 400 ? 'Good' : 'Keep trying!'}
            </div>
          </div>
        )}

        <button
          onClick={handleClick}
          className={`${getButtonStyles()} text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors w-full`}
        >
          {getButtonText()}
        </button>

        {state === 'ready' && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Click when the button turns green
          </p>
        )}
      </div>
    </div>
  );
};

export default SimpleGame;