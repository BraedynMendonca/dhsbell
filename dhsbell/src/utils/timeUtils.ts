// Convert a time string (HH:MM) to minutes since midnight
export const timeStringToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Convert minutes since midnight to a time string (HH:MM)
export const minutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Get current time in minutes since midnight
export const getCurrentTimeInMinutes = (): number => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Format minutes as HH:MM
export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}`;
};

// Format seconds as MM:SS
export const formatSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Format duration in minutes and seconds
export const formatDuration = (minutes: number): string => {
  if (minutes < 1) {
    return "Less than a minute";
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  
  return `${mins}m`;
};

// Format time as 12-hour time (e.g., "8:30 AM")
export const formatTime12Hour = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get formatted current date
export const getCurrentFormattedDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  });
};

// Get day of week
export const getDayOfWeek = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { weekday: 'long' });
};