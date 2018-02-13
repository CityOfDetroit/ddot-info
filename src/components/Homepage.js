import React, { Component } from 'react';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';

class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <RouteSearch />
        <StopSearch />
      </div>
    );
  }
};

export default Homepage;
