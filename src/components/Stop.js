import React from 'react';
import PropTypes from 'prop-types';

import Stops from '../data/stops.js';
import StopHeader from './StopHeader';
import StopMap from './StopMap';
import StopTransfers from './StopTransfers';
import StopRouteSchedule from './StopRouteSchedule';
import RouteBadge from './RouteBadge';
import RouteLink from './RouteLink';
import RoutePredictionList from './RoutePredictionList';
import Schedules from '../data/schedules.js'

import chroma from 'chroma-js';

import { Tabs, Tab } from 'material-ui/Tabs';
import grey300 from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


import SwipeableViews from 'react-swipeable-views';

import _ from 'lodash';

import Helpers from '../helpers';

class Stop extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      predictions: {},
      scheduledStops: {},
      fetchedStopSchedule: false,
      fetchedPredictions: false,
      multipleDirs: false,
      slideIndex: 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  fetchRealtimeData(id) {
    fetch(`${Helpers.endpoint}/arrivals-and-departures-for-stop/DDOT_${id}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      d.data.entry.arrivalsAndDepartures = _.filter(d.data.entry.arrivalsAndDepartures, ad => {
        return (ad.predicted && ad.predictedArrivalTime > d.currentTime) || !ad.predicted
      })
      this.setState({ 
        predictions: d, 
        fetchedPredictions: true 
      })
    })
    .catch(e => console.log(e));
  }

  fetchStopScheduleData(id) {
    fetch(`${Helpers.endpoint}/schedule-for-stop/DDOT_${id}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let multipleDirs = false
      d.data.entry.stopRouteSchedules.forEach(srs => {
        if (srs.stopRouteDirectionSchedules.length > 1) {
          multipleDirs = true
        }
      });

      this.setState({ 
        scheduledStops: d, 
        fetchedStopSchedule: true,
        multipleDirs: multipleDirs
      })
    })
    .catch(e => console.log(e));
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  };

  componentDidMount() {
    this.fetchRealtimeData(this.props.match.params.name)
    this.fetchStopScheduleData(this.props.match.params.name)
    this.interval = setInterval(() => this.fetchRealtimeData(this.props.match.params.name), 5000);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.name !== nextProps.match.params.name) {
      this.fetchStopScheduleData(nextProps.match.params.name)
      this.fetchRealtimeData(nextProps.match.params.name)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const stopId = this.props.match.params.name
    const stopName = Stops[stopId.toString()].name
    const stopRoutes = Stops[stopId.toString()].routes
    const stopCoords = [Stops[stopId.toString()].lon, Stops[stopId.toString()].lat]
    const stopTransfers = Stops[stopId.toString()].transfers
    return (
      <div className='App'>
        <StopHeader id={stopId} name={stopName} />
        <StopMap stopId={stopId} center={stopCoords}/>
        <div className='list'>
          <Toolbar>
            <ToolbarGroup>
            <ToolbarTitle text="Routes" />
            </ToolbarGroup>
            <ToolbarGroup style={{overflowX: 'scroll'}}>
            <Tabs
              tabItemContainerStyle={{background: grey300}}
              onChange={this.handleChange}
              value={this.state.slideIndex}>
              {stopRoutes.map((r, i) => (
                <Tab label={<RouteBadge id={r}/>} style={{padding: '0em .5em'}} value={i} />
              ))}
            </Tabs>
            </ToolbarGroup>
          </Toolbar>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
            >
            {stopRoutes.map((r, i) => (
              <div className="">
              <div className="pa2">
              <RouteLink id={r} />
              </div>
                <div className="pa2">
                {this.state.fetchedPredictions ? 
                  <div style={{display: 'block', padding: '0em 0em', width: '100%'}}>
                    <h3 style={{margin: 0, borderBottom: '1px dotted black', width: '100%'}}>Next departures from this stop</h3>    
                    <RoutePredictionList
                      predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')})} 
                      route={r}
                      multipleDirs={this.state.multipleDirs} />
                  </div>
                  : ``}
                {this.state.fetchedStopSchedule && this.state.fetchedPredictions ?
                  <div style={{padding: '.5em 0em 0em 0em'}}>
                    <h3 style={{margin: 0, padding: '.25em 0em'}}>Scheduled stop times for today</h3>
                    <div style={{background: '#eee', padding: '.25em 0em', margin: '0em 0em .5em 0em', borderBottom: '1px dotted black'}}>
                      <span className="f6 tc" style={{padding: '0em .75em'}}>am times</span>
                      <span className="f6 tc" style={{padding: '0em .75em'}}><strong>pm times</strong></span>
                      <span className="f6 tc" style={{backgroundColor: chroma(Schedules[r].color).alpha(0.25).css(), padding: '.4em .7em'}}>next arrivals</span>
                    </div>
                    <StopRouteSchedule 
                      schedules={_.filter(this.state.scheduledStops.data.entry.stopRouteSchedules, s => {
                        return s.routeId.split("_").pop() === Schedules[r].rt_id.toString()
                      })} 
                      route={r}
                      multipleDirs={this.state.multipleDirs}
                      predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')}).map(p => p.tripId)} 
                    />
                  </div> : ``}
                  {stopTransfers.length > 0 ? <StopTransfers stops={stopTransfers} /> : null}
                  </div>
                </div>
            ))}
            </SwipeableViews>
        </div>
      </div>
    )
  }
}

Stop.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default Stop;
