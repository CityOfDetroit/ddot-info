import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';

import RouteMapSVG from '../img/ddot.svg'

class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <div className="explainer ma2">
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
        <div className="systemMap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
          <img src={RouteMapSVG} alt="System map" style={{ position: 'relative' }} />
          <button style={{ position: 'absolute', fontSize: '1.75em', fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '.25em', border: 'none', padding: '.5em', }}>
            <Link to="/nearby" className="dim black hover-gray" style={{ textDecoration: 'none' }}>Find Nearby Routes & Stops</Link>
          </button>
        </div>
      </div>
    );
  }
};

export default Homepage;
