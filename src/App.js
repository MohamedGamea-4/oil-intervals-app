import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import RecordScreen from './screens/RecordScreen';
import HistoryScreen from './screens/HistoryScreen';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen setActiveTab={setActiveTab} />;
      case 'Record':
        return <RecordScreen setActiveTab={setActiveTab} />;
      case 'History':
        return <HistoryScreen setActiveTab={setActiveTab} />;
      default:
        return <HomeScreen setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderScreen()}
      </div>
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'Home' ? 'active' : ''}`}
          onClick={() => setActiveTab('Home')}
        >
          🏠 Home
        </button>
        <button
          className={`nav-tab ${activeTab === 'Record' ? 'active' : ''}`}
          onClick={() => setActiveTab('Record')}
        >
          ➕ Record
        </button>
        <button
          className={`nav-tab ${activeTab === 'History' ? 'active' : ''}`}
          onClick={() => setActiveTab('History')}
        >
          📊 History
        </button>
      </div>
    </div>
  );
};

export default App;
