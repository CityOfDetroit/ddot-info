import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';
import Tabs, { Tab } from 'material-ui/Tabs';
import { grey300 } from 'material-ui/colors';
import LiveIcon from 'material-ui-icons/SpeakerPhone';
import ScheduleIcon from 'material-ui-icons/Schedule';
import Toolbar from 'material-ui/Toolbar';
import Card, {CardHeader} from 'material-ui/Card';
import { AppBar } from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Stops from '../data/stops.js';
import TopNav from './TopNav';
import StopMap from './StopMap';
import StopWithPredictionMap from './StopWithPredictionMap';
import StopTransfers from './StopTransfers';
import StopRouteSchedule from './StopRouteSchedule';
import RouteBadge from './RouteBadge';
import RouteLink from './RouteLink';
import RoutePredictionList from './RoutePredictionList';
import Schedules from '../data/schedules.js';
import Helpers from '../helpers';
import BusStopIcon from './BusStop';

const styles = {
  title: {
    fontWeight: 500,
    fontSize: '1.25em'
  }
}

/** Top level component at /stops/{#} */
class Stop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      predictions: {},
      scheduledStops: {},
      fetchedStopSchedule: false,
      fetchedPredictions: false,
      multipleDirs: false,
      slideIndex: 0,
      routeStopType: 'next',
      tripData: null,
      route: null
    }

    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleRoutePredictionChange = this.handleRoutePredictionChange.bind(this)
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
    this.setState({ slideIndex: slideIndex, tripData: null })
  }

  handleRouteChange(event, value) {
    this.setState({
      routeStopType: value,
    });
  }

  handleRoutePredictionChange = (tripData, route) => {
    this.setState({
      tripData: tripData,
      route: route
    })
  }

  componentDidMount() {
    this.fetchRealtimeData(this.props.match.params.name);
    this.fetchStopScheduleData(this.props.match.params.name);
    this.interval = setInterval(() => this.fetchRealtimeData(this.props.match.params.name), 5000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fetchedStopSchedule: false, 
      slideIndex: 0,
      tripData: null
    });

    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.fetchStopScheduleData(nextProps.match.params.name);
      this.fetchRealtimeData(nextProps.match.params.name);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const stopId = this.props.match.params.name;
    const stopName = Stops[stopId.toString()].name;
    const stopRoutes = Stops[stopId.toString()].routes
    console.log(stopRoutes)
    const stopCoords = [Stops[stopId.toString()].lon, Stops[stopId.toString()].lat];
    const stopTransfers = Stops[stopId.toString()].transfers;
    console.log(stopTransfers)
    const { slideIndex } = this.state;

    return (
      <div className='App' style={{ background: Helpers.colors['background'] }}>
        <TopNav />
        {this.state.tripData ? <StopWithPredictionMap stopId={stopId} center={stopCoords} prediction={this.state.tripData} route={this.state.route} /> : <StopMap stopId={stopId} center={stopCoords} />}
        <div className='routes'>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
              <BusStopIcon style={{ marginLeft: '1em', backgroundColor: 'rgba(0, 0, 0, .8)', color: 'yellow', borderRadius: 999, height: '1.8em', width: '1.8em' }}/>
              <CardHeader title={stopName} subheader={`Stop ID: #${stopId}`} classes={{ title: this.props.classes.title }} style={{ fontSize: '1.2em' }}/>
            </div>
          </Card>
          <AppBar position="static" color="red" style={{ display: 'flex' }} elevation={0}>
            <Toolbar>
              <Tabs
                onChange={this.handleTabsChange}
                value={slideIndex}
                indicatorColor="primary"
                textColor="primary"
                scrollable={stopRoutes.length > 5 ? true : false}>
                {stopRoutes.map((r, i) => (
                  <Tab label={<RouteBadge id={r[0]} />} value={i} style={{ minWidth: 40, width: 50 }} key={i} />
                ))}
                <Tab label={'Transfers'} value={stopRoutes.length} style={{fontWeight: 700}} />
              </Tabs>
            </Toolbar>
          </AppBar>
          <SwipeableViews
            axis='x'
            index={slideIndex}
            onChangeIndex={this.handleTabsChange}>
            {stopRoutes.map((r, i) => (
              <div key={i}>
                <AppBar position="static" color="default" elevation={0} style={{ display: 'flex' }}>
                  <Toolbar style={{ justifyContent: 'space-between' }} elevation={0}>
                    <RouteLink id={r[0]} />
                    <Tabs 
                      onChange={this.handleRouteChange} 
                      value={this.state.routeStopType}
                      indicatorColor="primary"
                      textColor="primary">
                      <Tab icon={<ScheduleIcon color='black' />} label='Schedule'  value='schedule' style={{ backgroundColor: grey300, color: 'black', padding: '0em 2em', textTransform: 'none' }}/>
                      <Tab icon={<LiveIcon color='black' />} label='Live' value='next' style={{ backgroundColor: grey300, color: 'black', textTransform: 'none' }} />
                    </Tabs>
                  </Toolbar>
                </AppBar>
                <div>
                {this.state.routeStopType === 'next' ?
                  (this.state.fetchedPredictions ? 
                    <div style={{ display: 'block', padding: '0em 0em', width: '100%' }}>
                      <RoutePredictionList
                        predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r[0].padStart(3, '0')})} 
                        route={r[0]}
                        stop={stopId}
                        multipleDirs={this.state.multipleDirs}
                        isOpen={i === slideIndex}
                        onChange={this.handleRoutePredictionChange} />
                    </div>
                    : ``)
                    : (this.state.fetchedStopSchedule && this.state.fetchedPredictions ?
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
            <div>
              {stopTransfers.length > 0 && 
                this.state.fetchedStopSchedule && 
                this.state.fetchedPredictions ? 
                <StopTransfers stops={_.groupBy(stopTransfers, 2)} /> : 
                null}
            </div>
            </SwipeableViews>
        </div>
      </div>
    );
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

export default withStyles(styles)(Stop);
