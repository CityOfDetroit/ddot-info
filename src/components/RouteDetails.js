import React from 'react';
import _ from 'lodash';

import routeDetails from '../data/routeDetails.js';

const RouteDetails = ({ id }) => {
  const obj = _.filter(routeDetails, r => { return id === r.number.toString() })[0]
  console.log(obj)

  return (
    <div className="details ph3">
      <div className="f5 pv3">{obj.description}</div>

      {["Monday-Friday", "Saturday", "Sunday/Holiday"].map((d, i) => (
      <div className="pt1 w-100 bt mb3">
          <div key={i} className="f4 w-100">
            <span className="dib fw7 pb1">{d}</span>
          </div>
          {obj.services[d] ?
          (
          <div><div key={i} className="f5">
            <span className="fw5">{obj.services[d].service_hours[0]} - {obj.services[d].service_hours[1]}</span>
          </div>
          <div className="mt2">
            <table className="w-100">
              {obj.services[d].frequency.map((f, i) => (
                  <tr>
                    <td className='w-50 bg-moon-gray fw7 pa2'>{f[0]}</td>
                    <td className='w-50 bg-moon-gray pa2'>every <span className='fw7'>{f[1]}</span> minutes</td>
                  </tr>
              ))}
            </table>
            </div></div> )
          : `No service.`}
        </div>

      ))}
  </div>
  )

}

export default RouteDetails;
