import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';
import Tabs, { Tab } from 'material-ui/Tabs';
import { grey300 } from 'material-ui/colors'
import LiveIcon from 'material-ui-icons/SpeakerPhone'
import ScheduleIcon from 'material-ui-icons/Schedule'
import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';

import Stops from '../data/stops.js';
import StopHeader from './StopHeader';
import StopMap from './StopMap';
import StopTransfers from './StopTransfers';
import StopRouteSchedule from './StopRouteSchedule';
import RouteBadge from './RouteBadge';
import RouteLink from './RouteLink';
import RoutePredictionList from './RoutePredictionList';
import Schedules from '../data/schedules.js'
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

  handleTabsChange = (event, slideIndex) => {
    this.setState({ slideIndex })
  };

  handleSlideChange = (slideIndex) => {
    this.setState({ slideIndex });
  };

  handleRouteChange(event, value) {
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
    this.setState({fetchedStopSchedule: false, slideIndex: 0, routeStopType: 'schedule'})
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
    const { slideIndex } = this.state

    return (
      <div className='App' style={{background: Helpers.colors['background']}}>
        <StopHeader id={stopId} name={stopName} />
        <StopMap stopId={stopId} center={stopCoords}/>
        <div className='routes'>
          <AppBar position="static" color="red" style={{display: 'flex'}} elevation={0}>
            <Toolbar>
              <h4 style={{margin: 0, padding: '.5em'}}>Routes here</h4>
              <Tabs
                onChange={this.handleTabsChange}
                value={slideIndex}
                indicatorColor="red"
                textColor="primary"
                scrollable={stopRoutes.length > 5 ? true : false}
                >

                {stopRoutes.map((r, i) => (
                  <Tab label={<RouteBadge id={r[0]}/>} value={i} style={{minWidth: 40, width: 50}} />
                ))}
              </Tabs>
            </Toolbar>
          </AppBar>

          <SwipeableViews
            axis='x'
            index={slideIndex}
            onChangeIndex={this.handleSlideChange}
            >
            {stopRoutes.map((r, i) => (
              <div className="">
              <AppBar position="static" color="default" elevation={0} style={{display: 'flex'}}>
                <Toolbar style={{justifyContent: 'space-between'}} elevation={0}>
                  <RouteLink id={r[0]} />
                  <Tabs 
                    onChange={this.handleRouteChange} 
                    value={this.state.routeStopType}
                    indicatorColor="red"
                    textColor="primary">
                    <Tab icon={<ScheduleIcon color='black' />}  value='schedule' style={{backgroundColor: grey300, color: 'black', padding: '0em 2em'}}/>
                    <Tab icon={<LiveIcon color='black'/>} value='next' style={{backgroundColor: grey300, color: 'black'}} />
                  </Tabs>
                </Toolbar>
              </AppBar>
                <div className="">
                {this.state.routeStopType === 'next' ?
                  (this.state.fetchedPredictions ? 
                    <div style={{display: 'block', padding: '0em 0em', width: '100%'}}>
                      <RoutePredictionList
                        predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r[0].padStart(3, '0')})} 
                        route={r[0]}
                        stop={stopId}
                        multipleDirs={this.state.multipleDirs} />
                    </div>
                    : ``)
                    :
                    (this.state.fetchedStopSchedule && this.state.fetchedPredictions ?
                    <StopRouteSchedule 
                      schedules={_.filter(this.state.scheduledStops.data.entry.stopRouteSchedules, s => {
                        return s.routeId.split("_").pop() === Schedules[r[0]].rt_id.toString()
                      })} 
                      route={r[0]}
                      multipleDirs={this.state.multipleDirs}
                      predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r[0].padStart(3, '0')}).map(p => p.tripId)} 
                      />
                   : ``)}
                  </div>
                </div>
            ))}
            </SwipeableViews>
        </div>
        {stopTransfers.length > 0 && this.state.fetchedStopSchedule && this.state.fetchedPredictions ? <StopTransfers stops={_.groupBy(stopTransfers, 0)} /> : null}
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
