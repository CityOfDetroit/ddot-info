import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';
import SystemMap from './components/SystemMap'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="flex flex-row bg-light-gray">
          <LineSearch className="w-50 dib" />
          <SystemMap className="w-50 dib" />
        </div>
      </div>
    );
  }
}

export default App;
