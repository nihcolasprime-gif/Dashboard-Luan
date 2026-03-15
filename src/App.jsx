import React from 'react';
import { AppProvider } from './contexts/AppContext';
import DashboardContainer from './components/DashboardContainer';
import './App.css';

function App() {
  return (
    <AppProvider>
      <DashboardContainer />
    </AppProvider>
  );
}

export default App;
