import Schedules from './data/schedules.js';
import _ from 'lodash';

const Helpers = {
  /**
   * Config vars
   */
  endpoint: `https://ddot-beta.herokuapp.com/api/api/where`,
  geocoder: `https://gis.detroitmi.gov/arcgis/rest/services/DoIT/StreetCenterlineLatLng/GeocodeServer/reverseGeocode`,
  mapboxStyle: `mapbox://styles/cityofdetroit/cjdev3yttex3c2trljmnm4hrz`,
  mapboxApiAccessToken: `pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjamNiY2RuZDcwMTV1MnF0MW9kbGo5YTlyIn0.5s818a6deB6YJJK4yFkMwQ`,


  /**
   * Colors & formatting
   */
  colors: {
    'northbound': '#c4c4c4',
    'eastbound': '#c4c4c4',
    'southbound': '#B0D27B',
    'westbound': '#B0D27B',
    'clockwise': 'rgb(23, 214, 42)',
    'background': 'rgba(0, 68, 69, 0.2)'  
  },
  lookup: {
    'eastbound': 'EB',
    'westbound': 'WB',
    'southbound': 'SB',
    'northbound': 'NB',
    'clockwise': 'CW'
  },

  /**
   * Translate a day of the week to its service range
   * @param {int}
   * @returns {string}
   */
  dowToService: function(dow) {
    if (dow === 0) {
      return 'sunday';
    } else if (dow === 6) {
      return 'saturday';
    } else { 
      return 'weekday';
    }
  },

  /**
   * Given a route ID, return the schedule entry.
   */
  scheduleFromGtfsId: function(id) {
    const routeNum = _.filter(Object.keys(Schedules), s => {
      return Schedules[s].rt_id.toString() === id.split("_").pop()
    })
    return Schedules[routeNum] || Schedules['498']
  },

  /**
   * Given a an API "schedules" object, replace the trip headsigns.
   */
  cleanScheduleHeadsign: function(stopRouteSchedule) {
    const route = this.scheduleFromGtfsId(stopRouteSchedule.routeId)
    stopRouteSchedule.stopRouteDirectionSchedules.forEach(srds => {
      const testTrip = srds.scheduleStopTimes[0].tripId
      Array.from(["weekday", "saturday", "sunday"]).forEach(s => {
        if(Object.keys(route.schedules).indexOf(s) > -1) {
          Object.keys(route.schedules[s]).forEach(k => {
            if ((_.map(route.schedules[s][k].trips, 'trip_id').indexOf(testTrip.slice(-4,).toString())) > -1) {
              srds.tripHeadsign = k
            }
          })
        }
      })
    })
    return stopRouteSchedule
  },

  /**
   * Given an array of predictions, replace the trip headsigns.
   */
  cleanPredictionHeadsign: function(predictions) {
    return predictions.map(p => {
      const route = this.scheduleFromGtfsId(p.routeId)
      Array.from(["weekday", "saturday", "sunday"]).forEach(s => {
        if(Object.keys(route.schedules).indexOf(s) > -1) {
          Object.keys(route.schedules[s]).forEach(k => {
            if ((_.map(route.schedules[s][k].trips, 'trip_id').indexOf(p.tripId.slice(-4,).toString())) > -1) {
              p.tripHeadsign = k
            }
          })
        }
      })
      return p
    })
  }
};

export default Helpers;
