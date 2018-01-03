import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';
// import SystemMap from './components/SystemMap'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="bg-light-gray">
          <LineSearch className="w-50-l w-50-m w-80-s dib" />
          {/* <SystemMap className="w-50-l w-50-m w-100-s dib " /> */}
        </div>
      </div>
    );
  }
}

export default App;
