import React, { Component } from 'react';

import TopNav from './components/TopNav';
import RouteSearch from './components/RouteSearch';
import Nearby from './components/Nearby';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <RouteSearch />
        <Nearby />
      </div>
    )
  }
}

export default App;
