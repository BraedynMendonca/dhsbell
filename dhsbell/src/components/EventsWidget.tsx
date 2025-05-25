import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format, isToday, isTomorrow, addDays } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'academic' | 'sports' | 'club' | 'other';
}

const EventsWidget: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulated API call to fetch events
    const fetchEvents = () => {
      const today = new Date();
      const simulatedEvents: Event[] = [
        {
          id: '1',
          title: 'Finals Week Begins',
          date: addDays(today, 7),
          type: 'academic'
        },
        {
          id: '2',
          title: 'Basketball vs. Foothill',
          date: addDays(today, 2),
          type: 'sports'
        },
        {
          id: '3',
          title: 'Club Rush',
          date: addDays(today, 1),
          type: 'club'
        }
      ];
      
      setEvents(simulatedEvents);
    };

    fetchEvents();
    // Update events every hour
    const interval = setInterval(fetchEvents, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  const formatEventDate = (date: Date) => {
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (isTomorrow(date)) {
      return `Tomorrow at ${format(date, 'h:mm a')}`;
    }
    return format(date, 'MMM d, h:mm a');
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'sports':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'club':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Upcoming Events
        </h2>
      </div>
      <div className="space-y-3">
        {events.map(event => (
          <div
            key={event.id}
            className="flex items-start justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 dark:text-white">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {formatEventDate(event.date)}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsWidget;