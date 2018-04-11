import React, { Component } from 'react';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import _ from 'lodash';
import moment from 'moment';
import WebMercatorViewport from 'viewport-mercator-project';
import Stops from '../data/stops.js';
import chroma from 'chroma-js'
import Helpers from '../helpers.js';
import {defaultMapStyle, routeLineIndex, timepointLabelIndex} from '../style.js'
import {stopPointIndex} from '../style';

import Card, {CardHeader, CardContent} from 'material-ui/Card';
import BusIcon from 'material-ui-icons/DirectionsBus';

class RouteMap extends Component {
  constructor(props) {
    super(props);

    let tripIds = {}; 
    Object.keys(this.props.route.schedules).forEach(svc => {
      Object.keys(this.props.route.schedules.weekday).forEach(dir => {
        if (!tripIds[dir]) {
          tripIds[dir] = [];
        }
        tripIds[dir] = tripIds[dir].concat(this.props.route.schedules[svc][dir].trips.map(trip => trip.trip_id));
      });
    });

    // make timepoint GeoJSON
    const firstDir = Object.keys(this.props.route.schedules.weekday)[0]
    const firstDirTimepoints = this.props.route.timepoints[firstDir]
    console.log(firstDirTimepoints)
    const timepointFeatures = firstDirTimepoints.map(t => {      
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [Stops[t].lon, Stops[t].lat]
        },
        "properties": {
          "id": t,
          "name": Stops[t].name.toUpperCase().indexOf('ROSA PARKS') > -1 ? "Rosa Parks TC" : Stops[t].name,
          "stop_code": Stops[t].dir,
          "offset": Stops[t].offset || [3,1],
          "align": Stops[t].align || 'center'
        }
      }
    })

    const route = this.props.route

    const stopFeatures = _.filter(Stops, s => { return s.routes.map(r => r[0]).indexOf(route.id) > -1 }).map(t => {
      return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [t.lon, t.lat]
        },
        "properties": {
          "id": t.id,
          "name": t.name.toUpperCase().indexOf('ROSA PARKS TR') > -1 ? "Rosa Parks TC" : t.name,
          "stop_code": t.dir,
        }
      }
    });

    const viewport = new WebMercatorViewport({width: window.innerWidth > 650 ? window.innerWidth * (4/8) - 7.5 : window.innerWidth, height: window.innerWidth > 650 ? ((window.innerHeight - 128) * 1 - 114) : 250});
    const bound = viewport.fitBounds(route.bbox,
      { padding: window.innerWidth > 650 ? 50 : window.innerWidth / 20 }
    );

    this.state = {
      viewport: {
        latitude: bound.latitude,
        longitude: bound.longitude,
        zoom: bound.zoom,
        bearing: 0,
        width: window.innerWidth > 650 ? window.innerWidth * (4/8) - 7.5 : window.innerWidth,
        height: window.innerWidth > 650 ? ((window.innerHeight - 128) * 1 - 114) : 250
      },
      settings: {
        dragPan: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 9,
        maxZoom: 19,
        minPitch: 0,
        maxPitch: 0,
        maxBounds: route.bbox
      },
      directions: Object.keys(route.timepoints),
      realtimeTrips: [],
      showRealtime: true,
      fetched: false,
      tripIds: tripIds,
      timepointFeatures: timepointFeatures,
      stopFeatures: stopFeatures,
      showTimepoints: false
    };

    this._resize = this._resize.bind(this);
    this._updateViewport = this._updateViewport.bind(this)
  }

  fetchData() {
    fetch(`${Helpers.endpoint}/trips-for-route/DDOT_${this.props.route.rt_id}.json?key=BETA&includeStatus=true&includePolylines=false`)
    .then(response => response.json())
    .then(d => {
      let geojson = _.sortBy(d.data.list, 'status.tripId').map((bus, i) => {
        let direction = _.findKey(this.state.tripIds, t => { return t.indexOf(bus.status.activeTripId.slice(-4)) > -1});
        return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [bus.status.position.lon, bus.status.position.lat]
          },
          "properties": {
            "tripId": bus.status.activeTripId,
            "displayTripId": bus.status.activeTripId.slice(-4,),
            "scheduledDistanceAlongTrip": bus.status.scheduledDistanceAlongTrip,
            "nextStop": bus.status.nextStop,
            "nextStopOffset": bus.status.nextStopTimeOffset,
            "predicted": bus.status.predicted,
            "updateTime": moment(bus.status.lastUpdateTime).format("h:mm:ss a"),
            "onTime": bus.status.scheduleDeviation / 60,
            "lastStop": this.props.route.timepoints[direction] ? this.props.route.timepoints[direction].slice(-1)[0] : ``,
            "direction": direction
          }
        }
      });
      let realtimeTrips = _.filter(geojson, o => { return o.properties.direction !== undefined });
      this.setState({ 
        realtimeTrips: realtimeTrips,
        fetched: true
      });
    })
    .catch(e => console.log(e))
  }

  _resize = () => {
    if (window.innerWidth > 650) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth * (4/8) - 7.5,
          height: ((window.innerHeight - 128) * 1 - 104)
        }
      });
    }
    else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: 225
        }
      });
    }
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }
  
  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const route = this.props.route;

    let style = defaultMapStyle;
    style = style.setIn(['layers', routeLineIndex, 'filter', 2], parseInt(route.id, 10));
    style = style.setIn(['sources', 'timepoints', 'data'], {"type": "FeatureCollection", "features": this.state.timepointFeatures})
    style = style.setIn(['sources', 'busstops', 'data'], {"type": "FeatureCollection", "features": this.state.stopFeatures})

    style = style.setIn(['layers', timepointLabelIndex, 'paint', 'text-color'], chroma(this.props.route.color).darken(2).hex())
    style = style.setIn(['layers', stopPointIndex, 'paint', 'circle-stroke-color'], chroma(this.props.route.color).darken().hex())
    style = style.setIn(['layers', timepointLabelIndex, 'paint', 'text-halo-color'], "#fff")

    return (
      <Card className="routeMap" elevation={0}>
        <CardContent style={{padding: 0, margin: 0}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <CardHeader title='Route map' subheader='Zoom in to see all stops' />
            <div style={{display: 'grid', width: 250, gridTemplate: '1fr 1fr / 1fr 1fr', gridGap: 10, marginRight: '1em', fontSize: '.9em'}}>
                {this.state.directions.map(d => (
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <BusIcon style={{borderRadius: 9999, background: 'rgba(0,0,0,0.75)', padding: 2.5, color: Helpers.colors[d]}} /> 
                    <span style={{marginLeft: '.5em'}}>{_.capitalize(d)}</span>
                  </div>
                ))}
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span style={{borderRadius: 9999, border: '5px solid black', width: 20, height: 20, background: '#000'}}></span>
                  <span style={{marginLeft: '.5em'}}>Major stops</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <span style={{borderRadius: 9999, border: `5px solid ${this.props.route.color}`, width: 20, height: 20, background: '#fff'}}></span>
                  <span style={{marginLeft: '.5em'}}>Local stops</span>
                </div>
              </div>
          </div>
          <MapGL
            {...this.state.viewport}
            {...this.state.settings}
            mapStyle={style}
            mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
            onViewportChange={this._updateViewport} >
            {this.state.realtimeTrips.map(rt => (
              <div>
              <Marker latitude={rt.geometry.coordinates[1]} longitude={rt.geometry.coordinates[0]} offsetLeft={-12} offsetTop={-12}>
                <BusIcon style={{borderRadius: 9999, background: 'rgba(0,0,0,0.75)', padding: 2.5, color: Helpers.colors[rt.properties.direction]}} />
                {this.state.viewport.zoom > 17 ? <div>Some info about this</div> : ``}
              </Marker>
              </div>
            ))}
            <div style={{position: 'absolute', right: 15, top: 15, transform: 'scale(1.1, 1.1)'}}>
              <NavigationControl onViewportChange={this._updateViewport} showCompass={false} />
            </div>
          </MapGL>
        </CardContent>
      </Card>
    );
  }
}

export default RouteMap;
