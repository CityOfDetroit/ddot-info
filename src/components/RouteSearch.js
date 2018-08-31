import React, { Component } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

import RouteInput from './RouteInput';
import RoutesList from './RoutesList';
import Schedules from '../data/schedules';
import Helpers from '../helpers.js';

class RouteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allLines: (Object.values(Schedules)),
      filteredLines: (Object.values(Schedules)),
      realTime: '',
      input: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    this.state.allLines.forEach(ln => {
      if ((ln.id.indexOf(val) > -1) || (ln.rt_name.toUpperCase().indexOf(val.toUpperCase()) > -1)) {
        matched.push(ln);
      }
    })

    this.setState({ 
      input: event.target.value, 
      filteredLines: matched 
    });
  }

  render() {
    return (
      <Card>
        <CardHeader title="Choose your bus route" subheader="Click on a route number or name for an overview, including real-time locations. Click an icon to go directly to that route's bus stops or schedule." />
        <CardContent>
          <RouteInput input={this.state.input} onSearchChange={this.handleSearchChange} />
          { this.state.filteredLines.length > 0 ? <RoutesList lines={this.state.filteredLines} /> : <span style={{ color: 'red' }}>No routes match your search! Try again.</span> }
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1.25em' }}>
            <span style={{ padding: '.2em .2em .2em 0' }}>Bus routes are color coded by their service direction and frequency:</span>
            <span style={{ padding: '.2em .2em .2em 0' }}><span style={{ borderBottom: '4px solid #004445' }}>ConnectTen</span>,</span>
            <span style={{ padding: '.2em .2em .2em 0' }}><span style={{ borderBottom: '4px solid rgb(68, 170, 66)' }}>downtown</span>,</span> 
            <span style={{ padding: '.2em .2em .2em 0' }}><span style={{ borderBottom: '4px solid rgb(155, 91, 165)' }}>northbound/southbound</span>,</span> 
            <span style={{ padding: '.2em .2em .2em 0' }}><span style={{ borderBottom: '4px solid rgb(0, 121, 194)' }}>eastbound/westbound</span> and</span> 
            <span style={{ padding: '.2em .2em .2em 0' }}><span style={{ borderBottom: '4px solid rgb(208, 124, 50)' }}>special routes</span>.</span> 
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default RouteSearch;
