import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TopNav from './TopNav';
import ScheduleTable from './ScheduleTable';
import ServicePicker from './ServicePicker';
import DirectionPicker from './DirectionPicker';

import Helpers from '../helpers';

class LineInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: (Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10)).description),
      weekday: (Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10)).schedules.weekday),
      saturday: (Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10)).schedules.saturday),
      sunday: (Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10)).schedules.sunday),
      currentSvc: (Helpers.dowToService(moment().day())),
      currentDirection: (Object.keys((Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10))).schedules.weekday)[0]),
      availableServices: (Object.keys((Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10))).schedules)),
      availableDirections: (Object.keys((Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10))).schedules.weekday)),
      realTime: '',
    };

    this.handleDirectionChange = this.handleDirectionChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  componentDidMount() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-route/${this.props.location.state.id}.json?key=BETA&includePolylines=false`)
      .then(response => response.json())
      .then(d => {
        // console.log(d);
        this.setState({ realTime: JSON.stringify(d.data) });
      })
      .catch(e => console.log(e));
  }

  handleDirectionChange(event) {
    console.log(event.target.value);;
    this.setState({
      currentDirection: event.target.value
    });
  }

  handleServiceChange(event) {
    console.log(event.target.value);
    this.setState({
      currentSvc: event.target.value
    });
  }

  render() {
    return (
      <div>
        <TopNav />
        <h1>{this.props.match.params.name}</h1>
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
        <ScheduleTable schedule={this.state[this.state.currentSvc]} direction={this.state.currentDirection} />
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
