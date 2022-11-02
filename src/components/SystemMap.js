import bbox from "@turf/bbox";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import React, { useEffect, useState } from "react";
import baseStyle from "../css/mapstyle";
import { downtownLabels, labels } from '../data/labels.js';

const SystemMap = ({ routeFeatures, clicked, selected, setSelected }) => {

  const [theMap, setTheMap] = useState(null)
  const [zoom, setZoom] = useState(true)
  
  // use these to set the initial bbox
  let connectTenFeatures = routeFeatures.features.filter(r => r.properties.RouteType === 'ConnectTen')
  let systemMapBbox = bbox({ type: "FeatureCollection", features: connectTenFeatures })

  useEffect(() => {
    let map = new mapboxgl.Map({
      container: "system-map",
      style: baseStyle,
      bounds: systemMapBbox,
      minZoom: 9,
      fitBoundsOptions: {
        padding: 10
      },
    });

    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'bottom-right'
    );

    let ctrl = new mapboxgl.NavigationControl({
      showCompass: false
    });

    map.addControl(ctrl, "bottom-left");

    map.on('moveend', () => {
      setZoom(map.getZoom())
    })

    map.on("load", () => {

      setZoom(map.getZoom())

      map.getSource("routes").setData(routeFeatures);
      map.getSource("labels").setData(downtownLabels)

      map.on("click", e => {
        let clickedRoutes = map.queryRenderedFeatures(e.point, {
          layers: ["ddot-part-time-case", "ddot-part-time-case-express", "ddot-part-time-case", "ddot-neighborhood-case", "ddot-key-case", "ddot-connect-ten-case"]
        });
        
        if(clickedRoutes.length > 0) {
          setSelected([...new Set(clickedRoutes.map(r => r.properties.short.toString()))].sort((a, b) => a - b))
        }
      });

      setTheMap(map)


    });
  }, []);

  useEffect(() => {
    if (theMap) {
      let clickedRoutes = Object.keys(clicked).filter(k => clicked[k] === true)
      let filteredRouteFeatures = routeFeatures.features.filter(rf => clickedRoutes.indexOf(rf.properties.short) > -1)
      theMap.getSource('routes').setData({type: "FeatureCollection", features: filteredRouteFeatures})
      let filteredRouteLabels
      if(zoom > 13.5) {
        filteredRouteLabels = downtownLabels.features.filter(rl => clickedRoutes.indexOf(rl.properties.RouteNum.toString()) > -1)
      }
      else {
        filteredRouteLabels = labels.features.filter(rl => clickedRoutes.indexOf(rl.properties.RouteNum.toString()) > -1)
      }
      theMap.getSource('labels').setData({type: "FeatureCollection", features: filteredRouteLabels})
    }
  }, [clicked, theMap, routeFeatures.features])

  useEffect(() => {
    if (theMap) {
      theMap.setFilter("ddot-route-highlight", ["in", "short"].concat(selected))
    }
  }, [selected])

  return (
    <div id="system-map" />
  )
}

export default SystemMap;