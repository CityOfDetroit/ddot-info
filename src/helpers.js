import _ from 'lodash';

import ddotRoutes from './data/routes';
import Schedules from './data/schedules';
import moment from 'moment';

const Helpers = {
  /**
   * Merge routes and schedules into the same object by route number key
   */
  combineData: function(routes=ddotRoutes, schedules=Schedules) {
    return _.merge(routes, schedules);
  },

  /*
   * Lookup a schedule for a single route by id
   */
  getRoute: function(routeId) {
    let routes = this.combineData()
    return routes[routeId];
  },

  /*
   * Lookup a schedule for a single route by id
   */
  getAllRoutes: function(routeId) {
    let routes = this.combineData()
    return routes;
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
   * Get expected trips for a route at the current time
   * @param {int}
   * @returns {array}
   */
   currentTripsForRoute: function(route) {
     const serviceDay = this.dowToService(moment().format('d'))
     const sched = Schedules[route].schedules[serviceDay]
     let currentTrips = []
     _.forEach(sched, dir => {
       _.forEach(dir.trips, t => {
         const now = moment()
         const start = moment(`${moment().format('LL')} ${t.timepoints[0]}`, 'LL h:mma')
         const end = moment(`${moment().format('LL')} ${t.timepoints.slice(-1)[0]}`, 'LL h:mma')
         if (now.isBetween(start, end)) {
           currentTrips.push(t.trip_id)
         }
       })
     })
     return currentTrips;
   }
}

export default Helpers;
