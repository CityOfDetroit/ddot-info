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
        <div className="systemMap">
          <span className="fw7 f3 ph3">
            <Link to="/nearby" className="black dim" style={{ textDecoration: 'none' }}>Find service nearby</Link>
          </span>
          <div className="ma3 pa3" style={{ border: ".5em solid #eee", borderRadius: "1.5em" }}>
            <Link to="/nearby">
              <img src={RouteMapSVG} alt="System map" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Homepage;
