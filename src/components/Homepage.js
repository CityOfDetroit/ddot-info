import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
import Legend from './Legend';

class Homepage extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="ma2">
            <p>This app helps transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
            <p>Find your route or stop, or see which buses are running near your current location.</p>
          </div>
          <div className="w-100" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', background: '#004445' }}>
            <div className="w-100 pa1">
              <RouteSearch />
              <Legend />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', }}>
            <div className="w-50" style={{ borderRight: '.25em solid #eee' }}>
              <StopSearch />
            </div>
            <div className="ma2">
              <Link to="/nearby" className="link dim black fw8 f3">Find Nearby</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Homepage;
