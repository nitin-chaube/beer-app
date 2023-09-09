// src/App.js
import React from 'react';
import './App.css';
import Home from './screens/Home';
import Header from './components/Header'; // Import the Header component

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
