let rp = require('request-promise')

exports.handler = function(event, context, callback) {
  let url = `http://myddotbus.com/bustime/api/v3/getpredictions?key=${process.env.DDOT_KEY}&format=json&stpid=${event.queryStringParameters.stopId}`

  rp(url)
    .then(body => {
      callback(null, {
        statusCode: 200,
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    })
}