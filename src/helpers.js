import _ from 'lodash';

import ddotRoutes from './data/routes';
import Schedules from './data/schedules';

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
  }
}

export default Helpers;
