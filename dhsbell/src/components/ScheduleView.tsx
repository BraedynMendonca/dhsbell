import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useBellSchedule } from '../context/BellScheduleContext';
import { formatTime12Hour } from '../utils/timeUtils';

const ScheduleView: React.FC = () => {
  const { currentSchedule, currentPeriod } = useBellSchedule();
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter out before/after school periods for display
  const displayPeriods = currentSchedule.periods.filter(period => 
    period.id !== 'before-school' && 
    period.id !== 'after-school' &&
    period.id !== 'weekend'
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fadeIn">
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span>{currentSchedule.name}</span>
        {isExpanded ? 
          <ChevronUp className="w-4 h-4" /> : 
          <ChevronDown className="w-4 h-4" />
        }
      </button>
      
      {isExpanded && (
        <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="py-2 px-4 text-left font-medium text-gray-700 dark:text-gray-300">Period</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700 dark:text-gray-300">Start</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700 dark:text-gray-300">End</th>
              </tr>
            </thead>
            <tbody>
              {displayPeriods.map((period) => {
                const isCurrentPeriod = currentPeriod?.id === period.id;
                
                return (
                  <tr 
                    key={period.id}
                    className={`
                      border-t border-gray-100 dark:border-gray-700 
                      ${isCurrentPeriod ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                    `}
                  >
                    <td className="py-2 px-4 font-medium text-gray-800 dark:text-white">
                      {period.name}
                      {isCurrentPeriod && (
                        <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-400">
                      {formatTime12Hour(period.startTime)}
                    </td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-400">
                      {formatTime12Hour(period.endTime)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;