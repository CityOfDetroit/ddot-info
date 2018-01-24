import React, { Component } from 'react'
import _ from 'lodash'

import StopLink from './StopLink'
import Stops from '../data/stops.js'

class RouteStopList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stops: []
    }
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-route/DDOT_${this.props.id}.json?key=BETA`)
    .then(response => response.json())
    .then(d => {
      this.setState({ 
        stops: d.data.entry.stopGroupings[0].stopGroups
      })
    })
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    const first_timepoint = this.props.timepoints[2]
    const stops = _.filter(this.state.stops, o => { 
      return o.stopIds.indexOf(`DDOT_${first_timepoint}`) > -1 })
    
    return (
      <div className='stopList overflow-scroll'>
        <div>
          {stops.length > 0 ? stops[0].stopIds.map((stop, i) =>
            <div className="pa1 bb b--light-silver" style={{ display: 'flex', alignItems: 'center' }} key={i}>
              <span className="f7 fw7 pa1">{i+1}.</span>
              <StopLink id={stop.slice(5,)} name={Stops[stop.slice(5,)].name} exclude={this.props.routeNumber}/>
            </div>
          ) : ``}
        </div>
      </div>
    )
  }
}

export default RouteStopList
