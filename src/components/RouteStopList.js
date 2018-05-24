import React, { Component } from 'react';
import _ from 'lodash';
import {Card, CardContent } from '@material-ui/core';
import TransferIcon from '@material-ui/icons/SwapHoriz'
import BusStopIcon from './BusStop'

import StopLink from './StopLink';
import Stops from '../data/stops.js';
import Schedules from '../data/schedules.js';
import Helpers from '../helpers';

/** List of all stops and transfers for RouteStops */
class RouteStopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allStops: [],
      fetchedStops: false,
    }
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/stops-for-route/DDOT_${this.props.id}.json?key=BETA`)
    .then(response => response.json())
    .then(d => {
      this.setState({ 
        allStops: d.data.entry.stopGroupings[0].stopGroups,
        fetchedStops: true
      })
    })
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let filteredStops = [];
    let stops = [];
    const first_timepoint = this.props.timepoints[2];

    if (this.state.fetchedStops) {
      stops = _.filter(this.state.allStops, o => { 
        return o.stopIds.indexOf(`DDOT_${first_timepoint}`) > -1 })
      filteredStops = stops[0]['stopIds']
      if (this.props.input.length > 0) {
        filteredStops = _.filter(filteredStops, s => { return (Stops[s.slice(5,)].name.toLowerCase().indexOf(this.props.input)  > -1 || s.slice(5,).indexOf(this.props.input) > -1) })
      }
    }

    const color = Schedules[this.props.routeNumber].color;

    return (
      <Card>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', borderBottom: '1px solid #aaa', fontSize: '1.25rem', paddingTop: '1rem', paddingBottom: '1rem', width: '100%' }}>
            <div style={{ width: '50%', marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
              <BusStopIcon />
              <span style={{ display: 'block', marginLeft: '.5em' }}>Bus stops</span>
            </div>
            <div style={{ width: '50%', marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
              <TransferIcon />
              <span style={{ display: 'block', marginLeft: '.5em' }}>Transfers</span>
            </div>
          </div>
          <div className="overflow-scroll" style={{ height: '60vh' }}>
            {filteredStops.length > 0 ? filteredStops.map((stop, i) =>
              <div style={{ display: 'flex', alignItems: 'center', zIndex: 0 }} key={i}>
                <StopLink id={stop.slice(5,)} exclude={this.props.routeNumber} color={color} isTimepoint={this.props.timepoints.indexOf(stop.slice(5,)) > -1} showTransfers showBorder/>
              </div>
            ) : `Loading stops...`}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default RouteStopList;
