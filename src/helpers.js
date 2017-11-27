import _ from 'lodash';

import ddotRoutes from './data/routes';

const Helpers = {
  getDescByRouteId: function(id) {
    const desc = _.map(ddotRoutes, function(i) {
      if (i.routeId === id) {
        return i.description;
      }
    });
      
    return _.without(desc, undefined)[0];
  }
}

export default Helpers;
