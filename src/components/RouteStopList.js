import React, { Component } from 'react'
import _ from 'lodash'

import StopLink from './StopLink'
import Stops from '../data/stops.js'
import StopInput from './StopInput'

import Helpers from '../helpers';

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
    this.fetchData()
  }

  handleSearchChange(event) {
    this.setState({ 
      input: event.target.value.toLowerCase()
    });
  }

  render() {
    let filteredStops = []
    let stops = []
    const first_timepoint = this.props.timepoints[2]
    if(this.state.fetchedStops) {
      stops = _.filter(this.state.allStops, o => { 
        return o.stopIds.indexOf(`DDOT_${first_timepoint}`) > -1 })
      filteredStops = stops[0]['stopIds']
      if(this.state.input.length > 0) {
        filteredStops = _.filter(filteredStops, s => { return Stops[s.slice(5,)].name.toLowerCase().indexOf(this.state.input)  > -1 })
      }
    }


    
    return (
      <div>
        <StopInput input={this.state.input} onSearchChange={this.handleSearchChange}/>
        <div className="overflow-scroll">
          {filteredStops.length > 0 ? filteredStops.map((stop, i) =>
            <div className="pa1 bb b--light-silver" style={{ display: 'flex', alignItems: 'center' }} key={i}>
              <span className="f7 fw7 pa1">{stops[0].stopIds.indexOf(stop) + 1}.</span>
              <StopLink id={stop.slice(5,)} exclude={this.props.routeNumber}/>
            </div>
          ) : ``}
        </div>
      </div>
    )
  }
}

export default RouteStopList
