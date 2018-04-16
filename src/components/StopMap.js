import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import { Redirect } from 'react-router-dom'
import Card, { CardHeader } from 'material-ui/Card';
import _ from 'lodash';

import Helpers from '../helpers.js';
import MapSatelliteSwitch from './MapSatelliteSwitch';
import Stops from '../data/stops.js';

import {defaultMapStyle, routeLineIndex, highlightPointIndex, highlightLabelIndex, stopPointIndexTwo} from '../style.js';

class StopMap extends Component {
  constructor(props) {
    super(props)

    let stop = Stops[this.props.stopId] || null;

    this.state = {
      showSatellite: true,
      viewport: {
        latitude: parseFloat(stop.lat),
        longitude: parseFloat(stop.lon),
        zoom: 17,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 650 ? window.innerWidth * (3/8) - 9 : window.innerWidth,
        height: window.innerWidth > 650 ? ((window.innerHeight - 75) * (5/8)) : 300,
        clickedStop: null
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this._resize = this._resize.bind(this);
  }

  handleChange(event) {
    console.log(event)
    this.setState({
      showSatellite: event.target.checked ? true : false
    });
  }

  _onClick = (event) => {
    console.log(event)
    this.setState({clickedStop: event.features[0]})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      clickedStop: null,
      viewport: {
        ...this.state.viewport,
        latitude: parseFloat(Stops[nextProps.stopId].lat),
        longitude: parseFloat(Stops[nextProps.stopId].lon),
      }
    })
  }

  _resize = () => {
    if (window.innerWidth > 650) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth * (3/8) - 9,
          height: ((window.innerHeight - 75) * (5/8))
        }
      });
    } else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: 300
        }
      });
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  render() {
    let style = defaultMapStyle
    let stop = Stops[this.props.stopId] || null

    // set style for main stop
    style = style.setIn(['layers', highlightPointIndex, 'filter'], ['==', 'stop_id', this.props.stopId])
    style = style.setIn(['layers', highlightPointIndex, 'layout', 'visibility'], 'visible')
    style = style.setIn(['layers', highlightLabelIndex, 'filter'], ['==', 'stop_id', this.props.stopId])
    style = style.setIn(['layers', highlightLabelIndex, 'layout', 'visibility'], 'visible')

    style = style.setIn(['layers', 1, 'layout', 'visibility'], this.state.showSatellite ? 'visible' : 'none')
    _.forEach(style.toJS().layers, (l, i) => {
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], this.state.showSatellite ? 'none' : 'visible')
      }
    })  

    // set labels for transfers
    style = style.setIn(['layers', stopPointIndexTwo, 'filter'], ["in", "stop_id"].concat(_.map(stop.transfers, 2)))

    // eventually set routes?
    const routesHere = Array.from(new Set(_.flattenDeep(_.map(stop.transfers, 0).concat(stop.routes))))
    style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(routesHere.map(r => parseInt(r, 10))))

    return (
      this.state.clickedStop ? <Redirect push to={`/stop/${this.state.clickedStop.properties.stop_id}`} /> :
      <Card className="map">
        <MapGL
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
          zoom={this.state.viewport.zoom}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
          attributionControl={false}
          onClick={this._onClick}
          children={<MapSatelliteSwitch onChange={this.handleChange} checked='true'/>}>
        </MapGL>
      </Card>
    )
  }
}

export default StopMap;