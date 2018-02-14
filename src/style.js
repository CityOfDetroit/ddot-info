import {fromJS} from 'immutable';
import MAP_STYLE from './mapstyle.json';

// Add the vector tile source for counties
Object.assign(MAP_STYLE.sources, {
    ddotroutes: {
      type: 'vector',
      url: 'mapbox://cityofdetroit.cjbelah2m1spk32muemqy852a-75m4q'
    }
  });
  
// Insert custom layers before city labels
MAP_STYLE.layers.splice(
MAP_STYLE.layers.findIndex(layer => layer.id === 'tunnel-street-limited'), 0,
// Highlighted county polygons

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
        "visibility": "visible"
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
                    3
                ],
                [
                    22,
                    15
                ]
            ]
        },
        "line-offset": 0,
        "line-opacity": 1
    }
});
  
export const highlightLayerIndex =
MAP_STYLE.layers.findIndex(layer => layer.id === 'ddot-routes');

export const defaultMapStyle = fromJS(MAP_STYLE);