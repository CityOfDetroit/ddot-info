/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const axios = require("axios")
const routes = require('./src/data/ddot_routes.json')

// here's where we generate GraphQL nodes from our ArcGIS Hub data.json
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // let routesUrl = `https://opendata.arcgis.com/datasets/82b2ce64ded34d728848961e342387d1_0.geojson`

  // fetch the root data.json for the whole portal
  // let root = await axios.get(routesUrl)

  // for each node, register it with Gatsby
  routes.features.forEach((n, i) => {
    let {properties, geometry} = n

    let directionId;

    // this is a hack & should be removed
    if (properties.Direction === 'Eastbound') {
      directionId = 1
    }
    if (properties.Direction === 'Westbound') {
      directionId = 0
    }
    if (properties.Direction === 'Southbound') {
      directionId = 0
    }
    if (properties.Direction === 'Northbound') {
      directionId = 1
    }
    if (properties.Direction === 'Loop') {
      directionId = 1
    }
    
    let props = {
      id: i.toString(),
      direction: properties.Direction,
      directionId: directionId,
      short: properties.RouteNum.toString(),
      orientation: properties.Orientatio,
      localService: properties.LocalServi,
      description: properties.Descriptio,
      days: properties.OperationD,
      frqWkBase: properties.BaseFreq1,
      frqWkPeak: properties.PeakFreq1,
      frqWkNight: properties.NightFreq1,
      frqSaBase: properties.BaseFreq6,
      frqSaNight: properties.NightFreq6,
      frqSuBase: properties.BaseFreq7,
      frqSuNight: properties.NightFreq7,
      spanType: properties.SpanType,
      routeType: properties.RouteType,
    }
    
    props.route = {type: "Feature", geometry: geometry}

    let nodeContent = JSON.stringify(props)
  
    let nodeMeta = {
      parent: null,
      children: [],
      internal: {
        type: `DdotRoute`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(nodeContent),
      },
    }

    let node = Object.assign({}, props, nodeMeta)
    createNode(node)
  })

  return
}


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {

  let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development";

  const result = await graphql(`
    {
      postgres {
        routes: allRoutesList(condition: { feedIndex: 5 }, orderBy: ROUTE_SHORT_NAME_ASC) {
          agencyId
          short: routeShortName
          long: routeLongName
        }
        stops: allStopsList(condition: { feedIndex: 5 }, orderBy: STOP_ID_ASC ) {
          feedIndex
          stopId
          stopCode
        }
      }
    }
  `);

  result.data.postgres.routes.forEach(r => {
    // we'll make a route page
    createPage({
      path: `/route/${r.short}`,
      component: path.resolve("./src/templates/route-page.js"),
      context: {
        routeNo: r.short
      }
    });

    createPage({
      path: `/route/${r.short}/schedule`,
      component: path.resolve("./src/templates/route-schedule-page.js"),
      context: {
        routeNo: r.short
      }
    });

    createPage({
      path: `/route/${r.short}/stops`,
      component: path.resolve("./src/templates/route-stops-page.js"),
      context: {
        routeNo: r.short
      }
    });
  });

  result.data.postgres.stops.forEach(stop => {

    let badCodes = ['01', '02', '03', '04']

    if(badCodes.indexOf(stop.stopCode) === -1) {

      createPage({
        path: `/stop/${stop.stopCode}`,
        component: path.resolve("./src/templates/stop-page.js"),
        context: {
          stopId: stop.stopId
        }
      });
    }
  });
};