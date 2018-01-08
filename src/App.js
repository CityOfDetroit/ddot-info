import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';
import LineColorLegend from './components/LineColorLegend';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="bg-light-gray">
          <LineSearch className="dib" />
          <LineColorLegend />
        </div>
      </div>
    );
  }
}

export default App;
