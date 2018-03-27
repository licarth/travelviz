import React, { Component } from 'react';
import './App.css';
import VisibleDashboard from './containers/VisibleDashboard';
import SearchEngine from './SearchEngine';

class App extends React.Component {

  render() {
    return [
      <SearchEngine />,
      <VisibleDashboard />,
    ]
  }
}

export default App;
