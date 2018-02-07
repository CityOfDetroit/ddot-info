import React, { Component } from 'react';
import _ from 'lodash';

import StopLink from './StopLink';
import Stops from '../data/stops.js';
import StopInput from './StopInput';

import Helpers from '../helpers';
import Schedules from '../data/schedules.js'

class RouteStopList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allStops: [],
      fetchedStops: false,
      input: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  fetchData() {
    fetch(Helpers.proxyUrl + `${Helpers.endpoint}/stops-for-route/DDOT_${this.props.id}.json?key=BETA`)
    .then(response => response.json())
    .then(d => {
      this.setState({ 
        allStops: d.data.entry.stopGroupings[0].stopGroups,
        fetchedStops: true
      })
    })
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSearchChange(event) {
    this.setState({ 
      input: event.target.value.toLowerCase()
    });
  }

  render() {
    let filteredStops = [];
    let stops = [];
    const first_timepoint = this.props.timepoints[2];

    if (this.state.fetchedStops) {
      stops = _.filter(this.state.allStops, o => { 
        return o.stopIds.indexOf(`DDOT_${first_timepoint}`) > -1 })
      filteredStops = stops[0]['stopIds']
      if (this.state.input.length > 0) {
        filteredStops = _.filter(filteredStops, s => { return (Stops[s.slice(5,)].name.toLowerCase().indexOf(this.state.input)  > -1 || s.slice(5,).indexOf(this.state.input) > -1) })
      }
    }

    const color = Schedules[this.props.routeNumber].color

    return (
      <div>
        <div className="h3">
          <StopInput input={this.state.input} onSearchChange={this.handleSearchChange}/>
        </div>
        <div className="w-100 pa3 f4 fw7" style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', borderBottom: '1px solid #000', }}>
          <div className="w-30 ml3">
            <span className='db'>Bus Stops</span>
            <span className='db f7 fw5 i w5'>In order of arrival</span>
          </div>
          <div className="w-70 ml3">
            <span className='db'>Transfers</span>
            <span className='db f7 fw5 i w5'>Transfer routes board at nearby stops or at the same stop. Check bus stop signs.</span>
          </div>
        </div>
        <div className="overflow-scroll" style={{height: '60vh'}}>
          {filteredStops.length > 0 ? filteredStops.map((stop, i) =>
            <div className="" style={{ display: 'flex', alignItems: 'center', zIndex: 0 }} key={i}>
              <span className="ml3 tc" style={{ backgroundColor: color, height: '4em', width: '6px', marginRight: '1em', zIndex: 1 }}></span>
              <span className="f7 fw7 pa1 ma1" style={{ border: '.25em solid white', backgroundColor: 'black', borderRadius: '3em', height: '10px', width: '10px', marginRight: '1em', marginLeft: '-2.55em', zIndex: 2 }}></span>
              <StopLink id={stop.slice(5,)} exclude={this.props.routeNumber}/>
            </div>
          ) : `Loading stops...`}
        </div>
      </div>
    )
  }
}

export default RouteStopList;
