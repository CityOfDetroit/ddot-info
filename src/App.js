import React, { Component } from 'react';

import Homepage from './components/Homepage';
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div style={{background: '#eee'}}>
        <Homepage />
      </div>
    );
  }
};

export default App;
