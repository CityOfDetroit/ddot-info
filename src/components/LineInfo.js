import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TopNav from './TopNav';
import ScheduleTable from './ScheduleTable';

import Helpers from '../helpers';

class LineInfo extends React.Component {
  constructor(props) {
    super(props);

    let info = Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10));
    let directions = Object.keys(info.schedules.weekday);
    let services = Object.keys(info.schedules);
    let today = Helpers.dowToService(moment().day());

    this.state = {
      description: info.description,
      weekday: info.schedules.weekday,
      saturday: info.schedules.saturday,
      sunday: info.schedules["sunday-holiday"],
      currentSvc: today,
      currentDirection: directions[0],
      availableServices: services,
      availableDirections: directions,
      realTime: '',
    }
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

  render() {
    return (
      <div>
        <TopNav />
        <h1>{this.props.match.params.name}</h1>
        <h3>Schedule: {this.state.currentSvc} {this.state.currentDirection}</h3>
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
