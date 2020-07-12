import React from 'react';

import ProfileInfo from './components/Profile/ProfileInfo'
import ProfileTabs from './components/Profile/ProfileTabs'

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="profileInfo"><ProfileInfo /></div>
      <div className="profileTabs"><ProfileTabs /></div>
    </div>
  );
}

export default App;
