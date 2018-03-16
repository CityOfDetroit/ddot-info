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
import {grey300, grey200} from 'material-ui/styles/colors'
import LiveIcon from 'material-ui/svg-icons/communication/speaker-phone'
import ScheduleIcon from 'material-ui/svg-icons/action/schedule'
import Chip from 'material-ui/Chip';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';


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
      slideIndex: 0,
      routeStopType: 'schedule'
    }


    this.handleChange = this.handleChange.bind(this)
    this.handleRouteChange = this.handleRouteChange.bind(this)
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

  handleRouteChange(value) {
    this.setState({
      routeStopType: value,
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
        {stopTransfers.length > 0 ? <StopTransfers stops={stopTransfers} /> : null}
        <div className='routes'>

          <Toolbar style={{background: grey200}}>
            <ToolbarGroup style={{overflowX: 'scroll'}}>
              <ToolbarTitle text="Routes" style={{ color: 'black', fontWeight: 700}} />
            </ToolbarGroup>
            <ToolbarGroup>
            <Tabs
              tabItemContainerStyle={{background: grey300}}
              onChange={this.handleChange}
              value={this.state.slideIndex}>
              {stopRoutes.map((r, i) => (
                <Tab label={<RouteBadge id={r}/>} style={{padding: '0em .5em', background: grey200}} value={i} />
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
              <Toolbar style={{alignItems: 'center', background: grey300}}>
                <ToolbarGroup>
                <RouteLink id={r} />
                </ToolbarGroup>
                <ToolbarGroup>
                <Tabs onChange={this.handleRouteChange} value={this.state.routeStopType}>
                  <Tab icon={<LiveIcon color='black' style={{width: 40, fontSize: '1em'}}/>} value='next' style={{backgroundColor: grey300, color: 'black'}} />
                  <Tab icon={<ScheduleIcon color='black' />}  value='schedule' style={{backgroundColor: grey300, color: 'black', padding: '0em 2em'}}/>
                </Tabs>
                </ToolbarGroup>
              </Toolbar>
                <div className="">
                {this.state.routeStopType === 'next' ?
                  (this.state.fetchedPredictions ? 
                    <div style={{display: 'block', padding: '0em 0em', width: '100%'}}>
                      <RoutePredictionList
                        predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')})} 
                        route={r}
                        multipleDirs={this.state.multipleDirs} />
                    </div>
                    : ``)
                :
                (this.state.fetchedStopSchedule && this.state.fetchedPredictions ?
                  <div>
                    <div style={{display: 'flex', margin: 10}}>
                      <Chip style={{margin: 4}}>am times</Chip>
                      <Chip style={{margin: 4, fontWeight: 700}}><span class="b">pm times</span></Chip>
                      <Chip style={{margin: 4, backgroundColor: chroma(Schedules[r].color).alpha(0.25).css()}}>next arrivals</Chip>
                    </div>
                    <StopRouteSchedule 
                      schedules={_.filter(this.state.scheduledStops.data.entry.stopRouteSchedules, s => {
                        return s.routeId.split("_").pop() === Schedules[r].rt_id.toString()
                      })} 
                      route={r}
                      multipleDirs={this.state.multipleDirs}
                      predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')}).map(p => p.tripId)} 
                    />
                  </div> : ``)}
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
