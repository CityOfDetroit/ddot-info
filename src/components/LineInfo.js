import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TopNav from './TopNav';
import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';
import RouteMap from './RouteMap';

import Helpers from '../helpers';

class LineInfo extends React.Component {
  constructor(props) {
    super(props);

    let route = Helpers.getRoute(parseInt(this.props.match.params.name, 10))

    this.state = {
      routeName: (route.rt_name),
      routeId: (route.rt_id),
      description: (route.description),
      weekday: (route.schedules.weekday),
      saturday: (route.schedules.saturday),
      sunday: (route.schedules.sunday),
      color: (route.color),
      currentSvc: (Object.keys(route.schedules).length > 1 ? Helpers.dowToService(moment().day()) : 'weekday'),
      currentDirection: (Object.keys(route.schedules.weekday)[0]),
      availableServices: (Object.keys(route.schedules)),
      availableDirections: (Object.keys(route.schedules.weekday)),
      realTime: '',
      tripIds: [],
      liveTrips: '',
      routeBbox: route.bbox,
      timepointStops: route.timepoints[Object.keys(route.schedules.weekday)[0]]
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  componentDidMount() {
    console.log(`https://ddot-proxy-test.herokuapp.com/api/where/vehicles-for-agency/DDOT.json?key=BETA&includePolylines=false`)
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/vehicles-for-agency/DDOT.json?key=BETA&includePolylines=false`)
      .then(response => response.json())
      .then(d => {
        let tripIds = [];
        this.state.availableDirections.forEach(dir => {
          this.state.weekday[dir].trips.forEach(trip => {
            tripIds.push("DDOT_116".concat(trip.trip_id.toString()))
          })
        })

        let realTime = d.data.list.filter(li => {
          return tripIds.indexOf(li.tripId) > -1
        })
        
        let liveTrips = realTime.map(ti => { return ti.tripId })

        this.setState({ realTime: realTime, tripIds: tripIds, liveTrips: liveTrips });
      })
      .catch(e => console.log(e));
  }

  handleDirectionChange(event) {
    this.setState({
      currentDirection: event.target.value
    });
  }

  handleServiceChange(event) {
    this.setState({
      currentSvc: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="flex-column v-mid">
          <div className="flex v-mid">
            <div className="tl v-mid ph5 mt3">
              <h2 className="dib f2 pa2 ma2 v-mid white" style={{ backgroundColor: this.state.color }}>
                {this.props.match.params.name}
              </h2>
              <h2 className="dib f2 ml2 v-mid fw5">
                {this.state.routeName}
              </h2>
            </div>
          </div>
          <div className="flex justify-center">
            <div className='w-40'>
            <div>
                <ServicePicker 
                  services={this.state.availableServices}
                  currentSvc={this.state.currentSvc}
                  onChange={this.handleServiceChange}
                />
                <DirectionPicker 
                  directions={this.state.availableDirections}
                  currentDirection={this.state.currentDirection}
                  onChange={this.handleDirectionChange} 
                />
              </div>
              <RouteMap routeId={this.props.match.params.name} stops={this.state.timepointStops} bbox={this.state.routeBbox} />
            </div>
            <div className='w-60 h5'>
                <ScheduleTable schedule={this.state[this.state.currentSvc]} direction={this.state.currentDirection} liveTrips={this.state.liveTrips} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LineInfo.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default LineInfo;
