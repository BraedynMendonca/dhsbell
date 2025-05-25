import React from 'react';
import CurrentPeriod from './CurrentPeriod';
import NextPeriod from './NextPeriod';
import TimeDisplay from './TimeDisplay';
import ScheduleView from './ScheduleView';
import WeatherWidget from './WeatherWidget';
import EventsWidget from './EventsWidget';
import SimpleGame from './SimpleGame';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Schedule Content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <TimeDisplay />
                <CurrentPeriod />
                <NextPeriod />
                <ScheduleView />
              </div>
            </div>
            <SimpleGame />
          </div>
          
          {/* Widgets Sidebar */}
          <div className="space-y-6">
            <WeatherWidget />
            <EventsWidget />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;