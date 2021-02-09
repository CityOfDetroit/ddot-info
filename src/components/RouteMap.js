import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from "@turf/bbox";
import busstop from '../images/busstop.png'
import bus from '../images/Bus-logo.png'
import arrow from '../images/arrow-up-solid.png'

import React, { useEffect, useState } from "react";
import {navigate} from 'gatsby'

import style from "../css/mapstyle.json";

const RouteMap = ({ routes, timepoints, stops, vehicles, tracked, setTracked }) => {

  let timepointsFeatures = timepoints.map(t => {
    let { theGeom, ...props } = t
    return {
      "type": "Feature",
      "geometry": theGeom['geojson'],
      "properties": props
    }
  })
  let stopsFeatures = stops.map(t => {
    let { theGeom, ...props } = t
    return {
      "type": "Feature",
      "geometry": theGeom['geojson'],
      "properties": props
    }
  })

  let bounds = bbox({ type: "FeatureCollection", features: routes })

  let [theMap, setTheMap] = useState(null)

  // here's the initial map setup useEffect; we'll store the map in state
  useEffect(() => {

    let map = new mapboxgl.Map({
      container: "map",
      style: style,
      bounds: bounds,
      fitBoundsOptions: {
        padding: 50
      },
      zoom: 12.75 // starting zoom
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

    map.loadImage(busstop, (error, image) => {
      map.addImage('bus-stop', image)
    })

    map.loadImage(bus, (error, image) => {
      map.addImage('bus', image)
    })

    map.loadImage(arrow, (error, image) => {
      map.addImage('arrow', image)
    })



    map.on("load", () => {

      setTheMap(map)

      routes.forEach((r, i) => {
        if(r.properties.color = '#FFFFFF') {
          routes[i].properties.color='#5f6369'
        }
      })
      // routes
      map.getSource("routes").setData({ type: "FeatureCollection", features: routes });

      // timepoints
      map.addSource("timepoints", {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: timepointsFeatures
        }
      })
      map.addLayer({
        id: "timepoint-points",
        type: "circle",
        source: "timepoints",
        interactive: true,
        maxzoom: 15,
        layout: {},
        paint: {
          "circle-color": "#444",
          "circle-stroke-color": "black",
          "circle-stroke-width": {
            stops: [[8, 1], [19, 3]]
          },
          "circle-stroke-opacity": 1,
          "circle-opacity": 1,
          "circle-radius": {
            stops: [[8, 0.5], [10.5, 2.5], [15, 4]]
          }
        }
      });
      map.addLayer({
        id: "timepoint-labels",
        type: "symbol",
        source: "timepoints",
        maxzoom: 15,
        layout: {
          "text-line-height": 0.8,
          "text-size": {
            base: 1,
            stops: [[6, 6], [11, 10], [13, 14]]
          },
          "text-allow-overlap": false,
          "text-padding": 10,
          "text-offset": [0, 1.5],
          "text-font": ["AvenirNext LT Pro Regular Bold"],
          visibility: "visible",
          "text-field": ['get', 'stopName'],
          "text-max-width": 5
        },
        paint: {
          "text-translate": [0, 0],
          "text-halo-color": "white",
          "text-halo-width": 2,
          "text-opacity": {
            stops: [[9.5, 0], [9.51, 0.1], [9.6, 0.9], [14.9, 0.9], [15, 0]]
          },
          "text-color": "black"
        }
      });


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
        minzoom: 14,
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
        minzoom: 15,
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
        filter: ["==", ["get", "vid"], tracked],
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
      // map.addLayer({
      //   id: "realtime-icons",
      //   type: "symbol",
      //   source: "realtime",
      //   layout: {
      //     "icon-image": "bus",
      //     "icon-allow-overlap": true,
      //     "icon-size": 0.3,
      //     "icon-offset": [0, -50]
      //   }
      // });

      map.on("click", "stop-points", e => {
        let stop = map.queryRenderedFeatures(e.point, {
          layers: ["stop-points"]
        })[0];

        navigate(`/stop/${stop.properties.stopCode}`)
      });

      map.on("click", "realtime-circle", e => {
        let clickedTrip = map.queryRenderedFeatures(e.point, {
          layers: ["realtime-circle"]
        })[0];

        // let matchedTrip = activeTrips.filter(at => at.status.vehicleId === clickedTrip.properties.vehicleId)[0];
        setTracked(clickedTrip.properties.vid);
      });

      map.on("mouseover", "stop-points", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "stop-points", () => {
        map.getCanvas().style.cursor = "";
      });

    });
  }, []);

  useEffect(() => {
    if (theMap && vehicles) {
      theMap.getSource("realtime").setData({ type: "FeatureCollection", features: vehicles })
      if (tracked) {
        let filtered = vehicles.filter(trip => trip.properties.vid === tracked);
        theMap.setFilter("realtime-highlight", ["==", ['get', 'vid'], tracked])

        if (filtered.length === 0) {
          return;
        } else {
          theMap.easeTo({
            center: filtered[0].geometry.coordinates,
            zoom: 15.5
          });
        }
      }

      else {
        theMap.setFilter("realtime-highlight", ["==", ['get', 'vid'], ''])
      }
    }
  }, [vehicles, theMap, tracked])


  return (
    <div id="map" />
  );
};

export default RouteMap;
