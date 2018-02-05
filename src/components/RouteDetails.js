import React from 'react';
import _ from 'lodash';

import routeDetails from '../data/routeDetails.js';

const RouteDetails = ({ id }) => {
  const obj = _.filter(routeDetails, r => { return id === r.number.toString() })[0]
  console.log(obj)

  return (
    <div className="details pa2">
      {/* <div><span className="fw7 f4">{obj.number} {obj.name}</span></div> */}
      {/* <div className="f5 pa2">{`Runs from ${obj.between[0]} to ${obj.between[1]}`}</div> */}
      <div className="pa2 f4">Operating {`${obj.days_per_week[1] === 'Sunday' ? `daily` : `${obj.days_per_week[0]} through ${obj.days_per_week[1]}`}`} from {obj.between[0]} to {obj.between[1]}</div>

      <table className="pa2">
        <thead>
          <tr>
            <th className="tl">Service hours:</th>
          </tr>
        </thead>
      {Object.keys(obj.service_hours).map((d, i) => (
        <tbody key={i}>
          <tr key={i} className="striped--near-white f4">
            <td className="pa2 fw7">{d}</td>
            <td className="pa2">{obj.service_hours[d][0]}-{obj.service_hours[d][1]}</td>
          </tr>
        </tbody>
      ))}
      </table>

      <table className="pa2">
        <thead>
          <tr>
            <th className="tl">Frequency of service</th>
          </tr>
        </thead>
        {obj.frequency.map(f => (
          <tbody key={f}>
            <tr className="striped--near-white f4">
              {f.map((c, i)=> (
                <td key={i} className={i === 0 ? "fw7 pa2" : "pa2"}>
                  {i === 2 ? `every ${c} minutes`: `${c}`}
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
  
    {obj.notes ? <div>{obj.notes}</div> : ``}

    {/* <div>Serving these locations:</div>
    {obj.serving.map(l => (
      <div>{l}</div>
    ))} */}
  </div>
  )

}

export default RouteDetails;
