import React, { Component } from 'react';

class StopSchedule extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      schedule: {},
      fetchedSchedule: false
    }
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/schedule-for-stop/DDOT_${this.props.stopId}.json?key=BETA&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      this.setState({ schedule: d, fetchedSchedule: true })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div className='stopSchedule'>
        something
      </div>
    )
  }
}

export default StopSchedule