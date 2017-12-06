import React from 'react';
import PropTypes from 'prop-types';

import TopNav from './TopNav';
import ScheduleTable from './ScheduleTable';
import Helpers from '../helpers';

import moment from 'moment';

class LineInfo extends React.Component {
  constructor(props) {
    super(props)

    let info = Helpers.getRouteSchedule(parseInt(this.props.location.state.short, 10))
    console.log(info)

    let directions = Object.keys(info.schedules.weekday)

    let services = Object.keys(info.schedules)

    let today = Helpers.dowToService(moment().day())

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
        console.log(d)
        this.setState({ realTime: JSON.stringify(d.data) })
      })
  }

  render = () => {
    return (
      <div>
        <TopNav />
        <h1>{this.props.match.params.name}</h1>
        <p>{Helpers.getDescByRouteId(this.props.location.state.id)}</p>
        <h3>Route map, schedule & real-time data for this route:</h3>
        <ScheduleTable schedule={this.state[this.state.currentSvc]} direction={this.state.currentDirection}/>
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
