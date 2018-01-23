import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';
import Nearby from './components/Nearby'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <LineSearch />
        <Nearby />
      </div>
    );
  }
}

export default App;
