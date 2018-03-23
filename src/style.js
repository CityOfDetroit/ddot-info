import {fromJS} from 'immutable';
import MAP_STYLE from './mapstyle.json';

// Add the vector tile source for counties
Object.assign(MAP_STYLE.sources, {
    ddotroutes: {
      type: 'vector',
      url: 'mapbox://cityofdetroit.cjdqljjkt1zwc33qhodtkd2d8-496vb'
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
MAP_STYLE.layers.findIndex(layer => layer.id === 'road-label-small'), 0,
{
    "id": "ddot-routes",
    "type": "line",
    "source": "ddotroutes",
    "source-layer": "DDOTRoutes",
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
        // "line-color": "red",
        "line-color": {
            "base": 1,
            "type": "categorical",
            "property": "orientation",
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
                    "Special",
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
                    18,
                    15
                ]
            ]
        },
        "line-offset": 0,
        "line-opacity": 0.75,
    }
}
);
  
export const routeLineIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'ddot-routes');
export const timepointLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'timepoint-labels');
export const stopLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'stop-labels');
export const stopPointIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'busstop-points');
export const highlightLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'highlight-labels');
export const highlightPointIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'highlight-points');
export const realtimeLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'realtime');
export const realtimeIconIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'realtime-background');


export const defaultMapStyle = fromJS(MAP_STYLE);