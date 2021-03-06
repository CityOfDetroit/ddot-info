const baseStyle = {
  "version": 8,
  "metadata": {
    "arcgisStyleUrl": "https://www.arcgis.com/sharing/rest/content/items/273bf8d5c8ac400183fc24e109d20bcf/resources/styles/root.json",
    "arcgisOriginalItemTitle": "Community",
    "maputnik:renderer": "mbgljs"
  },
  "sources": {
    "esri": {
      "type": "vector",
      "tiles": [
        "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf"
      ]
    },
    "nearby": {
      "type": "geojson",
      "data": {"type": "FeatureCollection", "features": []}
    },
    "routes": {
      "type": "geojson",
      "data": {"type": "FeatureCollection", "features": []}
    },
    "labels": {
      "type": "geojson",
      "data": {"type": "FeatureCollection", "features": []}
    }
  },
  "sprite": "https://cdn.arcgis.com/sharing/rest/content/items/273bf8d5c8ac400183fc24e109d20bcf/resources/styles/../sprites/sprite",
  "glyphs": "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "Land/Not ice",
      "type": "fill",
      "source": "esri",
      "source-layer": "Land",
      "minzoom": 0,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[0, "#dce0ca"], [10, "#E6E5D6"], [15, "#f2eee9"]]
        }
      }
    },
    {
      "id": "Land/Ice",
      "type": "fill",
      "source": "esri",
      "source-layer": "Land",
      "minzoom": 0,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {"fill-color": "#E6E5D6"}
    },
    {
      "id": "Vegetation small scale/High density",
      "type": "fill",
      "source": "esri",
      "source-layer": "Vegetation small scale",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {
        "fill-color": "#c2e699",
        "fill-opacity": {"stops": [[0, 0.3], [5, 0.28], [7, 0.18], [10, 0.08]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Vegetation small scale/Low density",
      "type": "fill",
      "source": "esri",
      "source-layer": "Vegetation small scale",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {
        "fill-color": "#9ad666",
        "fill-opacity": {"stops": [[0, 0.3], [5, 0.28], [7, 0.18], [10, 0.08]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Indigenous",
      "type": "fill",
      "source": "esri",
      "source-layer": "Indigenous",
      "minzoom": 6,
      "layout": {},
      "paint": {
        "fill-color": "#dbd5bd",
        "fill-outline-color": "#d6d4c8",
        "fill-opacity": 0.35
      }
    },
    {
      "id": "Openspace or forest",
      "type": "fill",
      "source": "esri",
      "source-layer": "Openspace or forest",
      "minzoom": 9,
      "layout": {},
      "paint": {"fill-color": "#CDDFB3", "fill-antialias": false}
    },
    {
      "id": "Admin0 forest or park",
      "type": "fill",
      "source": "esri",
      "source-layer": "Admin0 forest or park",
      "minzoom": 6,
      "layout": {},
      "paint": {
        "fill-color": "#CDDFB3",
        "fill-opacity": {"stops": [[6, 0.4], [8, 1]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Admin0 forest or park/line2",
      "type": "line",
      "source": "esri",
      "source-layer": "Admin0 forest or park",
      "minzoom": 6,
      "layout": {},
      "paint": {
        "line-color": "#c0d3a5",
        "line-opacity": 0.3,
        "line-width": {"base": 1.2, "stops": [[6, 0.6], [15, 15]]}
      }
    },
    {
      "id": "Admin0 forest or park/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Admin0 forest or park",
      "minzoom": 6,
      "layout": {},
      "paint": {
        "line-color": "#c0d3a5",
        "line-opacity": {"stops": [[6, 0.4], [8, 1]]},
        "line-width": {"base": 1.2, "stops": [[6, 0.6], [9, 1.1]]}
      }
    },
    {
      "id": "Admin1 forest or park",
      "type": "fill",
      "source": "esri",
      "source-layer": "Admin1 forest or park",
      "minzoom": 7,
      "layout": {},
      "paint": {
        "fill-color": "#CDDFB3",
        "fill-opacity": {"stops": [[6, 0.4], [8, 1]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Admin1 forest or park/line2",
      "type": "line",
      "source": "esri",
      "source-layer": "Admin1 forest or park",
      "minzoom": 7,
      "layout": {},
      "paint": {
        "line-color": "#c0d3a5",
        "line-opacity": 0.3,
        "line-width": {"base": 1.2, "stops": [[6, 0.6], [15, 15]]}
      }
    },
    {
      "id": "Admin1 forest or park/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Admin1 forest or park",
      "minzoom": 7,
      "layout": {},
      "paint": {
        "line-color": "#c0d3a5",
        "line-opacity": {"stops": [[6, 0.4], [8, 1]]},
        "line-width": {"base": 1.2, "stops": [[6, 0.6], [9, 1.1]]}
      }
    },
    {
      "id": "Zoo",
      "type": "fill",
      "source": "esri",
      "source-layer": "Zoo",
      "minzoom": 11,
      "layout": {},
      "paint": {"fill-color": {"stops": [[11, "#CDDFB3"], [17, "#A5C187"]]}}
    },
    {
      "id": "Military",
      "type": "fill",
      "source": "esri",
      "source-layer": "Military",
      "minzoom": 6,
      "layout": {},
      "paint": {
        "fill-color": "#d9d9d9",
        "fill-opacity": 0.5,
        "fill-antialias": false
      }
    },
    {
      "id": "Port",
      "type": "fill",
      "source": "esri",
      "source-layer": "Port",
      "minzoom": 12,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[13, "#d9d2c8"], [15, "#E6E0D9"], [19, "#ECE7E1"]]
        }
      }
    },
    {
      "id": "Transportation",
      "type": "fill",
      "source": "esri",
      "source-layer": "Transportation",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[13, "#ddd3c5"], [15, "#E8E1D7"], [19, "#EDE7E0"]]
        }
      }
    },
    {
      "id": "Industry",
      "type": "fill",
      "source": "esri",
      "source-layer": "Industry",
      "minzoom": 12,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[13, "#d9d2c8"], [15, "#E2DCD4"], [19, "#ECE7E1"]]
        }
      }
    },
    {
      "id": "Golf course",
      "type": "fill",
      "source": "esri",
      "source-layer": "Golf course",
      "minzoom": 11,
      "layout": {},
      "paint": {"fill-color": "#D6E6C3"}
    },
    {
      "id": "Airport/Airport property",
      "type": "fill",
      "source": "esri",
      "source-layer": "Airport",
      "minzoom": 9,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[9, "#d9d6d2"], [11, "#e3e1df"], [15, "#EAE7E4"]]
        },
        "fill-outline-color": "#DDDBD9"
      }
    },
    {
      "id": "Airport/Airport runway",
      "type": "fill",
      "source": "esri",
      "source-layer": "Airport",
      "minzoom": 11,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {"fill-color": {"stops": [[11, "#dddbd9"], [22, "#8D8C8A"]]}}
    },
    {
      "id": "Retail",
      "type": "fill",
      "source": "esri",
      "source-layer": "Retail",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[11, "#f7c2b5"], [15, "#F5D8CF"], [19, "#F3E8E2"]]
        }
      }
    },
    {
      "id": "Water and wastewater",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water and wastewater",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[13, "#ddd3c5"], [15, "#E8E1D7"], [19, "#EDE7E0"]]
        }
      }
    },
    {
      "id": "Freight",
      "type": "fill",
      "source": "esri",
      "source-layer": "Freight",
      "minzoom": 12,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[13, "#d9d2c8"], [15, "#E2DCD4"], [19, "#EDE7E0"]]
        }
      }
    },
    {
      "id": "Cemetery",
      "type": "fill",
      "source": "esri",
      "source-layer": "Cemetery",
      "minzoom": 13,
      "layout": {},
      "paint": {"fill-color": "#d3e6b9"}
    },
    {
      "id": "Finance",
      "type": "fill",
      "source": "esri",
      "source-layer": "Finance",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[11, "#f7c2b5"], [15, "#F5D8CF"], [19, "#F3E8E2"]]
        }
      }
    },
    {
      "id": "Government",
      "type": "fill",
      "source": "esri",
      "source-layer": "Government",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[13, "#ddd3c5"], [15, "#E8E1D7"], [19, "#EDE7E0"]]
        }
      }
    },
    {
      "id": "Emergency",
      "type": "fill",
      "source": "esri",
      "source-layer": "Emergency",
      "minzoom": 13,
      "layout": {},
      "paint": {"fill-color": "#E8E7E5"}
    },
    {
      "id": "Landmark",
      "type": "fill",
      "source": "esri",
      "source-layer": "Landmark",
      "minzoom": 13,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[10, "#d7ede6"], [15, "#E5EEE8"], [19, "#EBEEE8"]]
        }
      }
    },
    {
      "id": "Pedestrian",
      "type": "fill",
      "source": "esri",
      "source-layer": "Pedestrian",
      "minzoom": 13,
      "layout": {},
      "paint": {"fill-color": "#E8E7E5", "fill-outline-color": "#bcb7ae"}
    },
    {
      "id": "Education",
      "type": "fill",
      "source": "esri",
      "source-layer": "Education",
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[11, "#dde2a9"], [15, "#E8E8C9"], [19, "#EEEBDB"]]
        }
      }
    },
    {
      "id": "Medical",
      "type": "fill",
      "source": "esri",
      "source-layer": "Medical",
      "minzoom": 11,
      "layout": {},
      "paint": {
        "fill-color": {
          "stops": [[11, "#c7dff4"], [15, "#DDE7EF"], [19, "#E7EAEC"]]
        }
      }
    },
    {
      "id": "Park or farming",
      "type": "fill",
      "source": "esri",
      "source-layer": "Park or farming",
      "minzoom": 11,
      "layout": {},
      "paint": {"fill-color": {"stops": [[11, "#CDDFB3"], [17, "#A5C187"]]}}
    },
    {
      "id": "Beach",
      "type": "fill",
      "source": "esri",
      "source-layer": "Beach",
      "minzoom": 13,
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Sand"}
    },
    {
      "id": "Special area of interest/Garden path",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 12],
      "layout": {"visibility": "none"},
      "paint": {"fill-color": "#f5f5f1", "fill-outline-color": "#EBE8E8"}
    },
    {
      "id": "Special area of interest/Green openspace",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 11],
      "layout": {},
      "paint": {"fill-color": {"stops": [[14, "#c5e0a9"], [17, "#A5C187"]]}}
    },
    {
      "id": "Special area of interest/Grass",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 8],
      "layout": {},
      "paint": {"fill-color": {"stops": [[14, "#b4d197"], [17, "#84A661"]]}}
    },
    {
      "id": "Special area of interest/Grass/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 8],
      "layout": {},
      "paint": {
        "line-color": {"stops": [[14, "#a4c683"], [17, "#739551"]]},
        "line-width": {"stops": [[15, 1.1], [22, 10]]},
        "line-blur": {"stops": [[15, 1], [22, 5]]}
      }
    },
    {
      "id": "Special area of interest/Grass/pattern",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 8],
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Grass",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "Special area of interest/Grass/pattern/1",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 8],
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Small stipple"}
    },
    {
      "id": "Special area of interest/Baseball field or other grounds",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {"fill-color": "#91a761"}
    },
    {
      "id": "Special area of interest/Baseball field or other grounds/pattern",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Baseball field or other grounds"
      }
    },
    {
      "id": "Special area of interest/Groundcover",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 13],
      "layout": {},
      "paint": {"fill-color": "#97be82"}
    },
    {
      "id": "Special area of interest/Groundcover/pattern",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 13],
      "layout": {},
      "paint": {
        "fill-pattern": "Special area of interest/Groundcover",
        "fill-opacity": 0.5
      }
    },
    {
      "id": "Special area of interest/Field or court exterior",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 5],
      "layout": {},
      "paint": {"fill-color": "#6E866E"}
    },
    {
      "id": "Special area of interest/Football field or court",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 4],
      "layout": {},
      "paint": {"fill-color": "#7fa57a"}
    },
    {
      "id": "Special area of interest/Football field or court/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 4],
      "layout": {},
      "paint": {
        "line-color": "#e3e0da",
        "line-opacity": 0.8,
        "line-width": {"base": 1.2, "stops": [[15, 0.5], [20, 4]]}
      }
    },
    {
      "id": "Special area of interest/Hardcourt",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 10],
      "layout": {},
      "paint": {"fill-color": {"stops": [[15, "#dddbd9"], [22, "#8D8C8A"]]}}
    },
    {
      "id": "Special area of interest/Hardcourt/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 10],
      "layout": {},
      "paint": {
        "line-color": "#e3e0da",
        "line-opacity": 0.8,
        "line-width": {"base": 1.2, "stops": [[15, 0.5], [20, 4]]}
      }
    },
    {
      "id": "Special area of interest/Mulch or dirt",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 14],
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Mulch or dirt"}
    },
    {
      "id": "Special area of interest/Mulch or dirt/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 14],
      "layout": {},
      "paint": {
        "line-color": "#c9b58b",
        "line-width": {"stops": [[15, 1.1], [22, 10]]},
        "line-blur": {"stops": [[15, 1], [22, 5]]}
      }
    },
    {
      "id": "Special area of interest/Athletic track",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {"fill-color": {"stops": [[14, "#d49a87"], [17, "#cb7169"]]}}
    },
    {
      "id": "Special area of interest/Athletic track/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {
        "line-color": "#e3e0da",
        "line-opacity": 0.8,
        "line-width": {"base": 1.2, "stops": [[15, 0.5], [20, 4]]}
      }
    },
    {
      "id": "Special area of interest/Sand",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 6],
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Sand"}
    },
    {
      "id": "Special area of interest/Parking/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 15,
      "filter": ["==", "_symbol", 15],
      "layout": {},
      "paint": {
        "line-color": {"stops": [[15, "#d1cfcd"], [22, "#7c7b79"]]},
        "line-opacity": 0.8,
        "line-width": {"stops": [[15, 1.1], [22, 10]]},
        "line-blur": {"stops": [[15, 1], [22, 5]]}
      }
    },
    {
      "id": "Special area of interest/Parking",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 15,
      "filter": ["==", "_symbol", 15],
      "layout": {},
      "paint": {"fill-color": {"stops": [[15, "#dddbd9"], [22, "#8D8C8A"]]}}
    },
    {
      "id": "Special area of interest/Parking/Small stipple",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 15,
      "filter": ["==", "_symbol", 15],
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Small stipple"}
    },
    {
      "id": "Special area of interest/Rock or gravel",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 16],
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Rock or gravel"}
    },
    {
      "id": "Water line small scale",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line small scale",
      "minzoom": 1,
      "maxzoom": 5,
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {"stops": [[1, "#B7D7D9"], [10.6, "#6BC4F0"]]},
        "line-width": {"base": 1.2, "stops": [[1, 0.5], [5, 0.5]]}
      }
    },
    {
      "id": "Water line medium scale",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line medium scale",
      "minzoom": 5,
      "maxzoom": 7,
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {"stops": [[1, "#B7D7D9"], [10.6, "#6BC4F0"]]},
        "line-width": {"base": 1.2, "stops": [[5, 0.5], [7, 0.7]]}
      }
    },
    {
      "id": "Water line large scale",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line large scale",
      "minzoom": 7,
      "maxzoom": 11,
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[1, "#B7D7D9"], [10.6, "#6BC4F0"]]},
        "line-width": {"base": 1.2, "stops": [[7, 0.5], [11, 0.7]]}
      }
    },
    {
      "id": "Water line/Waterfall",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 11,
      "filter": ["==", "_symbol", 5],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#6BC4F0",
        "line-width": 0.8,
        "line-dasharray": [5, 5]
      }
    },
    {
      "id": "Water line/Dam or weir",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 11,
      "filter": ["==", "_symbol", 2],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#afafaf",
        "line-width": {"base": 1.2, "stops": [[11, 0.7], [14, 0.7], [17, 2]]}
      }
    },
    {
      "id": "Water line/Levee/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 11,
      "filter": ["==", "_symbol", 3],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#c3c3c3",
        "line-width": {"base": 1.2, "stops": [[11, 0.7], [14, 0.7], [20, 2.5]]}
      }
    },
    {
      "id": "Water line/Levee/0",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 13,
      "filter": ["==", "_symbol", 3],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "icon-image": "Water line/Levee/0",
        "symbol-spacing": 13.3,
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-padding": 1
      },
      "paint": {}
    },
    {
      "id": "Water line/Canal or ditch",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 11,
      "filter": ["==", "_symbol", 1],
      "layout": {"line-cap": "round"},
      "paint": {
        "line-color": "#6BC4F0",
        "line-width": {"base": 1.2, "stops": [[11, 0.7], [14, 0.7], [17, 2]]}
      }
    },
    {
      "id": "Water line/Stream or river intermittent",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 11,
      "filter": ["==", "_symbol", 4],
      "layout": {},
      "paint": {
        "line-color": "#6BC4F0",
        "line-dasharray": [7, 3],
        "line-width": {"base": 1.2, "stops": [[11, 0.7], [14, 0.7], [17, 2]]}
      }
    },
    {
      "id": "Water line/Stream or river",
      "type": "line",
      "source": "esri",
      "source-layer": "Water line",
      "minzoom": 11,
      "filter": ["==", "_symbol", 0],
      "layout": {"line-cap": "round"},
      "paint": {
        "line-color": "#6BC4F0",
        "line-width": {"base": 1.2, "stops": [[11, 0.7], [14, 0.7], [17, 2]]}
      }
    },
    {
      "id": "Marine area/1",
      "type": "fill",
      "source": "esri",
      "source-layer": "Marine area",
      "minzoom": 0,
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#53B9EA"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Bathymetry/depth 2 (shallow water)",
      "type": "fill",
      "source": "esri",
      "source-layer": "Bathymetry",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#5BBDEC"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Bathymetry/depth 3",
      "type": "fill",
      "source": "esri",
      "source-layer": "Bathymetry",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#63C0EE"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Bathymetry/depth 4",
      "type": "fill",
      "source": "esri",
      "source-layer": "Bathymetry",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 2],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#6BC4F0"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Bathymetry/depth 5",
      "type": "fill",
      "source": "esri",
      "source-layer": "Bathymetry",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 3],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#72C8F1"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Bathymetry/depth 6",
      "type": "fill",
      "source": "esri",
      "source-layer": "Bathymetry",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 4],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#7ACBF3"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Bathymetry/depth 7 (deep water)",
      "type": "fill",
      "source": "esri",
      "source-layer": "Bathymetry",
      "maxzoom": 11,
      "filter": ["==", "_symbol", 5],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#82CFF5"], [10.6, "#6BC4F0"]]},
        "fill-antialias": false
      }
    },
    {
      "id": "Water area small scale",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area small scale",
      "minzoom": 1,
      "maxzoom": 5,
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#53B9EA"], [10.6, "#6BC4F0"]]},
        "fill-outline-color": "#53B9EA"
      }
    },
    {
      "id": "Water area medium scale/Lake intermittent",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area medium scale",
      "minzoom": 5,
      "maxzoom": 7,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {"fill-pattern": "Water area/Lake or river intermittent"}
    },
    {
      "id": "Water area medium scale/Lake or river",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area medium scale",
      "minzoom": 5,
      "maxzoom": 7,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#53B9EA"], [10.6, "#6BC4F0"]]},
        "fill-outline-color": "#53B9EA"
      }
    },
    {
      "id": "Water area large scale/Lake intermittent",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area large scale",
      "minzoom": 7,
      "maxzoom": 11,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {"fill-pattern": "Water area/Lake or river intermittent"}
    },
    {
      "id": "Water area large scale/Lake or river",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area large scale",
      "minzoom": 7,
      "maxzoom": 11,
      "filter": ["==", "_symbol", 0],
      "layout": {},
      "paint": {
        "fill-color": {"stops": [[5, "#53B9EA"], [10.6, "#6BC4F0"]]},
        "fill-outline-color": {"stops": [[8, "#53B9EA"], [9, "#6BC4F0"]]}
      }
    },
    {
      "id": "Water area/Lake, river or bay",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 7],
      "layout": {},
      "paint": {"fill-color": "#6BC4F0", "fill-outline-color": "#6BC4F0"}
    },
    {
      "id": "Water area/Lake or river intermittent",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 6],
      "layout": {},
      "paint": {"fill-pattern": "Water area/Lake or river intermittent"}
    },
    {
      "id": "Water area/Inundated area",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 4],
      "layout": {},
      "paint": {"fill-pattern": "Water area/Inundated area"}
    },
    {
      "id": "Water area/Swamp or marsh",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 3],
      "layout": {},
      "paint": {
        "fill-pattern": "Water area/Swamp or marsh",
        "fill-opacity": 0.45
      }
    },
    {
      "id": "Water area/Playa",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 1],
      "layout": {},
      "paint": {"fill-pattern": "Water area/Playa"}
    },
    {
      "id": "Water area/Ice mass",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 2],
      "layout": {},
      "paint": {"fill-pattern": "Water area/Ice mass", "fill-opacity": 0.5}
    },
    {
      "id": "Water area/Dam or weir",
      "type": "fill",
      "source": "esri",
      "source-layer": "Water area",
      "minzoom": 11,
      "filter": ["==", "_symbol", 5],
      "layout": {},
      "paint": {"fill-color": "#e5e5dd", "fill-outline-color": "#d9d9d1"}
    },
    {
      "id": "Special area of interest/Bike, walk or pedestrian/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 15,
      "filter": ["==", "_symbol", 2],
      "layout": {},
      "paint": {
        "line-color": "#bcb7ae",
        "line-width": {"stops": [[15, 1.1], [22, 10]]},
        "line-blur": {"stops": [[15, 1], [22, 5]]}
      }
    },
    {
      "id": "Special area of interest/Bike, walk or pedestrian",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 15,
      "filter": ["==", "_symbol", 2],
      "layout": {},
      "paint": {"fill-color": "#E8E7E5", "fill-outline-color": "#dbd9d5"}
    },
    {
      "id": "Special area of interest/Bike, walk or pedestrian/pattern",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 15,
      "filter": ["==", "_symbol", 2],
      "layout": {},
      "paint": {"fill-pattern": "Special area of interest/Small stipple"}
    },
    {
      "id": "Special area of interest/Water",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 7],
      "layout": {},
      "paint": {"fill-color": "#6BC4F0"}
    },
    {
      "id": "Special area of interest/Water/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["==", "_symbol", 7],
      "layout": {},
      "paint": {
        "line-color": "#5db6e2",
        "line-width": {"stops": [[15, 1.1], [22, 7]]},
        "line-blur": {"stops": [[15, 1], [22, 3.5]]}
      }
    },
    {
      "id": "Ferry/Ferry",
      "type": "line",
      "source": "esri",
      "source-layer": "Ferry",
      "minzoom": 11,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#c1e1f0",
        "line-opacity": 0.8,
        "line-width": {"base": 1.2, "stops": [[11, 1.3], [14, 1.5], [17, 1.5]]},
        "line-dasharray": [3, 4]
      }
    },
    {
      "id": "Railroad/2",
      "type": "line",
      "source": "esri",
      "source-layer": "Railroad",
      "minzoom": 11,
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {"stops": [[11, "#dedcd9"], [17, "#B8B1AA"]]},
        "line-width": {"base": 1.2, "stops": [[11, 2.5], [14, 2.5], [17, 4]]}
      }
    },
    {
      "id": "Railroad/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Railroad",
      "minzoom": 11,
      "layout": {"line-join": "round"},
      "paint": {
        "line-dasharray": [6, 7.5],
        "line-color": {"stops": [[11, "#E3E0D7"], [17, "#DBD8CB"]]},
        "line-width": {"base": 1.2, "stops": [[11, 0.75], [15, 0.75], [17, 2]]}
      }
    },
    {
      "id": "Ferry/Rail ferry/2",
      "type": "line",
      "source": "esri",
      "source-layer": "Ferry",
      "minzoom": 11,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {"stops": [[11, "#dedcd9"], [17, "#B8B1AA"]]},
        "line-width": {"base": 1.2, "stops": [[11, 2.5], [14, 2.5], [17, 4]]}
      }
    },
    {
      "id": "Ferry/Rail ferry/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Ferry",
      "minzoom": 11,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-dasharray": [6, 7.5],
        "line-color": {"stops": [[11, "#E3E0D7"], [17, "#DBD8CB"]]},
        "line-width": {"base": 1.2, "stops": [[11, 0.75], [15, 0.75], [17, 2]]}
      }
    },
    {
      "id": "Special area of interest line/Sports field",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 15,
      "filter": ["==", "_symbol", 6],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#e3e0da",
        "line-opacity": 0.8,
        "line-width": {"base": 1.2, "stops": [[15, 0.5], [20, 4]]}
      }
    },
    {
      "id": "Road/4WD/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 13,
      "filter": ["all", ["==", "_symbol", 10], ["!in", "Viz", 2]],
      "layout": {"line-join": "round", "visibility": "visible"},
      "paint": {
        "line-color": "#e3e1dc",
        "line-dasharray": [2, 1],
        "line-width": {
          "base": 1.2,
          "stops": [[11, 1.5], [14, 2.3], [17, 8.3], [20, 50]]
        }
      }
    },
    {
      "id": "Road/Minor, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 6], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[9, "#E2DFD6"], [10, "#dedbd1"], [12, "#e3e1dc"]]
        },
        "line-width": {
          "base": 1.2,
          "stops": [[9.9, 1], [14, 4], [16, 11.5], [17, 19], [20, 58]]
        }
      }
    },
    {
      "id": "Road/Minor/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 5], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[9, "#E2DFD6"], [10, "#dedbd1"], [12, "#e3e1dc"]]
        },
        "line-width": {
          "base": 1.2,
          "stops": [
            [9, 1],
            [10, 3.3],
            [14, 5.5],
            [16, 11.5],
            [17, 19],
            [20, 58]
          ]
        }
      }
    },
    {
      "id": "Road/Major, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 4], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#dedbd1"], [12, "#e3e1dc"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[9, 3.3], [14, 7.3], [16, 12.3], [17, 22], [20, 63]]
        }
      }
    },
    {
      "id": "Road/Major/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 8,
      "filter": ["all", ["==", "_symbol", 3], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[8, "#dedbd1"], [12, "#e3e1dc"]]},
        "line-width": {
          "base": 1,
          "stops": [[8, 3.3], [14, 7.3], [16, 12.3], [17, 22], [20, 63]]
        }
      }
    },
    {
      "id": "Trail or path/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Trail or path",
      "minzoom": 15,
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[15, "#dddbd5"], [17, "#e3e1dc"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[15, 2.5], [16, 3], [17, 5], [20, 20], [22, 31]]
        }
      }
    },
    {
      "id": "Road/Pedestrian/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 15,
      "filter": ["all", ["==", "_symbol", 9], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[15, "#dddbd5"], [17, "#e3e1dc"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[15, 2.5], [16, 3], [17, 5], [20, 20], [22, 31]]
        }
      }
    },
    {
      "id": "Road/Local/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 12,
      "filter": ["all", ["==", "_symbol", 7], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#e3e1dc",
        "line-width": {
          "base": 1.4,
          "stops": [[11, 1.1], [14, 3], [16, 8], [17, 16], [20, 48]]
        }
      }
    },
    {
      "id": "Trail or path/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Trail or path",
      "minzoom": 15,
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[15, "#f8f8f7"], [18, "#ffffff"]]},
        "line-dasharray": {"stops": [[15, [3, 3]], [17, [2, 2]]]},
        "line-width": {"base": 1.2, "stops": [[15, 1.3], [17, 2.5]]}
      }
    },
    {
      "id": "Road/Pedestrian/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 15,
      "filter": ["all", ["==", "_symbol", 9], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[15, "#f8f8f7"], [18, "#ffffff"]]},
        "line-dasharray": {"stops": [[15, [3, 3]], [17, [2, 2]]]},
        "line-width": {"base": 1.2, "stops": [[15, 1.3], [17, 2.5]]}
      }
    },
    {
      "id": "Road/4WD/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 13,
      "filter": ["all", ["==", "_symbol", 10], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#FFFFFF",
        "line-width": {
          "base": 1.2,
          "stops": [[11, 0.75], [14, 1.3], [17, 7.3], [20, 48]]
        }
      }
    },
    {
      "id": "Road/Local/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 12,
      "filter": ["all", ["==", "_symbol", 7], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[12, "#fcfbf9"], [13, "#ffffff"]]},
        "line-width": {
          "base": 1.4,
          "stops": [[11, 1.1], [14, 2], [16, 6], [17, 14], [20, 45]]
        }
      }
    },
    {
      "id": "Road/Minor, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 6], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[9, 0.75], [14, 2], [16, 9.5], [17, 17], [20, 55]]
        }
      }
    },
    {
      "id": "Road/Minor/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 5], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[9, 1.3], [14, 4.5], [16, 9.5], [17, 17], [20, 55]]
        }
      }
    },
    {
      "id": "Road/Major, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 4], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[9, 1.3], [14, 5.3], [16, 10.3], [17, 20], [20, 60]]
        }
      }
    },
    {
      "id": "Road/Major/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 8,
      "filter": ["all", ["==", "_symbol", 3], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-width": {
          "base": 1.2,
          "stops": [[8, 1.3], [14, 5.3], [16, 10.3], [17, 20], [20, 60]]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 2], ["!in", "Viz", 2]],
      "layout": {"line-join": "round", "line-cap": "round"},
      "paint": {
        "line-color": "#ffffff",
        "line-width": {
          "base": 1.2,
          "stops": [[9, 0.3], [14, 8.3], [16, 14.3], [17, 30], [20, 52]]
        }
      }
    },
    {
      "id": "Road/Highway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#ffffff",
        "line-width": {
          "base": 1.2,
          "stops": [[6, 0.3], [14, 8.3], [16, 14.3], [17, 30], [20, 52]]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 5,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#ffffff",
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.3], [14, 8.3], [16, 14.3], [17, 30], [20, 52]]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 2], ["!in", "Viz", 2]],
      "layout": {"line-join": "round", "line-cap": "round"},
      "paint": {
        "line-color": {
          "stops": [[6, "#ddcfbc"], [8, "#ddcfbc"], [12, "#ddcfbc"]]
        },
        "line-width": {
          "base": 1.2,
          "stops": [[9, 0.7], [14, 6.3], [16, 12.3], [17, 28], [20, 50]]
        }
      }
    },
    {
      "id": "Road/Highway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[6, "#ddcfbc"], [8, "#ddcfbc"], [12, "#ddcfbc"]]
        },
        "line-width": {
          "base": 1.2,
          "stops": [[6, 0.7], [14, 6.3], [16, 12.3], [17, 28], [20, 50]]
        }
      }
    },
    {
      "id": "Road/Freeway Motorway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road",
      "minzoom": 5,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#ddcfbc",
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.7], [14, 6.3], [16, 12.3], [17, 28], [20, 50]]
        }
      }
    },
    {
      "id": "Special area of interest line/Dock or pier",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 15,
      "filter": ["==", "_symbol", 0],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#E8E7E5",
        "line-width": {"base": 1.2, "stops": [[15, 0.5], [20, 4]]}
      }
    },
    {
      "id": "Special area of interest line/Fence (chain link)/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 1],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#686868",
        "line-opacity": 0.5,
        "line-width": {"base": 1.2, "stops": [[16, 0.7], [20, 3]]}
      }
    },
    {
      "id": "Special area of interest line/Fence (chain link)/0",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 1],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "icon-image": "Special area of interest line/Fence (chain link)/0",
        "symbol-spacing": {"stops": [[16, 7], [22, 20]]},
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.25], [22, 1]]}
      },
      "paint": {}
    },
    {
      "id": "Special area of interest line/Fence (metal)/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 2],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#686868",
        "line-opacity": 0.5,
        "line-width": {"base": 1.2, "stops": [[16, 0.7], [20, 3]]}
      }
    },
    {
      "id": "Special area of interest line/Fence (metal)/0",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 2],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "icon-image": "Special area of interest line/Fence (metal)/0",
        "symbol-spacing": {"stops": [[16, 7], [22, 20]]},
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.2], [22, 0.9]]}
      },
      "paint": {}
    },
    {
      "id": "Special area of interest line/Fence (wood)/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 3],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#CDAA66",
        "line-opacity": 0.5,
        "line-width": {"base": 1.2, "stops": [[16, 0.7], [20, 3]]}
      }
    },
    {
      "id": "Special area of interest line/Fence (wood)/0",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 3],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "icon-image": "Special area of interest line/Fence (wood)/0",
        "symbol-spacing": {"stops": [[16, 7], [22, 20]]},
        "icon-rotation-alignment": "map",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.2], [22, 0.9]]}
      },
      "paint": {}
    },
    {
      "id": "Special area of interest line/Gate/2",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 4],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#686868",
        "line-width": {"base": 1.2, "stops": [[16, 2], [20, 7]]}
      }
    },
    {
      "id": "Special area of interest line/Gate/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 4],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#E1E1E1",
        "line-width": {"base": 1.2, "stops": [[16, 1], [20, 5]]}
      }
    },
    {
      "id": "Special area of interest line/Gate/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 4],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#686868",
        "line-dasharray": [5, 15],
        "line-width": 0.7
      }
    },
    {
      "id": "Special area of interest line/Wall/2",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 7],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#BCB7AE",
        "line-width": {"base": 1.2, "stops": [[16, 4], [20, 7]]}
      }
    },
    {
      "id": "Special area of interest line/Wall/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 7],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#e3e3e1",
        "line-width": {"base": 1.2, "stops": [[16, 2], [20, 5]]}
      }
    },
    {
      "id": "Special area of interest line/Wall/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 16,
      "filter": ["==", "_symbol", 7],
      "layout": {"line-join": "round"},
      "paint": {"line-color": "#BCB7AE", "line-width": 0.5}
    },
    {
      "id": "Building/1",
      "type": "fill",
      "source": "esri",
      "source-layer": "Building",
      "minzoom": 18,
      "layout": {},
      "paint": {
        "fill-color": "#6f6c68",
        "fill-opacity": 0.15,
        "fill-translate": {"stops": [[18, [2, 2]], [20, [10, 10]]]},
        "fill-translate-anchor": "viewport"
      }
    },
    {
      "id": "Building/General",
      "type": "fill",
      "source": "esri",
      "source-layer": "Building",
      "minzoom": 15,
      "layout": {},
      "paint": {"fill-color": {"stops": [[15, "#ebe7e2"], [20, "#D1C4BA"]]}}
    },
    {
      "id": "Building/pattern",
      "type": "fill",
      "source": "esri",
      "source-layer": "Building",
      "minzoom": 16,
      "layout": {},
      "paint": {"fill-pattern": "Building", "fill-opacity": 0.15}
    },
    {
      "id": "Building/line",
      "type": "line",
      "source": "esri",
      "source-layer": "Building",
      "minzoom": 15,
      "layout": {},
      "paint": {
        "line-color": {"stops": [[15, "#dbd4cb"], [22, "#ac9c92"]]},
        "line-width": {"stops": [[15, 0.5], [20, 1.5]]}
      }
    },
    {
      "id": "Special area of interest line/Parking lot",
      "type": "line",
      "source": "esri",
      "source-layer": "Special area of interest line",
      "minzoom": 15,
      "filter": ["==", "_symbol", 5],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#E8E7E5",
        "line-width": {"base": 1.2, "stops": [[15, 0.5], [20, 4]]}
      }
    },
    {
      "id": "Road tunnel/4WD/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 13,
      "filter": ["all", ["==", "_symbol", 10], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#e3e1dc",
        "line-dasharray": [2, 1],
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[11, 1.5], [14, 2.3], [17, 8.3], [20, 49]]
        }
      }
    },
    {
      "id": "Road tunnel/Minor, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 6], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[9, "#E2DFD6"], [10, "#dedbd1"], [12, "#e3e1dc"]]
        },
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9.9, 1], [14, 4], [16, 11.5], [17, 19], [20, 57]]
        }
      }
    },
    {
      "id": "Road tunnel/Minor/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 5], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[9, "#E2DFD6"], [10, "#dedbd1"], [12, "#e3e1dc"]]
        },
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [
            [9, 1],
            [10, 3.3],
            [14, 5.5],
            [16, 11.5],
            [17, 19],
            [20, 57]
          ]
        }
      }
    },
    {
      "id": "Road tunnel/Major, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 4], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#dedbd1"], [12, "#e3e1dc"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9, 3.3], [14, 7.3], [16, 12.3], [17, 22], [20, 62]]
        }
      }
    },
    {
      "id": "Road tunnel/Major/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 8,
      "filter": ["all", ["==", "_symbol", 3], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[8, "#dedbd1"], [12, "#e3e1dc"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1,
          "stops": [[8, 3.3], [14, 7.3], [16, 12.3], [17, 22], [20, 62]]
        }
      }
    },
    {
      "id": "Road tunnel/Pedestrian/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 15,
      "filter": ["all", ["==", "_symbol", 9], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[14, 1.6], [16, 2], [17, 8], [20, 45]]
        }
      }
    },
    {
      "id": "Road tunnel/4WD/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 13,
      "filter": ["all", ["==", "_symbol", 10], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[11, 0.75], [14, 1.3], [17, 7.3], [20, 48]]
        }
      }
    },
    {
      "id": "Road tunnel/Service/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 13,
      "filter": ["all", ["==", "_symbol", 8], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#FFFFFF",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[11, 0.75], [14, 1.3], [17, 8.3], [20, 48]]
        }
      }
    },
    {
      "id": "Road tunnel/Local/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 12,
      "filter": ["all", ["==", "_symbol", 7], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[12, "#fcfbf9"], [13, "#ffffff"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.4,
          "stops": [[11, 1.1], [14, 2], [16, 6], [17, 14], [20, 55]]
        }
      }
    },
    {
      "id": "Road tunnel/Minor, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 6], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9, 0.75], [14, 2], [16, 9.5], [17, 17], [20, 55]]
        }
      }
    },
    {
      "id": "Road tunnel/Minor/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 5], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9, 1.3], [14, 4.5], [16, 9.5], [17, 17], [20, 55]]
        }
      }
    },
    {
      "id": "Road tunnel/Major, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 4], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9, 1.3], [14, 5.3], [16, 10.3], [17, 20], [20, 60]]
        }
      }
    },
    {
      "id": "Road tunnel/Major/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 8,
      "filter": ["all", ["==", "_symbol", 3], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[9, "#f0efea"], [13, "#ffffff"]]},
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[8, 1.3], [14, 5.3], [16, 10.3], [17, 20], [20, 60]]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway, ramp or traffic circle/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 2], ["!in", "Viz", 2]],
      "layout": {"line-join": "round", "line-cap": "round"},
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9, 0.3], [14, 8.3], [16, 14.3], [17, 30], [20, 52]]
        }
      }
    },
    {
      "id": "Road tunnel/Highway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[6, 0.3], [14, 8.3], [16, 14.3], [17, 30], [20, 52]]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 5,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#ffffff",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.3], [14, 8.3], [16, 14.3], [17, 30], [20, 52]]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway, ramp or traffic circle/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 2], ["!in", "Viz", 2]],
      "layout": {"line-join": "round", "line-cap": "round"},
      "paint": {
        "line-color": {
          "stops": [[6, "#ddcfbc"], [8, "#ddcfbc"], [12, "#ddcfbc"]]
        },
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[9, 0.7], [14, 6.3], [16, 12.3], [17, 28], [20, 50]]
        }
      }
    },
    {
      "id": "Road tunnel/Highway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 6,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[6, "#ddcfbc"], [8, "#ddcfbc"], [12, "#ddcfbc"]]
        },
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[6, 0.7], [14, 6.3], [16, 12.3], [17, 28], [20, 50]]
        }
      }
    },
    {
      "id": "Road tunnel/Freeway Motorway/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Road tunnel",
      "minzoom": 5,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#ddcfbc",
        "line-opacity": 0.5,
        "line-width": {
          "base": 1.2,
          "stops": [[5, 0.7], [14, 6.3], [16, 12.3], [17, 28], [20, 50]]
        }
      }
    },
    {
      "id": "Special area of interest/Gutter",
      "type": "fill",
      "source": "esri",
      "source-layer": "Special area of interest",
      "minzoom": 14,
      "filter": ["in", "_symbol", 9, 3],
      "layout": {},
      "paint": {"fill-color": "#E8E7E5", "fill-outline-color": "#bcb7ae"}
    },
    {
      "id": "Boundary line/Disputed admin2",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 8], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[1, "#f5f5f5"], [3, "#fafafa"], [9, "#ffffff"]]
        },
        "line-width": {"base": 1.2, "stops": [[1, 0.65], [14, 1.3], [17, 2.5]]},
        "line-dasharray": [5, 5]
      }
    },
    {
      "id": "Boundary line/Disputed admin1/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 3,
      "filter": ["all", ["==", "_symbol", 7], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#c6c4b6",
        "line-opacity": 0.95,
        "line-width": {"base": 1, "stops": [[4, 0.5], [14, 7], [17, 7]]}
      }
    },
    {
      "id": "Boundary line/Disputed admin0/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 1,
      "filter": [
        "all",
        ["==", "_symbol", 6],
        ["!in", "Viz", 2],
        ["!in", "DisputeID", 8, 16, 90, 96, 0]
      ],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#c6c4b6",
        "line-opacity": 0.95,
        "line-width": {"base": 1, "stops": [[1, 0.5], [14, 9.3], [17, 9.3]]}
      }
    },
    {
      "id": "Boundary line/Disputed admin1/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 3,
      "filter": ["all", ["==", "_symbol", 7], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[1, "#f5f5f5"], [3, "#fafafa"], [9, "#ffffff"]]
        },
        "line-width": {"base": 1.2, "stops": [[1, 0.65], [14, 1.3], [17, 2.5]]},
        "line-dasharray": [5, 5]
      }
    },
    {
      "id": "Boundary line/Disputed admin0/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 1,
      "filter": [
        "all",
        ["==", "_symbol", 6],
        ["!in", "Viz", 2],
        ["!in", "DisputeID", 8, 16, 90, 96, 0]
      ],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[1, "#f5f5f5"], [3, "#fafafa"], [9, "#ffffff"]]
        },
        "line-width": {"base": 1.2, "stops": [[1, 0.65], [14, 1.3], [17, 2.5]]},
        "line-dasharray": [5, 5]
      }
    },
    {
      "id": "Boundary line/Admin2/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 10,
      "filter": ["all", ["==", "_symbol", 2], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#ede7e0",
        "line-opacity": 0.6,
        "line-width": {"base": 1.2, "stops": [[8, 2.3], [14, 5.5], [17, 7.5]]}
      }
    },
    {
      "id": "Boundary line/Admin1/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 3,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[3, "#DEE1CC"], [10, "#d1ceb8"]]},
        "line-opacity": 0.5,
        "line-width": {"base": 1, "stops": [[3, 0.5], [14, 9], [17, 10]]}
      }
    },
    {
      "id": "Boundary line/Admin0/1",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 1,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#d1cfc2",
        "line-width": {"base": 1, "stops": [[1, 0.5], [14, 11.3], [17, 12.3]]}
      }
    },
    {
      "id": "Boundary line/Admin5",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 16,
      "filter": ["all", ["==", "_symbol", 5], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#9C9C9C",
        "line-width": {"base": 1.2, "stops": [[14, 1], [17, 1]]},
        "line-dasharray": [6, 4]
      }
    },
    {
      "id": "Boundary line/Admin4",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 16,
      "filter": ["all", ["==", "_symbol", 4], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#9C9C9C",
        "line-width": {"base": 1.2, "stops": [[14, 1], [17, 1]]},
        "line-dasharray": [6, 4]
      }
    },
    {
      "id": "Boundary line/Admin3",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 16,
      "filter": ["all", ["==", "_symbol", 3], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": "#9C9C9C",
        "line-width": {"base": 1.2, "stops": [[14, 1], [17, 1]]},
        "line-dasharray": [6, 4]
      }
    },
    {
      "id": "Boundary line/Admin2/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 9,
      "filter": ["all", ["==", "_symbol", 2], ["!in", "Viz", 2]],
      "layout": {"line-join": "round"},
      "paint": {
        "line-color": "#888577",
        "line-dasharray": [7, 5],
        "line-width": {"base": 1.2, "stops": [[8, 0.5], [14, 1]]}
      }
    },
    {
      "id": "Boundary line/Admin1/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 3,
      "filter": ["all", ["==", "_symbol", 1], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[3, "#c1bdb5"], [4, "#9b9382"]]},
        "line-width": {"base": 1, "stops": [[4, 0.5], [14, 1.3], [17, 1.3]]}
      }
    },
    {
      "id": "Boundary line/Admin0/0",
      "type": "line",
      "source": "esri",
      "source-layer": "Boundary line",
      "minzoom": 1,
      "filter": ["all", ["==", "_symbol", 0], ["!in", "Viz", 2]],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {"stops": [[1, "#b9b9b9"], [7, "#434242"]]},
        "line-width": {"base": 1.2, "stops": [[1, 0.5], [14, 1.3], [17, 2]]}
      }
    },
    {
      "id": "Coastline",
      "type": "line",
      "source": "esri",
      "source-layer": "Coastline",
      "maxzoom": 9,
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": {
          "stops": [[0, "#53B9EA"], [7, "#53B9EA"], [9, "#6BC4F0"]]
        },
        "line-width": {"base": 1.2, "stops": [[0, 0.5], [9, 1.3]]}
      }
    },
    {
      "id": "Tree/Elm",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 0],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Elm",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Eucalyptus",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 1],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Eucalyptus",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Maple",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 2],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Maple",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Oak",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 3],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Oak",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Orange",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 4],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Orange",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Palm",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 5],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Palm",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Pine",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 6],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Pine",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Tree/Spruce",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Tree",
      "minzoom": 16,
      "filter": ["==", "_symbol", 7],
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Tree/Spruce",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Shrub",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Shrub",
      "minzoom": 16,
      "layout": {
        "symbol-avoid-edges": true,
        "icon-image": "Shrub",
        "icon-allow-overlap": true,
        "icon-padding": 1,
        "icon-size": {"stops": [[16, 0.07], [17, 0.18], [18, 0.3], [20, 1]]}
      },
      "paint": {"icon-opacity": {"stops": [[16, 0.4], [17, 0.6], [20, 0.9]]}}
    },
    {
      "id": "Pavement marking/Arrow",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pavement marking",
      "minzoom": 17,
      "filter": ["==", "_symbol", 0],
      "layout": {
        "icon-rotation-alignment": "map",
        "icon-image": "Pavement marking/Arrow",
        "icon-size": {"stops": [[17, 0.5], [22, 1]]},
        "icon-rotate": {"type": "identity", "property": "angle", "default": 0},
        "icon-allow-overlap": true
      },
      "paint": {"icon-color": "#B2B2B2"}
    },
    {
      "id": "Pavement marking/Handicap",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pavement marking",
      "minzoom": 18,
      "filter": ["==", "_symbol", 1],
      "layout": {
        "icon-rotation-alignment": "map",
        "icon-image": "Pavement marking/Handicap",
        "icon-size": {"stops": [[18, 0.5], [20, 1], [22, 1.25]]},
        "icon-rotate": {"type": "identity", "property": "angle", "default": 0},
        "icon-allow-overlap": true
      },
      "paint": {
        "icon-color": "#296AA3",
        "icon-opacity": {"stops": [[18, 0.65], [20, 1]]}
      }
    },
    {
      "id": "Pavement marking/Left turn",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pavement marking",
      "minzoom": 17,
      "filter": ["==", "_symbol", 2],
      "layout": {
        "icon-rotation-alignment": "map",
        "icon-image": "Pavement marking/Left turn",
        "icon-size": {"stops": [[17, 0.5], [22, 1]]},
        "icon-rotate": {"type": "identity", "property": "angle", "default": 0},
        "icon-allow-overlap": true
      },
      "paint": {"icon-color": "#B2B2B2"}
    },
    {
      "id": "Pavement marking/Right turn",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pavement marking",
      "minzoom": 17,
      "filter": ["==", "_symbol", 3],
      "layout": {
        "icon-rotation-alignment": "map",
        "icon-image": "Pavement marking/Right turn",
        "icon-size": {"stops": [[17, 0.5], [22, 1]]},
        "icon-rotate": {"type": "identity", "property": "angle", "default": 0},
        "icon-allow-overlap": true
      },
      "paint": {"icon-color": "#B2B2B2"}
    },
    {
      "id": "Pavement marking/Two-way left turn",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pavement marking",
      "minzoom": 17,
      "filter": ["==", "_symbol", 4],
      "layout": {
        "icon-rotation-alignment": "map",
        "icon-image": "Pavement marking/Two-way left turn",
        "icon-size": {"stops": [[17, 0.5], [22, 1]]},
        "icon-rotate": {"type": "identity", "property": "angle", "default": 0},
        "icon-allow-overlap": true
      },
      "paint": {"icon-color": "#B2B2B2"}
    },
    {
      "id": "Pavement marking/U-turn",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pavement marking",
      "minzoom": 17,
      "filter": ["==", "_symbol", 5],
      "layout": {
        "icon-rotation-alignment": "map",
        "icon-image": "Pavement marking/U-turn",
        "icon-size": {"stops": [[17, 0.5], [22, 1]]},
        "icon-rotate": {"type": "identity", "property": "angle", "default": 0},
        "icon-allow-overlap": true
      },
      "paint": {"icon-color": "#B2B2B2"}
    },
    {
      "id": "Water point/Sea or ocean",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 0],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 15.5]]},
        "text-line-height": 1.6,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Water point/Island",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 7],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2
      }
    },
    {
      "id": "Water point/Dam or weir",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 5],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#171310",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.7,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Water point/Playa",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 6],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#171310",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.7,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Water point/Canal or ditch",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 4],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2
      }
    },
    {
      "id": "Water point/Stream or river",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 3],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water point/Lake or reservoir",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 2],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water point/Bay or inlet",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water point",
      "minzoom": 9,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 10]]},
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "ddot-part-time-case",
      "type": "line",
      "source": "routes",
      "filter": [
        "all",
        ["==", ["get", "RouteType"], "Peak-Hour"],
        ["!=", ["get", "localService"], 0]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": ["get", "textColor"],
        "line-width": {
          "base": 1,
          "stops": [[10.75, 2.5], [10.85, 3.5], [16, 8.5], [19, 14.5]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-part-time-case-express",
      "type": "line",
      "source": "routes",
      "filter": [
        "all",
        ["==", ["get", "RouteType"], "Peak-Hour"],
        ["!=", ["get", "localService"], 1]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#888",
        "line-width": {
          "base": 1,
          "stops": [[10.75, 1], [10.85, 2], [16, 7], [19, 12]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-neighborhood-case",
      "type": "line",
      "source": "routes",
      "filter": ["==", ["get", "RouteType"], "Neighborhood"],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#999999",
        "line-width": {
          "base": 1,
          "stops": [[10.75, 2], [10.85, 3.5], [16, 12], [19, 18]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-key-case",
      "type": "line",
      "source": "routes",
      "filter": ["==", ["get", "RouteType"], "Key"],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#9bb4d1",
        "line-width": {
          "base": 1,
          "stops": [[9.9, 2.5], [10, 3.25], [16, 14], [19, 24]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-connect-ten-case",
      "type": "line",
      "source": "routes",
      "filter": ["==", ["get", "RouteType"], "ConnectTen"],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#85947f",
        "line-width": {
          "base": 1,
          "stops": [[8.9, 2.5], [9, 4.5], [16, 16], [19, 28]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-part-time-routes-express",
      "type": "line",
      "source": "routes",
      "filter": [
        "all",
        ["==", ["get", "RouteType"], "Peak-Hour"],
        ["==", ["get", "localService"], 0]
      ],
      "layout": {"line-cap": "round", "line-join": "round"},
      "paint": {
        "line-color": ["get", "color"],
        "line-width": {
          "base": 1,
          "stops": [[10.75, 0.5], [10.85, 1.25], [16, 3], [19, 5]]
        },
        "line-offset": 0,
        "line-dasharray": [1, 4, 1]
      }
    },
    {
      "id": "ddot-part-time-routes",
      "type": "line",
      "source": "routes",
      "filter": [
        "all",
        ["==", ["get", "RouteType"], "Peak-Hour"],
        ["!=", ["get", "localService"], 0]
      ],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#dedede",
        "line-width": {
          "base": 1,
          "stops": [[10.75, 1], [10.85, 2.25], [16, 7], [19, 16]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-neighborhood-routes",
      "type": "line",
      "source": "routes",
      "filter": ["==", ["get", "RouteType"], "Neighborhood"],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": ["get", "color"],
        "line-width": {
          "base": 1,
          "stops": [[10.75, 1], [10.85, 2.25], [16, 7], [19, 16]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-key-routes",
      "type": "line",
      "source": "routes",
      "filter": ["==", ["get", "RouteType"], "Key"],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": ["get", "color"],
        "line-width": {
          "base": 1,
          "stops": [[9.9, 1], [10, 2.25], [16, 7], [19, 16]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-connect-ten-routes",
      "type": "line",
      "source": "routes",
      "filter": ["==", ["get", "RouteType"], "ConnectTen"],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": ["get", "color"],
        "line-width": {
          "base": 1,
          "stops": [[8.9, 1], [9, 2.75], [16, 9], [19, 20]]
        },
        "line-offset": 0
      }
    },
    {
      "id": "ddot-route-highlight",
      "type": "line",
      "source": "routes",
      "filter": ['==', 'short', ''],
      "layout": {
        "visibility": "visible",
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "#feb70d",
        "line-width": {
          "base": 1,
          "stops": [[8.9, 4.5], [9, 7.5], [16, 22], [19, 38]]
        },
        "line-opacity": 0.25,
        "line-offset": 0
      }
    },
    {
      "id": "Ferry/label/Ferry",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Ferry/label",
      "minzoom": 12,
      "filter": ["all", ["==", "_label_class", 0], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 10,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 30
      },
      "paint": {
        "text-color": "#ffffff",
        "text-halo-width": 2.2,
        "text-halo-color": "#6BC4F0",
        "text-halo-blur": 1
      }
    },
    {
      "id": "Water line/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water line/label",
      "minzoom": 11,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.5,
        "text-max-width": 8,
        "text-max-angle": 35,
        "text-field": "{_name_global}",
        "text-padding": 1,
        "text-offset": [0, -0.5],
        "symbol-spacing": 800
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water line large scale/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water line large scale/label",
      "minzoom": 7,
      "maxzoom": 11,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 8,
        "text-max-angle": {"stops": [[7, 25], [11, 35]]},
        "text-field": "{_name}",
        "text-padding": 1,
        "text-offset": [0, -0.5],
        "symbol-spacing": 800
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water line medium scale/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water line medium scale/label",
      "minzoom": 5,
      "maxzoom": 7,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 8,
        "text-max-angle": {"stops": [[5, 15], [6, 25]]},
        "text-field": "{_name}",
        "text-padding": 1,
        "text-offset": [0, -0.5],
        "symbol-spacing": 800
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water line small scale/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water line small scale/label",
      "minzoom": 4,
      "maxzoom": 5,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 8.5,
        "text-max-width": 8,
        "text-max-angle": 18,
        "text-field": "{_name}",
        "text-padding": 1,
        "text-offset": [0, -0.5],
        "symbol-spacing": 800
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Marine park/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine park/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {"text-color": "#3a7795"}
    },
    {
      "id": "Water area/label/Dam or weir",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 8],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.5,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#171310",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Water area/label/Playa",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 9],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.5,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#171310",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Water area/label/Canal or ditch",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 2],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "symbol-placement": "line",
        "symbol-spacing": 1000,
        "text-size": 10.5,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-max-width": 5
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area/label/Small river",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 7],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "symbol-placement": "line",
        "symbol-spacing": 1000,
        "text-size": 10.5,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-max-width": 8
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area/label/Large river",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 4],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "symbol-placement": "line",
        "symbol-spacing": 1000,
        "text-size": 10.5,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-max-width": 8
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area/label/Small lake or reservoir",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 6],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 10.5,
        "text-line-height": 1,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area/label/Large lake or reservoir",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 3],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 10.5,
        "text-line-height": 1.5,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area/label/Bay or inlet",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 10.5,
        "text-line-height": 1.5,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area/label/Small island",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 0],
      "layout": {
        "text-size": 10.5,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"]
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2
      }
    },
    {
      "id": "Water area/label/Large island",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area/label",
      "minzoom": 11,
      "filter": ["==", "_label_class", 5],
      "layout": {
        "text-size": 10.5,
        "text-line-height": 1.5,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"]
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2
      }
    },
    {
      "id": "Water area large scale/label/River",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area large scale/label",
      "minzoom": 7,
      "maxzoom": 11,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "symbol-placement": "line",
        "symbol-spacing": 1000,
        "text-size": 9.3,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-max-width": 4
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area large scale/label/Lake or lake intermittent",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area large scale/label",
      "minzoom": 7,
      "maxzoom": 11,
      "filter": ["==", "_label_class", 0],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 4,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area medium scale/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area medium scale/label",
      "minzoom": 5,
      "maxzoom": 7,
      "layout": {
        "text-max-width": 4,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Water area small scale/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water area small scale/label",
      "minzoom": 1,
      "maxzoom": 5,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 4,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Marine area/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine area/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 10.5,
        "text-line-height": 1.5,
        "text-max-width": 4,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#82CFF5",
        "text-halo-width": 2
      }
    },
    {
      "id": "Marine waterbody/label/small",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine waterbody/label",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 4],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-letter-spacing": {"stops": [[1, 0.12], [10, 0.25]]},
        "text-line-height": 1.5,
        "text-max-width": 6,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[1, 8], [6, 9.3]]}
      },
      "paint": {
        "text-color": {"stops": [[1, "#0d6c9a"], [6, "#0d6c9a"]]},
        "text-halo-blur": 1,
        "text-halo-color": "#82CFF5",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Marine waterbody/label/medium",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine waterbody/label",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 3],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-letter-spacing": {"stops": [[1, 0.15], [10, 0.3]]},
        "text-line-height": 1.5,
        "text-max-width": 6,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[1, 8], [6, 9.3]]}
      },
      "paint": {
        "text-color": {"stops": [[1, "#0d6c9a"], [6, "#0d6c9a"]]},
        "text-halo-blur": 1,
        "text-halo-color": "#82CFF5",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Marine waterbody/label/large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine waterbody/label",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 2],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-letter-spacing": {"stops": [[1, 0.18], [10, 0.4]]},
        "text-line-height": 1.5,
        "text-max-width": 6,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[1, 8], [6, 10]]}
      },
      "paint": {
        "text-color": {"stops": [[1, "#0d6c9a"], [6, "#0d6c9a"]]},
        "text-halo-blur": 1,
        "text-halo-color": "#82CFF5",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Marine waterbody/label/x large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine waterbody/label",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-letter-spacing": {"stops": [[1, 0.2], [10, 1.5]]},
        "text-line-height": 1.5,
        "text-max-width": 6,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[1, 8], [6, 11]]}
      },
      "paint": {
        "text-color": {"stops": [[1, "#0d6c9a"], [6, "#0d6c9a"]]},
        "text-halo-blur": 1,
        "text-halo-color": "#82CFF5",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Marine waterbody/label/2x large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Marine waterbody/label",
      "minzoom": 1,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 0],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-letter-spacing": {"stops": [[1, 0.3], [10, 2]]},
        "text-line-height": 1.6,
        "text-max-width": 6,
        "text-field": "{_name}",
        "text-padding": 15,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[1, 10], [4, 18]]}
      },
      "paint": {
        "text-color": "#0d6c9a",
        "text-halo-blur": 1,
        "text-halo-color": "#82CFF5",
        "text-halo-width": 0.5
      }
    },
    {
      "id": "Ferry/label/Rail ferry",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Ferry/label",
      "minzoom": 12,
      "filter": ["all", ["==", "_label_class", 1], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 5,
        "text-offset": [0, -0.6],
        "symbol-spacing": 1000
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Railroad/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Railroad/label",
      "minzoom": 14,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 5,
        "text-offset": [0, -0.6],
        "symbol-spacing": 1000
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2
      }
    },
    {
      "id": "Trail or path/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Trail or path/label",
      "minzoom": 15,
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 5
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road tunnel/label/Pedestrian",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 15,
      "filter": ["all", ["==", "_label_class", 6], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 5
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Local, service, 4WD",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 12,
      "filter": ["all", ["==", "_label_class", 5], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.5,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[12, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Minor",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 4], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 12.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Major, alt name",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 3], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 12.5]]},
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4e4e4e",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Major",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 2], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 12.5]]},
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Highway",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 7], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["Avenir Next LT Pro Bold"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 14.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Freeway Motorway, alt name",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 1], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["Avenir Next LT Pro Bold"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 14.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road tunnel/label/Freeway Motorway",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road tunnel/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 0], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["Avenir Next LT Pro Bold"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 14.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Road/label/Local",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 12,
      "filter": ["all", ["==", "_label_class", 5], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 11.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[12, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Minor",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 4], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 12.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Major, alt name",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 3], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 12.5]]},
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Major",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 2], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 12.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Highway",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 75], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["Avenir Next LT Pro Bold"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 14.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Freeway Motorway, alt name",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 1], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["Avenir Next LT Pro Bold"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 14.5]]},
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Freeway Motorway",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 10,
      "filter": ["all", ["==", "_label_class", 0], ["!in", "Viz", 2]],
      "layout": {
        "visibility": "none",
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["Avenir Next LT Pro Bold"],
        "text-size": {"stops": [[10, 9.5], [14, 10.5], [18, 14.5]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": {"stops": [[10, 5], [15, 5], [16, 15]]}
      },
      "paint": {
        "text-color": "#4E4E4E",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Road/label/Pedestrian",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Road/label",
      "minzoom": 15,
      "filter": ["all", ["==", "_label_class", 6], ["!in", "Viz", 2]],
      "layout": {
        "symbol-placement": "line",
        "symbol-avoid-edges": true,
        "symbol-spacing": 400,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 9.3,
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 5,
        "visibility": "none"
      },
      "paint": {
        "text-color": "#595959",
        "text-halo-color": "#FFFFFF",
        "text-halo-width": 2
      }
    },
    {
      "id": "Building/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Building/label",
      "minzoom": 15,
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#5a3514",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 0.7,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Cemetery/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Cemetery/label",
      "minzoom": 13,
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#2d4e28",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Freight/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Freight/label",
      "minzoom": 12,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#4a2b1b",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Water and wastewater/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Water and wastewater/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#4a2b1b",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Port/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Port/label",
      "minzoom": 12,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#4a2b1b",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Industry/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Industry/label",
      "minzoom": 12,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#4a2b1b",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Government/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Government/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#4a2b1b",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Finance/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Finance/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#9d5a48",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Emergency/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Emergency/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#33302f",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Indigenous/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Indigenous/label",
      "minzoom": 7,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 9.5], [20, 12.5], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#533d32",
        "text-halo-color": "#e8e6d6",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Military/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Military/label",
      "minzoom": 6,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 9.5], [20, 12.5], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 25,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#242221",
        "text-halo-color": "#E0E0D9",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Transportation/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Transportation/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#242221",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Pedestrian/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Pedestrian/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#242221",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Beach/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Beach/label",
      "minzoom": 13,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#806b3c",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Golf course/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Golf course/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#2d4e28",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Zoo/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Zoo/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#2d4e28",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Retail/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Retail/label",
      "minzoom": 13,
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#9d5a48",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Landmark/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Landmark/label",
      "minzoom": 13,
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#446757",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Openspace or forest/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Openspace or forest/label",
      "minzoom": 10,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 25
      },
      "paint": {
        "text-color": "#006200",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Park or farming/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Park or farming/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 25
      },
      "paint": {
        "text-color": "#006200",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Point of interest/Park",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Point of interest",
      "minzoom": 9,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "symbol-avoid-edges": true,
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15
      },
      "paint": {
        "text-color": "#006200",
        "text-halo-width": 2,
        "text-halo-color": "#EBE7E2",
        "text-halo-blur": 1
      }
    },
    {
      "id": "Education/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Education/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#505000",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Medical/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Medical/label",
      "minzoom": 11,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[15, 9.5], [20, 11], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#3d5d69",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 forest or park/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 forest or park/label",
      "minzoom": 7,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 9.5], [20, 12.5], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 25
      },
      "paint": {
        "text-color": "#006200",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin0 forest or park/label/Default",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin0 forest or park/label",
      "minzoom": 6,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 9.5], [20, 12.5], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 25,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#006200",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Airport/label/Airport property",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Airport/label",
      "minzoom": 9,
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": {"stops": [[9, 8.5], [15, 9.5], [20, 12.5], [22, 15]]},
        "text-letter-spacing": {"stops": [[15, 0.05], [20, 0.15]]},
        "text-max-width": 8,
        "text-field": "{_name_global}",
        "text-padding": 15,
        "symbol-avoid-edges": true
      },
      "paint": {
        "text-color": "#5f5e5c",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin2 area/label/small",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin2 area/label",
      "minzoom": 9,
      "maxzoom": 11,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 11,
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-transform": "uppercase"
      },
      "paint": {
        "text-color": "#80755f",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin2 area/label/large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin2 area/label",
      "minzoom": 9,
      "maxzoom": 11,
      "filter": ["==", "_label_class", 0],
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-size": 13,
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-transform": "uppercase"
      },
      "paint": {
        "text-color": "#80755f",
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 area/label/x small",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 area/label",
      "minzoom": 4,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 5],
      "layout": {
        "visibility": "none",
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-transform": "uppercase",
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[4, 8.5], [5, 9.5], [6, 10.3], [9, 11]]},
        "text-letter-spacing": {"stops": [[4, 0.1], [8, 0.2]]}
      },
      "paint": {
        "text-color": {"stops": [[4, "#554434"], [6, "#39240e"]]},
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 area/label/small",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 area/label",
      "minzoom": 4,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 4],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-transform": "uppercase",
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[4, 8.5], [5, 9.5], [6, 10.5], [9, 11.5]]},
        "text-letter-spacing": {"stops": [[4, 0.1], [8, 0.2]]}
      },
      "paint": {
        "text-color": {"stops": [[4, "#554434"], [6, "#39240e"]]},
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 area/label/medium",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 area/label",
      "minzoom": 4,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 3],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-transform": "uppercase",
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[4, 9.5], [5, 10.5], [6, 11.3], [9, 12]]},
        "text-letter-spacing": {"stops": [[4, 0.15], [8, 0.4]]}
      },
      "paint": {
        "text-color": {"stops": [[4, "#554434"], [6, "#39240e"]]},
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 area/label/large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 area/label",
      "minzoom": 4,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 2],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-transform": "uppercase",
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[4, 9.5], [5, 11.3], [6, 13], [9, 17]]},
        "text-letter-spacing": {"stops": [[4, 0.1], [8, 0.5]]}
      },
      "paint": {
        "text-color": {"stops": [[4, "#554434"], [6, "#39240e"]]},
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 area/label/x large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 area/label",
      "minzoom": 4,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 1],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-transform": "uppercase",
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[4, 10.3], [5, 12], [6, 13.5], [9, 19]]},
        "text-letter-spacing": {"stops": [[4, 0.15], [8, 0.6]]}
      },
      "paint": {
        "text-color": {"stops": [[4, "#554434"], [6, "#39240e"]]},
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "Admin1 area/label/2x large",
      "type": "symbol",
      "source": "esri",
      "source-layer": "Admin1 area/label",
      "minzoom": 4,
      "maxzoom": 10,
      "filter": ["==", "_label_class", 0],
      "layout": {
        "text-font": ["AvenirNext LT Pro Regular Bold Italic"],
        "text-transform": "uppercase",
        "text-max-width": 8,
        "text-field": "{_name}",
        "text-padding": 1,
        "symbol-avoid-edges": true,
        "text-size": {"stops": [[4, 11.5], [5, 12.3], [6, 14], [9, 19]]},
        "text-letter-spacing": {"stops": [[4, 0.15], [8, 0.75]]}
      },
      "paint": {
        "text-color": {"stops": [[4, "#554434"], [6, "#39240e"]]},
        "text-halo-color": "#EBE7E2",
        "text-halo-width": 2,
        "text-halo-blur": 1
      }
    },
    {
      "id": "part-time-background",
      "type": "circle",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "Peak-Hour"],
      "paint": {
        "circle-color": "white",
        "circle-radius": {"base": 1, "stops": [[11.25, 6], [13, 7.75], [16, 13]]},
        "circle-opacity": {
          "base": 1,
          "stops": [[11.25, 0], [11.26, 0.1], [11.35, 1]]
        },
        "circle-stroke-opacity": {
          "base": 1,
          "stops": [[11.25, 0], [11.26, 0.1], [11.35, 1]]
        },
        "circle-stroke-color": "#5f6369",
        "circle-stroke-width": {"base": 1, "stops": [[11.25, 1], [15, 2]]}
      }
    },
    {
      "id": "neighborhood-background",
      "type": "circle",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "Neighborhood"],
      "paint": {
        "circle-color": "#5f6369",
        "circle-radius": {"base": 1, "stops": [[10.75, 7], [13.5, 8], [16, 14]]},
        "circle-opacity": {
          "base": 1,
          "stops": [[10.75, 0], [10.76, 0.1], [10.85, 1]]
        },
        "circle-stroke-opacity": {
          "base": 1,
          "stops": [[10.75, 0], [10.76, 0.1], [10.85, 1]]
        },
        "circle-stroke-color": "#5f6369",
        "circle-stroke-width": {"base": 1, "stops": [[10.75, 1], [15, 2]]}
      }
    },
    {
      "id": "key-background",
      "type": "circle",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "Key"],
      "paint": {
        "circle-color": "#0088ce",
        "circle-radius": {"base": 1, "stops": [[10, 7], [13.5, 8], [16, 14]]},
        "circle-opacity": {
          "base": 1,
          "stops": [[10, 0], [10.01, 0.1], [10.1, 1]]
        },
        "circle-stroke-opacity": {
          "base": 1,
          "stops": [[10, 0], [10.01, 0.1], [10.1, 1]]
        },
        "circle-stroke-color": "#9bb4d1",
        "circle-stroke-width": {"base": 1, "stops": [[10, 1], [15, 2]]}
      }
    },
    {
      "id": "connect-ten-background",
      "type": "circle",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "ConnectTen"],
      "paint": {
        "circle-color": "#044455",
        "circle-radius": {"base": 1, "stops": [[9, 6], [13.5, 8.5], [16, 14]]},
        "circle-opacity": {"base": 1, "stops": [[9, 0], [9.01, 0.1], [9.1, 1]]},
        "circle-stroke-opacity": {
          "base": 1,
          "stops": [[9, 0], [9.01, 0.1], [9.1, 1]]
        },
        "circle-stroke-color": "#85947f",
        "circle-stroke-width": {"base": 1, "stops": [[9, 1], [15, 2]]}
      }
    },
    {
      "id": "part-time-labels",
      "type": "symbol",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "Peak-Hour"],
      "layout": {
        "text-field": ["get", "RouteNum"],
        "text-font": ["AvenirNext LT Pro Medium Bold"],
        "text-anchor": "center",
        "text-letter-spacing": -0.05,
        "text-size": {"base": 1, "stops": [[11.25, 7.5], [13.5, 7.5], [15, 13]]},
        "text-offset": [0, 0.25],
        "text-allow-overlap": true
      },
      "paint": {
        "text-color": "#5f6369",
        "text-opacity": {
          "base": 1,
          "stops": [[11.25, 0], [11.26, 0.1], [11.35, 1]]
        }
      }
    },
    {
      "id": "neighborhood-labels",
      "type": "symbol",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "Neighborhood"],
      "layout": {
        "text-field": ["get", "RouteNum"],
        "text-font": ["AvenirNext LT Pro Medium Bold"],
        "text-anchor": "center",
        "text-letter-spacing": -0.05,
        "text-size": {"base": 1, "stops": [[10.75, 8], [13.5, 8.5], [15, 13]]},
        "text-offset": [0, 0.25],
        "text-allow-overlap": true
      },
      "paint": {
        "text-color": "#ffffff",
        "text-opacity": {
          "base": 1,
          "stops": [[10.75, 0], [10.76, 0.1], [10.85, 1]]
        }
      }
    },
    {
      "id": "key-labels",
      "type": "symbol",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "Key"],
      "layout": {
        "text-field": ["get", "RouteNum"],
        "text-font": ["AvenirNext LT Pro Medium Bold"],
        "text-anchor": "center",
        "text-letter-spacing": -0.05,
        "text-size": {"base": 1, "stops": [[10, 8], [13.5, 8.5], [15, 13]]},
        "text-offset": [0, 0.25],
        "text-allow-overlap": true
      },
      "paint": {
        "text-color": "#ffffff",
        "text-opacity": {"base": 1, "stops": [[10, 0], [10.01, 0.1], [10.1, 1]]}
      }
    },
    {
      "id": "connect-ten-labels",
      "type": "symbol",
      "source": "labels",
      "filter": ["==", ["get", "RouteType"], "ConnectTen"],
      "layout": {
        "text-field": ["get", "RouteNum"],
        "text-font": ["AvenirNext LT Pro Medium Bold"],
        "text-anchor": "center",
        "text-letter-spacing": -0.1,
        "text-size": {"base": 1, "stops": [[9, 8.5], [13.5, 11], [15, 14]]},
        "text-offset": [0, 0.25],
        "text-allow-overlap": true
      },
      "paint": {
        "text-color": "#ffffff",
        "text-opacity": {"base": 1, "stops": [[9, 0], [9.01, 0.1], [9.1, 1]]}
      }
    }
  ]
}

export default baseStyle;