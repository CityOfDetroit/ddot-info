import React, { Component } from 'react';

import TopNav from './TopNav';

/** Unused page to group specific stops, eg Rosa Parks transit center */
class TransitCenter extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <div style={{ marginLeft: '1em' }}>
          <h1>Rosa Parks Transit Center</h1>
        </div>
      </div>
    );
  }
}

export default TransitCenter; 
