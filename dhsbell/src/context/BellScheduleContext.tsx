import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { schedules, getScheduleForDate, PeriodType, ScheduleType } from '../data/scheduleData';
import { 
  timeStringToMinutes, 
  getCurrentTimeInMinutes, 
  formatDuration 
} from '../utils/timeUtils';

interface BellScheduleContextType {
  currentPeriod: PeriodType | null;
  nextPeriod: PeriodType | null;
  timeUntilNextPeriod: number; // in seconds
  timeRemainingInCurrentPeriod: number; // in seconds
  currentSchedule: ScheduleType;
  formattedTimeUntilNextPeriod: string;
  formattedTimeRemainingInCurrentPeriod: string;
  percentageComplete: number;
}

const BellScheduleContext = createContext<BellScheduleContextType | undefined>(undefined);

export const BellScheduleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPeriod, setCurrentPeriod] = useState<PeriodType | null>(null);
  const [nextPeriod, setNextPeriod] = useState<PeriodType | null>(null);
  const [timeUntilNextPeriod, setTimeUntilNextPeriod] = useState<number>(0);
  const [timeRemainingInCurrentPeriod, setTimeRemainingInCurrentPeriod] = useState<number>(0);
  const [currentSchedule, setCurrentSchedule] = useState<ScheduleType>(schedules[0]);
  const [percentageComplete, setPercentageComplete] = useState<number>(0);

  const updateCurrentPeriodInfo = () => {
    const now = new Date();
    const schedule = getScheduleForDate(now);
    setCurrentSchedule(schedule);
    
    const currentTimeInMinutes = getCurrentTimeInMinutes();
    
    // Find current period
    let foundCurrentPeriod: PeriodType | null = null;
    let foundNextPeriod: PeriodType | null = null;
    
    for (let i = 0; i < schedule.periods.length; i++) {
      const period = schedule.periods[i];
      const startMinutes = timeStringToMinutes(period.startTime);
      const endMinutes = timeStringToMinutes(period.endTime);
      
      if (currentTimeInMinutes >= startMinutes && currentTimeInMinutes < endMinutes) {
        foundCurrentPeriod = period;
        
        // Calculate time remaining in current period (in seconds)
        const remainingMinutes = endMinutes - currentTimeInMinutes;
        setTimeRemainingInCurrentPeriod(remainingMinutes * 60);
        
        // Calculate percentage complete
        const totalDuration = endMinutes - startMinutes;
        const elapsed = currentTimeInMinutes - startMinutes;
        setPercentageComplete(Math.min(100, Math.floor((elapsed / totalDuration) * 100)));
        
        // Find next period
        if (i < schedule.periods.length - 1) {
          foundNextPeriod = schedule.periods[i + 1];
          setTimeUntilNextPeriod(remainingMinutes * 60);
        } else {
          // If it's the last period of the day, the next period is the first period of the next day
          // This is simplified - in reality, you might want to look at tomorrow's schedule
          foundNextPeriod = null;
          setTimeUntilNextPeriod(remainingMinutes * 60);
        }
        
        break;
      }
    }
    
    setCurrentPeriod(foundCurrentPeriod);
    setNextPeriod(foundNextPeriod);
  };

  // Update every second
  useEffect(() => {
    updateCurrentPeriodInfo();
    
    const interval = setInterval(() => {
      updateCurrentPeriodInfo();
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Format the time remaining values for display
  const formattedTimeUntilNextPeriod = formatDuration(Math.ceil(timeUntilNextPeriod / 60));
  const formattedTimeRemainingInCurrentPeriod = formatDuration(Math.ceil(timeRemainingInCurrentPeriod / 60));
  
  return (
    <BellScheduleContext.Provider value={{
      currentPeriod,
      nextPeriod,
      timeUntilNextPeriod,
      timeRemainingInCurrentPeriod,
      currentSchedule,
      formattedTimeUntilNextPeriod,
      formattedTimeRemainingInCurrentPeriod,
      percentageComplete
    }}>
      {children}
    </BellScheduleContext.Provider>
  );
};

export const useBellSchedule = () => {
  const context = useContext(BellScheduleContext);
  if (context === undefined) {
    throw new Error('useBellSchedule must be used within a BellScheduleProvider');
  }
  return context;
};