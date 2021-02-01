import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from "@turf/bbox";

import React, { useEffect } from "react";

import style from "../css/mapstyle.json";

import routeLabels from '../data/route_labels.json'

const SystemMap = ({ routeFeatures }) => {

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
    
        });
      }, []);
    
    return (
        <div id="system-map" />
    )
}

export default SystemMap;