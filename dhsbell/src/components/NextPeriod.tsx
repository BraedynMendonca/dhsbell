import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useBellSchedule } from '../context/BellScheduleContext';
import { formatTime12Hour } from '../utils/timeUtils';

const NextPeriod: React.FC = () => {
  const { nextPeriod, formattedTimeUntilNextPeriod } = useBellSchedule();

  if (!nextPeriod || nextPeriod.id === 'weekend' || nextPeriod.id === 'after-school') {
    return null;
  }

  const startTime = formatTime12Hour(nextPeriod.startTime);
  const endTime = formatTime12Hour(nextPeriod.endTime);

  return (
    <div className="mb-6 fadeIn">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center">
        <Clock className="w-4 h-4 mr-1" />
        Coming up in {formattedTimeUntilNextPeriod}
      </h3>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex items-center">
        <div className="flex-1">
          <h4 className="font-medium text-gray-800 dark:text-white">
            {nextPeriod.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {startTime} - {endTime}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
};

export default NextPeriod;