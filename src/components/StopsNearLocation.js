import React, { Component } from 'react'

import StopLink from './StopLink'
import RouteLink from './RouteLink'

class StopsNearLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      fetchedData: false
    }
  }

  fetchData() {
    fetch(`https://ddot-proxy-test.herokuapp.com/api/where/stops-for-location.json?key=BETA&radius=500&lat=${this.props.coords.latitude}&lon=${this.props.coords.longitude}`)
    .then(response => response.json())
    .then(d => {
      this.setState({
        data: d, 
        fetchedData: true
      })
    })
    .catch(e => console.log(e));
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    let data = this.state.fetchedData ? this.state.data : null

    return (
      <div>
        <div>
          <h4>Nearby routes:</h4>
          <div className="h5 overflow-scroll">
            {this.state.fetchedData ? data.data.references.routes.map((r, i) => (
              <div className="bg-light-gray ma2 pa2" key={i}>
                <RouteLink id={parseInt(r.shortName, 10)}/>
              </div>
            )) : ``}
          </div>
        </div>
        <div>
          <h4>Nearby stops:</h4>
          <div className="h4 overflow-scroll">
            {this.state.fetchedData ? data.data.list.map((a, i) => (
              <StopLink id={a.id.slice(5,)} key={i} />
            )) : ``}
          </div>
        </div>
      </div>
    )
  }
}

export default StopsNearLocation
