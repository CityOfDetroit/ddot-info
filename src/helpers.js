const Helpers = {
  /**
   * ref https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
   */
  endpoint: `http://ec2-54-81-243-178.compute-1.amazonaws.com:8080/api/api/where`,
  proxyUrl: `https://cors-anywhere.herokuapp.com/`,

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
