import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from "@turf/bbox";

import React, { useEffect } from "react";

import {navigate} from 'gatsby'

import style from "../css/mapstyle.json";

import routeLabels from '../data/route_labels.json'

const SystemMap = ({ routeFeatures, stopsFeatures }) => {

    useEffect(() => {
        let map = new mapboxgl.Map({
          container: "system-map",
          style: style,
          bounds: bbox(routeFeatures),
          fitBoundsOptions: {
            padding: 50
          },
        });
    
        map.addControl(new mapboxgl.FullscreenControl());
    
        map.addControl(
          new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          trackUserLocation: true
          })
          );
    
        let ctrl = new mapboxgl.NavigationControl({
          showCompass: false
        });
    
        map.addControl(ctrl, "bottom-left");
    
        map.on('moveend', () => {
        })
    
        map.on("load", () => {
    
          map.getSource("routes").setData(routeFeatures);
          map.getSource("labels").setData(routeLabels)

                // stops
      map.addSource("stops", {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: stopsFeatures
        }
      })
      map.addLayer({
        id: "stop-points",
        type: "circle",
        source: "stops",
        interactive: true,
        filter: ["==", "$type", "Point"],
        layout: {},
        minzoom: 14.75,
        paint: {
          "circle-color": "white",
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
        source: "stops",
        minzoom: 16.75,
        layout: {
          "text-line-height": 1,
          "text-size": {
            base: 1,
            stops: [[15, 7], [18, 15]]
          },
          "text-allow-overlap": true,
          "text-ignore-placement": true,
          "text-font": ["AvenirNext LT Pro Regular Bold"],
          "text-justify": "center",
          "text-padding": 0,
          "text-offset": [0, 1],
          'text-anchor': 'top',
          // "text-offset": {
          //   base: 1,
          //   type: "categorical",
          //   property: "direction",
          //   stops: [["eastbound", [0.5, 0.5]], ["westbound", [-0.5, -0.5]], ["northbound", [0.5, -0.5]], ["southbound", [-0.5, 0.5]]]
          // },
          // "text-anchor": {
          //   base: 1,
          //   type: "categorical",
          //   property: "direction",
          //   stops: [["southbound", "top-right"], ["northbound", "bottom-left"], ["eastbound", "top-left"], ["westbound", "bottom-right"]],
          //   default: "center"
          // },
          "text-field": ["get", "stopName"],
          "text-letter-spacing": -0.01,
          "text-max-width": 5
        },
        paint: {
          "text-translate": [0, 0],
          "text-halo-color": "hsl(0, 0%, 100%)",
          "text-halo-width": 2,
          "text-color": "hsl(0, 0%, 0%)",
          "text-opacity": {
            base: 1,
            stops: [[15, 0], [15.1, 0.1], [15.2, 1]]
          }
        }
      });

      map.on("click", "stop-points", e => {
        let stop = map.queryRenderedFeatures(e.point, {
          layers: ["stop-points"]
        })[0];

        navigate(`/stop/${stop.properties.stopCode}`)
      });

    
        });
      }, []);
    
    return (
        <div id="system-map" />
    )
}

export default SystemMap;