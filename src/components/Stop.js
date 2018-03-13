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

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
      selectedIndex: 0
    }

    this.handleSelected = this.handleSelected.bind(this)
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

  handleSelected(index, last) {
    this.setState({
      selectedIndex: index
    })
  }

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
        <div className='list pa3'>
          <span className="db f3 fw5 pb2">Routes that stop here</span>    
          <Tabs
            onSelect={ this.handleSelected }>
            <TabList>
    {stopRoutes.map((r, i) => <Tab key={r}>{this.state.selectedIndex === i ? <RouteLink id={r}/> : <RouteBadge id={r} />}</Tab>)}
            </TabList>

            {stopRoutes.map(r => (
              <TabPanel key={r}>
                <div style={{display: 'flex', alignItems: 'center'}} >
                {this.state.fetchedPredictions ? 
                  <div style={{padding: '0em 0em'}}>
                    {/* <span className="db f4 fw5 mt2 pb1">Arrival predictions for this stop</span>  */}
                    <span>Arrival predictions for this stop</span> 
                    <RoutePredictionList
                      predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')})} 
                      route={r}
                      multipleDirs={this.state.multipleDirs} />
                  </div>
                  : ``}
                </div>
                {this.state.fetchedStopSchedule && this.state.fetchedPredictions ?
                  <div style={{padding: '.5em 0em'}}>
                    <span className="">Scheduled stop times for today</span>    
                    <StopRouteSchedule 
                      schedules={_.filter(this.state.scheduledStops.data.entry.stopRouteSchedules, s => {
                        return s.routeId.split("_").pop() === Schedules[r].rt_id.toString()
                      })} 
                      route={r}
                      multipleDirs={this.state.multipleDirs}
                      predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')}).map(p => p.tripId)} 
                    />
                  </div> : ``}
              </TabPanel>
            ))}


          </Tabs>
          {/* <StopRouteList routes={stopRoutes} />} */}
          {/* <StopSchedule stopId={stopId} /> */}
          {stopTransfers.length > 0 ? <StopTransfers stops={stopTransfers} /> : null}
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
