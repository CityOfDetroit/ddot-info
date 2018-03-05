import React, { Component } from 'react';

import TransitCenterHeader from './TransitCenterHeader';

class TransitCenter extends Component {
  render() {
    return (
      <div>
        <TransitCenterHeader />
        <div className="ml4">
          <h1>Rosa Parks Transit Center</h1>
        </div>
      </div>
    );
  }
}

export default TransitCenter; 
