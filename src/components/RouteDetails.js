import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import routeDetails from '../data/routeDetails.js'

const RouteDetails = ({ id }) => {
  const obj = _.filter(routeDetails, r => { return id === r.number.toString() })[0]
  console.log(obj)
  return (
    <div className="details">
    <div>{obj.number}</div>
    <div>{obj.name}</div>
    <div>{`Runs from ${obj.between[0]} to ${obj.between[1]}`}</div>
    <div>Operating {`${obj.days_per_week[1] === 'Sunday' ? `daily` : `${obj.days_per_week[0]} through ${obj.days_per_week[1]}`}`}</div>

    <div>Service Hours:</div>
    <table>
    {Object.keys(obj.service_hours).map(d => (
      <tr>
        <td>{d}</td>
        <td>{obj.service_hours[d][0]}-{obj.service_hours[d][1]}</td>
      </tr>
    ))}
    </table>

    <div>Frequency of service:</div>
    <table>
      {obj.frequency.map(f => (
        <tr>
          {f.map(c => (
            <td>
              {c}
            </td>
          ))}
        </tr>
      ))}
    </table>

    {/* <div>Serving these locations:</div>
    {obj.serving.map(l => (
      <div>{l}</div>
    ))} */}
  </div>
  )

}

export default RouteDetails;
