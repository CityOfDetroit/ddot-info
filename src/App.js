import React, { Component } from 'react';

import TopNav from './components/TopNav';
import RouteSearch from './components/RouteSearch';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <TopNav />
        <RouteSearch />
      </div>
    )
  }
}

export default App;
