import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

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
          <Card style={{ maxWidth: '500px', maxHeight: '350px', margin: '1em' }}>
            <Link to="/nearby">
              <CardMedia overlay={<CardTitle title="Find Service Nearby" subtitle="See routes and stops near your current location" style={{ textAlign: 'center' }} />}>
                <img src={RouteMapSVG} alt="DDOT System Map" />
              </CardMedia>
            </Link>
          </Card>
        </div>
      </div>
    );
  }
};

export default Homepage;
