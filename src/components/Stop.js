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
      multipleDirs: false
    }
  }

  fetchRealtimeData() {
    fetch(`${Helpers.endpoint}/arrivals-and-departures-for-stop/DDOT_${this.props.match.params.name}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      this.setState({ 
        predictions: d, 
        fetchedPredictions: true 
      })
    })
    .catch(e => console.log(e));
  }

  fetchStopScheduleData() {
    fetch(`${Helpers.endpoint}/schedule-for-stop/DDOT_${this.props.match.params.name}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let multipleDirs = false
      d.data.entry.stopRouteSchedules.forEach(srs => {
        console.log(srs)
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

  componentDidMount() {
    this.fetchRealtimeData()
    this.fetchStopScheduleData()
    // this.interval = setInterval(() => this.fetchRealtimeData(), 5000);
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
        <div className='list pa2'>
          <span className="db f3 fw5 mt3 pb2">Routes that stop here</span>    
          <Tabs>
            <TabList>
              {stopRoutes.map(r => <Tab><RouteBadge id={r} /></Tab>)}
            </TabList>

            {stopRoutes.map(r => (
              <TabPanel>
                <div style={{display: 'flex', alignItems: 'center'}} >
                <RouteLink id={r}/>
                {this.state.fetchedPredictions ? 
                  <RoutePredictionList 
                    predictions={_.filter(this.state.predictions.data.entry.arrivalsAndDepartures, function(o) { return o.routeShortName === r.padStart(3, '0')})} 
                    route={r}
                    multipleDirs={this.state.multipleDirs} /> 
                  : ``}
                </div>
                {this.state.fetchedStopSchedule ? 
                  <StopRouteSchedule schedules={_.filter(this.state.scheduledStops.data.entry.stopRouteSchedules, s => {
                    return s.routeId.split("_").pop() === Schedules[r].rt_id.toString()
                  })} route={r} multipleDirs={this.state.multipleDirs} /> : ``}
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
