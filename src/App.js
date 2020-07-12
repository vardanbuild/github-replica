import React from 'react';

import ProfileInfo from './Profile/ProfileInfo'
import Repository from './Repository/Repository'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProfileInfo />
        <Repository />
      </header>
    </div>
  );
}

export default App;
