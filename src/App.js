import React, { Component } from 'react';

import Homepage from './components/Homepage';

class App extends Component {
  render() {
    return (
      <div style={{background: 'rgba(0,50,0,0.1)'}}>
        <Homepage />
      </div>
    );
  }
};

export default App;
