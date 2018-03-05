import React from 'react';
import _ from 'lodash';

import routeDetails from '../data/routeDetails.js';
import PrintSchedule from './PrintSchedule';

const RouteDetails = ({ id }) => {
  const obj = _.filter(routeDetails, r => { return id === r.number.toString() })[0];

  return (
    <div className="details ph3">
      <div className="f5 pv2">{obj.description}</div>
      <div className="f6 pv1">
        Runs from <span className="fw7">{obj.between[0]} </span> 
        to <span className="fw7">{obj.between[1]} </span>
        via <span className="fw7">{obj.via.map(v => `${v}`).join(", ")}</span>
      </div>
      <PrintSchedule routePdf={obj.pdf} />
      {["Monday-Friday", "Saturday", "Sunday/Holiday"].map((d, i) => (
        <div className="pt1 w-100 bt mb3" key={i}>
          <div className="f4 w-100">
            <span className="dib fw7 pb1">{d}</span>
          </div>
          {obj.services[d] ?
            (<div>
              <div className="f5">
              <span className="fw5">
                {obj.services[d].service_hours.length === 1 ? obj.services[d].service_hours[0] : `${obj.services[d].service_hours[0]} - ${obj.services[d].service_hours[1]}` }</span>
              </div>
              <div className="mt2">
                <table className="w-100">
                  <tbody>
                    {obj.services[d].frequency.map((f, i) => (
                      <tr key={i}>
                        <td className='w-50 bg-moon-gray fw7 pa2'>{f[0]}</td>
                        <td className='w-50 bg-moon-gray pa2'>every <span className='fw7'>{f[1]}</span> minutes</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> ) 
          : `No service.`}
        </div>
      ))}
    </div>
  )
}

export default RouteDetails;
