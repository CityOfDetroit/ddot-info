import {fromJS} from 'immutable';
import MAP_STYLE from './mapstyle.json';

// Add the vector tile source for counties
Object.assign(MAP_STYLE.sources, {
    ddotroutes: {
      type: 'vector',
      url: 'mapbox://cityofdetroit.cjbelah2m1spk32muemqy852a-75m4q'
    }
  });
  
Object.assign(MAP_STYLE.sources, {
    stops: {
      type: 'vector',
      url: 'mapbox://cityofdetroit.cjbeojxj72m3s34llgz0yt0u7-9mm9h'
    }
  });
  
// Insert route layer before stops
MAP_STYLE.layers.splice(
MAP_STYLE.layers.findIndex(layer => layer.id === 'stop-labels'), 0,
{
    "id": "ddot-routes",
    "type": "line",
    "source": "ddotroutes",
    "source-layer": "ddot_routes",
    "filter": [
        "==",
        "route_num",
        ""
    ],
    "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
    },
    "paint": {
        "line-color": {
            "base": 1,
            "type": "categorical",
            "property": "orientatio",
            "stops": [
                [
                    "Downtown",
                    "#44aa42"
                ],
                [
                    "East-West",
                    "#0079c2"
                ],
                [
                    "North-South",
                    "#9b5ba5"
                ],
                [
                    "Circular",
                    "#d07c32"
                ]
            ]
        },
        "line-width": {
            "base": 1,
            "stops": [
                [
                    9,
                    2
                ],
                [
                    22,
                    12
                ]
            ]
        },
        "line-offset": 0,
        "line-opacity": 1,
    }
});
  
export const routeLineIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'ddot-routes');
export const stopLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'stop-labels');
export const stopPointIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'stop-points');
export const highlightLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'highlight-labels');
export const highlightPointIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'highlight-points');

export const defaultMapStyle = fromJS(MAP_STYLE);