import React from 'react';
import _ from 'lodash';
import { Card, CardText, CardTitle } from 'material-ui/Card';

import routeDetails from '../data/routeDetails.js';
import PrintSchedule from './PrintSchedule';

const RouteDetails = ({ id }) => {
  const obj = _.filter(routeDetails, r => { return id === r.number.toString() })[0];

  return (
    <div className="details ph2">
      <Card className="mv2">
        <CardText style={{ fontSize: '1.2em' }}>
          {obj.description}
        </CardText>
      </Card>
      <PrintSchedule routePdf={obj.pdf} />
      <Card className="mv2">
        <CardTitle title="Service summary:" />
        {["Monday-Friday", "Saturday", "Sunday/Holiday"].map((d, i) => (
          <div className="pa1 w-100 mb3" key={i}>
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
      </Card>
    </div>
  );
}

export default RouteDetails;
