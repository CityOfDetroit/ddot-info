import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
import Helpers from '../helpers';

/** Top level component for App */
class Homepage extends Component {
  render() {
    return (
      <div className="App" style={{ background: Helpers.colors.background }}>
        <TopNav />
        <Card className="explainer">
          <CardContent style={{ fontSize: '1.2em' }}>
            <p>This app helps transit riders find bus schedules and real-time departure information for DDOT routes and bus stops.</p>
            <p>Find your route or stop below, or <Link to="/nearby">see which buses are running near your current location</Link>.</p>
          </CardContent>
        </Card>
        <div className="routes-homepage">
          <RouteSearch />
        </div>
        <div className="stops">
          <StopSearch />
        </div>
      </div>
    );
  }
}

export default Homepage;
