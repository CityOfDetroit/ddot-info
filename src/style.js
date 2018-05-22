import {fromJS} from 'immutable';
import MAP_STYLE from './mapstyle.json';

// Add the vector tile source for counties
Object.assign(MAP_STYLE.sources, {
    ddotroutes: {
      type: 'vector',
      url: 'mapbox://cityofdetroit.bvmcgwpu'
    }
  });
  
Object.assign(MAP_STYLE.sources, {
    stops: {
        type: 'vector',
        url: 'mapbox://cityofdetroit.cjbeojxj72m3s34llgz0yt0u7-9mm9h'
    }
});


MAP_STYLE.layers.splice(
MAP_STYLE.layers.findIndex(layer => layer.id === 'road-label-small'), 0,
{
    "id": "ddot-routes-case",
    "type": "line",
    "source": "ddotroutes",
    "source-layer": "ddot_new",
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
        "line-color": "#555",
        "line-width": {
            "base": 1,
            "stops": [[9,3],[18,14],[22,50]]
        },
        "line-offset": 0,
        "line-opacity": 1,
    }
}
);

// Insert route layer before stops
MAP_STYLE.layers.splice(
MAP_STYLE.layers.findIndex(layer => layer.id === 'road-label-small'), 0,
{
    "id": "ddot-routes",
    "type": "line",
    "source": "ddotroutes",
    "source-layer": "ddot_new",
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
                    // "rgba(0,0,0,1)"
                    // "#44aa42"
                    "#78AA77"
                ],
                [
                    "East-West",
                    // "rgba(0,0,0,1)"
                    // "#0079c2"
                    "#619EC2"
                ],
                [
                    "North-South",
                    // "rgba(0,0,0,1)"
                    // "#9b5ba5"
                    "#A081A5"
                ],
                [
                    "Special",
                    // "rgba(0,0,0,1)"
                    // "#d07c32"
                    "#D0A681"
                ]
            ]
        },
        "line-width": {
            "base": 1,
            "stops": [[9,2],[18,12],[22,45]]
        },
        "line-offset": 0,
        "line-opacity": 0.85,
    }
}
);
  
export const routeLineIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'ddot-routes');
export const routeCaseIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'ddot-routes-case');
export const routeLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'ddot-new copy');
export const timepointLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'timepoint-labels');
export const stopLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'stop-labels');
export const stopPointIndexTwo =
MAP_STYLE.layers.findIndex(layer => layer.id === 'stop-points');
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
export const walkRadiusLabelIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'walk-radius-label');


export const defaultMapStyle = fromJS(MAP_STYLE);