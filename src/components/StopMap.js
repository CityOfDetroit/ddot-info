import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from "@turf/bbox";
import bus from '../images/Bus-logo.png'
import arrow from '../images/arrow-up-solid.png'


import React, { useEffect, useState } from "react";

import style from "../css/mapstyle.json";

const StopMap = ({ stopLon, stopLat, stopName, routeFeatures, currentTrip, predictions }) => {

  let [theMap, setTheMap] = useState(null)

  // here's the initial map setup useEffect; we'll store the map in state
  useEffect(() => {

    let map = new mapboxgl.Map({
      container: "map",
      style: style,
      center: [stopLon, stopLat],
      zoom: 16.75 // starting zoom
    });

    map.addControl(new mapboxgl.FullscreenControl());

    let ctrl = new mapboxgl.NavigationControl({
      showCompass: false
    });

    map.addControl(ctrl, "bottom-left");

    map.on("load", () => {
      setTheMap(map)

      map.loadImage(bus, (error, image) => {
        map.addImage('bus', image)
      })
  
      map.loadImage(arrow, (error, image) => {
        map.addImage('arrow', image)
      })

      // routes
      map.getSource("routes").setData({ type: "FeatureCollection", features: routeFeatures });


      map.addSource("stop", {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          features: [
            { type: "Feature", geometry: { "type": "Point", coordinates: [stopLon, stopLat] }, properties: {"name": stopName} }
          ]
        }
      })

      map.addLayer({
        id: "stop-points",
        type: "circle",
        source: "stop",
        interactive: true,
        filter: ["==", "$type", "Point"],
        layout: {},
        paint: {
          "circle-color": "yellow",
          "circle-stroke-color": "#222",
          "circle-stroke-width": {
            stops: [[13, 1], [19, 3]]
          },
          "circle-stroke-opacity": {
            stops: [[13, 0], [13.1, 0.1], [13.2, 0.8]]
          },
          "circle-opacity": {
            stops: [[13, 0], [13.1, 0.1], [13.2, 0.8]]
          },
          "circle-radius": {
            stops: [[13, 1.5], [19, 12]]
          }
        }
      });

      map.addLayer({
        id: "stop-labels",
        type: "symbol",
        source: "stop",
        layout: {
          "text-line-height": 1,
          "text-size": {
            base: 1,
            stops: [[15, 7], [18, 15]]
          },
          "text-allow-overlap": true,
          "text-ignore-placement": true,
          "text-font": ["Montserrat SemiBold"],
          "text-justify": "center",
          "text-padding": 0,
          "text-offset": [0, 1],
          'text-anchor': 'top',
          "text-field": ["get", "name"],
          "text-letter-spacing": -0.01,
          "text-max-width": 5
        },
        paint: {
          "text-translate": [0, 0],
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 1,
          "text-color": "hsl(0, 0%, 0%)",
          "text-opacity": {
            base: 1,
            stops: [[15, 0], [15.1, 0.1], [15.2, 1]]
          }
        }
      });

      // realtime
      map.addSource("realtime", {
        type: "geojson",
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
      map.addLayer({
        id: "realtime-highlight",
        type: "circle",
        source: "realtime",
        filter: ["==", ["get", "vid"], currentTrip],
        paint: {
          "circle-radius": 14,
          "circle-color": "rgba(233,212,96,0.95)"
        }
      });
      map.addLayer({
        id: "realtime-circle",
        type: "circle",
        source: "realtime",
        paint: {
          "circle-radius": 8,
          "circle-color": "rgba(189,189,189,0.97)",
          "circle-stroke-width": 2
        }
      });
      map.addLayer({
        id: "realtime-icons",
        type: "symbol",
        source: "realtime",
        layout: {
          "icon-image": "arrow",
          "icon-allow-overlap": true,
          "icon-size": 0.1,
          // "icon-offset": [0,-100],
          "icon-rotate": ['to-number', ['get', 'hdg']]
        }
      });
    });
  }, []);

  useEffect(() => {
    if (theMap && predictions) {
      // theMap.getSource("realtime").setData({ type: "FeatureCollection", features: vehicles })
      if (currentTrip) {
        // let filtered = vehicles.filter(trip => trip.properties.vid === tracked);
        // theMap.setFilter("realtime-highlight", ["==", ['get', 'vid'], tracked])

        // if (filtered.length === 0) {
        //   return;
        // } else {
        //   theMap.easeTo({
        //     center: filtered[0].geometry.coordinates,
        //     zoom: 15.5
        //   });
        // }
      }

      else {
        // theMap.setFilter("realtime-highlight", ["==", ['get', 'vid'], ''])
        // theMap.fitBounds(bounds, {
        //   padding: 50
        // })
      }
    }
  }, [predictions, theMap, currentTrip])

  return (
    <div id="map" />
  );
};

export default StopMap;