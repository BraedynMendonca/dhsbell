import React from 'react';
import { BellScheduleProvider } from './context/BellScheduleContext';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <BellScheduleProvider>
      <Layout />
    </BellScheduleProvider>
  );
}

export default App;