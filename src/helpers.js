import _ from 'lodash';

import ddotRoutes from './data/routes';

import Schedules from './data/schedules';

const Helpers = {
  getDescByRouteId: function(id) {
    const desc = _.map(ddotRoutes, function(i) {
      if (i.routeId === id) {
        return i.description;
      }
    });
      
    return _.without(desc, undefined)[0];
  },

  combineData: function(routes=ddotRoutes, schedules=Schedules) {
    return _.merge(routes, schedules)
  },

  getRouteSchedule: function(routeId) {
    let routes = this.combineData()
    return routes[routeId]
  },

  dowToService: function(dow) {
    if(dow == 0) {
      return 'sunday'
    }
    else if(dow == 6) {
      return 'saturday'
    }
    else { return 'weekday'}
  }
}

export default Helpers;
