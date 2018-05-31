import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MapGL, { Marker } from 'react-map-gl';
import { Card, CardHeader } from '@material-ui/core';
import _ from 'lodash';
import WebMercatorViewport from 'viewport-mercator-project';

import Helpers from '../helpers.js';
import Stops from '../data/stops.js';
import {defaultMapStyle, routeLineIndex, routeLabelIndex, routeCaseIndex} from '../style.js';
import BusStop from './BusStop.js';
import BusIcon from '@material-ui/icons/DirectionsBus';

/** Map rendered on Stop page when a RoutePredictionList item is expanded */
class StopWithPredictionMap extends Component {
  constructor(props) {
    super(props)

    let stop = Stops[this.props.stopId] || null;

    this.state = {
      showSatellite: false,
      viewport: {
        latitude: parseFloat(stop.lat),
        longitude: parseFloat(stop.lon),
        zoom: window.innerWidth > 768 ? 17 : 15 ,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth > 768 ? window.innerWidth * (4/8) - 5 : window.innerWidth,
        height: window.innerWidth > 768 ? (window.innerHeight - 165) : 250,
      }
    }

    this._resize = this._resize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: parseFloat(Stops[nextProps.stopId].lat),
        longitude: parseFloat(Stops[nextProps.stopId].lon)
      }
    })
  }

  _resize = () => {
    if (window.innerWidth > 768) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth * (1/2) - 5,
          height: (window.innerHeight - 165)
        }
      });
    } else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: 250
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
    let transfers = _.groupBy(stop.transfers, 2)
    let bound, position = null
    if (this.props.prediction) {
      position = this.props.prediction.tripStatus.position
      let bbox = [
        Math.min(stop.lat, parseFloat(position.lat)), 
        Math.max(stop.lat, parseFloat(position.lat)), 
        Math.min(stop.lon, parseFloat(position.lon)), 
        Math.max(stop.lon, parseFloat(position.lon)), 
      ]
      let viewport = new WebMercatorViewport({width: this.state.viewport.width, height: this.state.viewport.height});
      bound = viewport.fitBounds(
        [
          [bbox[2], bbox[0]], 
          [bbox[3], bbox[1]]
        ],
          {padding: window.innerWidth > 768 ? 60 : 30}
        );
    }

    if (this.props.prediction) {
      style = style.setIn(['layers', routeLineIndex, 'filter', 2], parseInt(this.props.route, 10));
      style = style.setIn(['layers', routeLabelIndex, 'filter', 2], parseInt(this.props.route, 10));
      style = style.setIn(['layers', routeCaseIndex, 'filter', 2], parseInt(this.props.route, 10));
    } else {
      const routesHere = Array.from(new Set(_.flattenDeep(_.map(stop.transfers, 0).concat(stop.routes))))
      style = style.setIn(['layers', routeLineIndex, 'filter'], ["in", "route_num"].concat(routesHere.map(r => parseInt(r, 10))))   
      style = style.setIn(['layers', routeLabelIndex, 'filter'], ["in", "route_num"].concat(routesHere.map(r => parseInt(r, 10))))   
      style = style.setIn(['layers', routeCaseIndex, 'filter'], ["in", "route_num"].concat(routesHere.map(r => parseInt(r, 10))))   
      style = style.setIn(['layers', 1, 'layout', 'visibility'], 'visible')
      _.forEach(style.toJS().layers, (l, i) => {
        if(l['source-layer'] === 'road') {
          style = style.setIn(['layers', i, 'layout', 'visibility'], 'none')
        }
      })  
    }

    return (
      <Card className="map">
        <div style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
          <BusStop style={{ marginLeft: '1em', backgroundColor: 'rgba(0, 0, 0, .8)', color: 'yellow', borderRadius: 999, height: '1.8em', width: '1.8em' }}/>
          <CardHeader title={stop.name} subheader={`Stop ID: #${stop.id}`} style={{ fontSize: '1.2em', position: 'sticky'}}/>
        </div>
        <MapGL
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          latitude={this.props.prediction ? bound.latitude : this.state.viewport.latitude}
          longitude={this.props.prediction ? bound.longitude : this.state.viewport.longitude}
          zoom={this.props.prediction ? (bound.zoom < 16 ? Math.round(bound.zoom, 1) : 16) : 16.5}
          mapStyle={style}
          mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
          attributionControl={false}
          onClick={this._onClick}>
          <Marker latitude={stop.lat} longitude={stop.lon} offsetLeft={-10} offsetTop={-10}>
            <BusStop style={{ height: 20, width: 20, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'yellow' }} />
          </Marker>
          {this.props.prediction ? 
            <Marker latitude={position.lat} longitude={position.lon} offsetLeft={-10} offsetTop={-10}>
              <BusIcon style={{ height: 20, width: 20, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'white' }} />
            </Marker> :
            Object.keys(transfers).map((s, i) => (
              <Marker key={i} latitude={Stops[s].lat} longitude={Stops[s].lon} offsetLeft={-7.5} offsetTop={-7.5}>
                <Link to={{pathname: `/stop/${s}`}}>
                  <BusStop style={{ height: 15, width: 15, borderRadius: 9999, background: 'rgba(0,0,0,.65)', padding: 2.5, color: 'white' }}/>
                </Link>
              </Marker>
            ))
          }
        </MapGL>
      </Card>
    );
  }
}

StopWithPredictionMap.propTypes = {
  center: PropTypes.array,
  route: PropTypes.string,
  stopId: PropTypes.string,
}

export default StopWithPredictionMap;