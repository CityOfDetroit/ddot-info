import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';

class Homepage extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <div className="ma2" style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h1>Detroit Department of Transportation</h1>
            <p>Route Explorer lets transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
            <p>Find your route or stop, or see which buses are running near your current location.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <div className="w-40 mr3" style={{ border: '.25em solid #eee' }}>
              <RouteSearch />
            </div>
            <div className="w-30 mr3" style={{ border: '.25em solid #eee' }}>
              <StopSearch />
            </div>
            <div className="w-20 pa2" style={{ border: '.25em solid #eee', height: '150px' }}>
              <Link to="/nearby" className="link dim black fw8 f3">Search Nearby</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Homepage;
