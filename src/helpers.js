const Helpers = {
  /**
   * ref https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
   */
  endpoint: `http://ec2-54-81-243-178.compute-1.amazonaws.com:8080/api/api/where`,
  proxyUrl: `https://cors-anywhere.herokuapp.com/`,
  mapboxStyle: `mapbox://styles/cityofdetroit/cjdev3yttex3c2trljmnm4hrz`,
  mapboxApiAccessToken: `pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjamNiY2RuZDcwMTV1MnF0MW9kbGo5YTlyIn0.5s818a6deB6YJJK4yFkMwQ`,

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
