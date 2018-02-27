import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
import Legend from './Legend';

class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="explainer">
          <p>This app helps transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
          <p>Find your route or stop, or see which buses are running near your current location.</p>
        </div>
        <div className="routes">
          <RouteSearch />
          {/* <Legend /> */}
        </div>
        <div className="stops">
          <StopSearch />
        </div>
      </div>
    );
  }
};

export default Homepage;
