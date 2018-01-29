import React from 'react'

const obj = {
  number: 7,
  name: 'Cadillac-Harper'
}

const RouteDetails = () => (
  <div className="fw7 legend">
    <h2>{obj.number}</h2>
    <div className="ma2 pa2 br2 white">{obj.name}</div>
  </div>
)

export default RouteDetails;
