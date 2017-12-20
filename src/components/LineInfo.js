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
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  componentDidMount() {
    console.log(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-route/DDOT_${this.state.routeId}.json?key=BETA&includePolylines=false`)
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-route/DDOT_${this.state.routeId}.json?key=BETA&includePolylines=false`)
      .then(response => response.json())
      .then(d => {
        console.log(d);
        this.setState({ realTime: JSON.stringify(d.data) });
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
        <TopNav />
        <div className="flex-column v-mid">
          <div className="flex justify-center v-mid">
            <div className="tl v-mid ph5">
              <h2 className="dib f2 pa2 ma2 v-mid white" style={{ backgroundColor: this.state.color }}>
                {this.props.match.params.name}
              </h2>
              <h2 className="dib f2 ml2 v-mid">
                {this.state.routeName}
              </h2>
            </div>
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
          </div>
          <div className="flex justify-center">
            <ScheduleTable schedule={this.state[this.state.currentSvc]} direction={this.state.currentDirection} />
          </div> 
          <div className="flex justify-center pa3">
            <RouteMap routeId={this.props.match.params.name}/>
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
