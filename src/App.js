import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <LineSearch />
      </div>
    );
  }
}

export default App;
