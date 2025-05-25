import React from 'react';
import { Clock8 } from 'lucide-react';
import { useBellSchedule } from '../context/BellScheduleContext';
import { formatTime12Hour } from '../utils/timeUtils';

const CurrentPeriod: React.FC = () => {
  const { 
    currentPeriod, 
    timeRemainingInCurrentPeriod, 
    formattedTimeRemainingInCurrentPeriod,
    percentageComplete 
  } = useBellSchedule();

  if (!currentPeriod) {
    return (
      <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No active period
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          School is not in session right now.
        </p>
      </div>
    );
  }

  const isBeforeOrAfterSchool = 
    currentPeriod.id === 'before-school' || 
    currentPeriod.id === 'after-school' ||
    currentPeriod.id === 'weekend';

  const startTime = formatTime12Hour(currentPeriod.startTime);
  const endTime = formatTime12Hour(currentPeriod.endTime);

  return (
    <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
            {isBeforeOrAfterSchool ? 'School is not in session' : currentPeriod.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {startTime} - {endTime}
          </p>
        </div>
        {!isBeforeOrAfterSchool && (
          <div className="flex items-center bg-blue-100 dark:bg-blue-800/30 px-3 py-1 rounded-full">
            <Clock8 className="w-4 h-4 text-blue-600 dark:text-blue-300 mr-1" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
              {formattedTimeRemainingInCurrentPeriod} left
            </span>
          </div>
        )}
      </div>

      {!isBeforeOrAfterSchool && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${percentageComplete}%` }}
          />
        </div>
      )}
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Started</span>
        <span>{Math.floor(percentageComplete)}% Complete</span>
        <span>Ends</span>
      </div>
    </div>
  );
};

export default CurrentPeriod;