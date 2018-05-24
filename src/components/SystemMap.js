import React, { Component } from 'react';
import MapGL, { NavigationControl} from 'react-map-gl';
import Helpers from '../helpers.js';
import {defaultMapStyle, routeLineIndex, routeLabelIndex, routeCaseIndex, routeHighlightIndex} from '../style.js';
import RouteLink from './RouteLink';
import routeDetails from '../data/routeDetails.js'
import { Card, CardHeader, CardContent } from '@material-ui/core';

/** Interactive map of the DDOT system, showing all routes.  */
class SystemMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 42.366927924767694,
        longitude: -83.10024569894267,
        zoom: 11,
        bearing: -1,
        width: window.innerWidth,
        height: window.innerHeight
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
      },
      selectRoutes: []
    };

    this._resize = this._resize.bind(this);
    this._updateViewport = this._updateViewport.bind(this);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _onClick = (e) => {
    if(e.features.length > 0) {
      this.setState({
        selectRoutes: [...new Set(e.features.map(f => (f.properties.route_num)))].map(sr => { return routeDetails.filter(rd => { return sr === rd.number })[0] })
      });
    }
  }
  
  componentDidMount() {
    window.addEventListener('resize', this._resize);
  }

  componentWillUnmount() {
  }

  render() {
    let style = defaultMapStyle;
    style = style.setIn(['layers', routeLineIndex, 'filter', 0], "!=");
    style = style.setIn(['layers', routeLineIndex, 'paint', 'line-opacity'], 1);
    style = style.setIn(['layers', routeCaseIndex, 'filter', 0], "!=");
    style = style.setIn(['layers', routeLabelIndex, 'filter'], ['in', 'route_num'].concat(this.state.selectRoutes.map(sr => sr.number )));
    style = style.setIn(['layers', routeHighlightIndex, 'filter'], ['in', 'route_num'].concat(this.state.selectRoutes.map(sr => sr.number )));

    return (
        <div>
          <MapGL
            {...this.state.viewport}
            {...this.state.settings}
            mapStyle={style}
            mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
            onViewportChange={this._updateViewport} 
            onClick={this._onClick}
            >
            <div style={{ position: 'absolute', right: 15, top: 15, transform: 'scale(1.2, 1.2)' }}>
              <NavigationControl onViewportChange={this._updateViewport} showCompass={false} />
            </div>
          </MapGL>
          <div style={{position: 'absolute', left: 15, top: 15, minWidth: 250, maxWidth: 400}}>
          {this.state.selectRoutes.map(sr => (
            <Card style={{marginBottom: '.5em'}}>
              <CardHeader component={RouteLink} id={sr.number} icons />
              <CardContent style={{marginTop: '1em'}}>
                <div>Runs from <b>{sr.between[0]}</b> to <b>{sr.between[1]}</b></div>
                <div style={{fontSize: '.9em', color: "#444", margin: '.25em 0em .75em 0em'}}>via 
                {sr.via.length > 1 ? ` ${sr.via.slice(0, -1).join(", ")} and ${sr.via[sr.via.length-1]}` : ` ${sr.via[0]}`}</div>
                {Object.keys(sr.services).map(svc => (
                  <div style={{display: 'flex', justifyContent: 'space-between', padding: '.2em 0em .2em .2em'}}>
                    <span style={{fontWeight: 700}}>{svc}</span> 
                    <span>
                      {sr.services[svc].service_hours.length > 1 ? 
                        `${sr.services[svc].service_hours[0]} - ${sr.services[svc].service_hours[1]}` 
                      : `${sr.services[svc].service_hours[0]}`}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
    );
  }
}

export default SystemMap;
