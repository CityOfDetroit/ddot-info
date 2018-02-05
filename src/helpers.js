const Helpers = {

  endpoint: `http://ec2-54-81-243-178.compute-1.amazonaws.com:8080/api/api/where`,

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
