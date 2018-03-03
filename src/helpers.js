import Schedules from './data/schedules.js';
import _ from 'lodash';

const Helpers = {
  /**
   * Config vars
   */
  endpoint: `https://ddot-beta.herokuapp.com/api/api/where`,
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
    'clockwise': 'rgb(23, 214, 42)'   
  },
  lookup: {
    'eastbound': 'EB',
    'westbound': 'WB',
    'southbound': 'SB',
    'northbound': 'NB'
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
    return Schedules[routeNum]
  }
};

export default Helpers;
