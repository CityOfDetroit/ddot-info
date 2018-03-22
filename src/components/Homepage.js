import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
// import RouteMapSVG from '../img/ddot.svg';

class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <Card className="explainer ma1">
          <CardContent style={{ fontSize: '1.2em' }}>
            <p>This app helps transit riders find bus schedules and real-time departure information for DDOT routes and bus stops.</p>
            <p>Find your route or stop below, or <Link to="/nearby">see which buses are running near your current location</Link>.</p>
          </CardContent>
        </Card>
        <div className="routes-homepage ma1">
          <RouteSearch />
        </div>
        <div className="stops ma1">
          <StopSearch />
        </div>
        {/* <div className="systemMap">
          <Card style={{ maxWidth: '500px', maxHeight: '350px', margin: '1em' }}>
            <CardHeader title="Nearby" />
            <CardContent>
              <Link to="/nearby">
                <CardMedia
                  image={RouteMapSVG}
                  title="DDOT System Map" />
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="footer-homepage" style={{ backgroundColor: '#eee' }}>
        </div> */}
      </div>
    );
  }
};

export default Homepage;
