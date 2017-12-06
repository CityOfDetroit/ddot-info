import React, { Component } from 'react';

import TopNav from './components/TopNav';
import LineSearch from './components/LineSearch';
import Helpers from './helpers'

class App extends Component {
  
  render() {
    console.log(Helpers.combineData())
    
    return (
      <div className="App">
        <TopNav />
        <LineSearch />
      </div>
    );
  }
}

export default App;
