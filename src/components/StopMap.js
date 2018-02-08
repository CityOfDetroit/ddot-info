import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Helpers from '../helpers.js'
import Stops from '../data/stops.js'

class StopMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drewMap: false,
      map: {},
    };
  }

  drawMap() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjamNiY2RuZDcwMTV1MnF0MW9kbGo5YTlyIn0.5s818a6deB6YJJK4yFkMwQ';

    const map = new mapboxgl.Map({
      'container': 'map',
      'style': Helpers.mapboxStyle,
      'center': this.props.center,
      'zoom': 17,
      'attributionControl': false,
      'interactive': false
    });

    const stopId = this.props.stopId

    const transferIds = Stops[this.props.stopId].transfers.map(t => t[0])

    map.on('load', function() {
      map.setFilter('ddot-stops', ["in", "stop_id"].concat(transferIds))
      map.setFilter('ddot-stops copy', ["in", "stop_id"].concat(transferIds))
      map.setFilter('ddot-stops-highlight', ["in", "stop_id", stopId])
      map.setFilter('ddot-stops-label-highlight', ["in", "stop_id", stopId])
      map.setLayoutProperty('ddot-stops copy', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops-highlight', 'visibility', 'visible')
      map.setLayoutProperty('ddot-stops-label-highlight', 'visibility', 'visible')
    });

    this.setState({
      drewMap: true,
      map: map,
    });
  }

  componentDidMount() {
    this.drawMap()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.stopId !== nextProps.stopId) {

      const transferIds = Stops[nextProps.stopId].transfers.map(t => t[0])
      this.state.map.setFilter('ddot-stops', ["in", "stop_id"].concat(transferIds))
      this.state.map.setFilter('ddot-stops copy', ["in", "stop_id"].concat(transferIds))
      this.state.map.setFilter('ddot-stops-highlight', ["in", "stop_id", nextProps.stopId])
      this.state.map.setFilter('ddot-stops-label-highlight', ["in", "stop_id", nextProps.stopId])


    }
  }

  render() {
    return (
      <div id="map" className="map h6"></div>
    )
  }
}

export default StopMap;
