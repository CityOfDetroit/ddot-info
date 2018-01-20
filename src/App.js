import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';
import Geolocator from './components/Geolocator';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <LineSearch />
        <Geolocator />
      </div>
    );
  }
}

export default App;
