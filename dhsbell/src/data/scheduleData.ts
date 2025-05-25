export type PeriodType = {
  id: string;
  name: string;
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string; // Format: "HH:MM" in 24-hour format
};

export type ScheduleType = {
  id: string;
  name: string;
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
  periods: PeriodType[];
};

// Dublin High School Bell Schedule
export const schedules: ScheduleType[] = [
  {
    id: "regular",
    name: "Regular Schedule",
    days: [1, 2, 3, 4, 5], // Monday through Friday
    periods: [
      { id: "before-school", name: "Before School", startTime: "00:00", endTime: "08:30" },
      { id: "period-1", name: "Period 1", startTime: "08:30", endTime: "09:22" },
      { id: "period-2", name: "Period 2", startTime: "09:29", endTime: "10:21" },
      { id: "period-3", name: "Period 3", startTime: "10:28", endTime: "11:20" },
      { id: "period-4", name: "Period 4", startTime: "11:27", endTime: "12:19" },
      { id: "lunch", name: "Lunch", startTime: "12:19", endTime: "12:54" },
      { id: "period-5", name: "Period 5", startTime: "13:01", endTime: "13:53" },
      { id: "period-6", name: "Period 6", startTime: "14:00", endTime: "14:52" },
      { id: "period-7", name: "Period 7", startTime: "14:59", endTime: "15:51" },
      { id: "after-school", name: "After School", startTime: "15:51", endTime: "23:59" }
    ]
  },
  {
    id: "minimum-day",
    name: "Minimum Day",
    days: [], // Special days, not regular
    periods: [
      { id: "before-school", name: "Before School", startTime: "00:00", endTime: "08:30" },
      { id: "period-1", name: "Period 1", startTime: "08:30", endTime: "09:10" },
      { id: "period-2", name: "Period 2", startTime: "09:17", endTime: "09:57" },
      { id: "period-3", name: "Period 3", startTime: "10:04", endTime: "10:44" },
      { id: "period-4", name: "Period 4", startTime: "10:51", endTime: "11:31" },
      { id: "period-5", name: "Period 5", startTime: "11:38", endTime: "12:18" },
      { id: "period-6", name: "Period 6", startTime: "12:25", endTime: "13:05" },
      { id: "period-7", name: "Period 7", startTime: "13:12", endTime: "13:52" },
      { id: "after-school", name: "After School", startTime: "13:52", endTime: "23:59" }
    ]
  },
  {
    id: "wednesday",
    name: "Wednesday Schedule",
    days: [3], // Wednesday
    periods: [
      { id: "before-school", name: "Before School", startTime: "00:00", endTime: "09:30" },
      { id: "period-1", name: "Period 1", startTime: "09:30", endTime: "10:14" },
      { id: "period-2", name: "Period 2", startTime: "10:21", endTime: "11:05" },
      { id: "period-3", name: "Period 3", startTime: "11:12", endTime: "11:56" },
      { id: "lunch", name: "Lunch", startTime: "11:56", endTime: "12:31" },
      { id: "period-4", name: "Period 4", startTime: "12:38", endTime: "13:22" },
      { id: "period-5", name: "Period 5", startTime: "13:29", endTime: "14:13" },
      { id: "period-6", name: "Period 6", startTime: "14:20", endTime: "15:04" },
      { id: "period-7", name: "Period 7", startTime: "15:11", endTime: "15:55" },
      { id: "after-school", name: "After School", startTime: "15:55", endTime: "23:59" }
    ]
  },
  {
    id: "weekend",
    name: "Weekend",
    days: [0, 6], // Sunday, Saturday
    periods: [
      { id: "weekend", name: "Weekend", startTime: "00:00", endTime: "23:59" }
    ]
  }
];

export const getScheduleForDate = (date: Date): ScheduleType => {
  const day = date.getDay();
  // Check for special dates here if needed
  
  // For now, just return based on day of week
  const matchingSchedule = schedules.find(schedule => 
    schedule.days.includes(day)
  );
  
  return matchingSchedule || schedules[0]; // Default to regular schedule
};