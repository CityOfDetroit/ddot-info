import React from 'react';
import _ from 'lodash';
import Card, { CardContent, CardHeader } from 'material-ui/Card';

import routeDetails from '../data/routeDetails.js';
import PrintSchedule from './PrintSchedule';

const RouteDetails = ({ id }) => {
  const obj = _.filter(routeDetails, r => { return id === r.number.toString() })[0];

  return (
    <div className="details ph2">
      <Card className="mv2">
        <CardContent style={{ fontSize: '1.2em' }}>
          {obj.description}
        </CardContent>
      </Card>
      <Card className="mv2">
        {["Monday-Friday", "Saturday", "Sunday/Holiday"].map((d, i) => (
          <div key={i}>
            {obj.services[d] ?
              <Card key={i}>
                <CardHeader
                  title={d}
                  subtitle={obj.services[d].service_hours.length === 1 ? obj.services[d].service_hours[0] : `${obj.services[d].service_hours[0]} - ${obj.services[d].service_hours[1]}`} />
                <CardContent>
                  <table className="w-100">
                    <tbody>
                      {obj.services[d].frequency.map((f, i) => (
                        <tr key={i}>
                          <td className='w-50 bg-light-gray fw7 pa2'>{f[0]}</td>
                          <td className='w-50 bg-light-gray pa2'>every <span className='fw7'>{f[1]}</span> minutes</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card> 
            : <Card key={i}><CardHeader title={d} subtitle="No service" /></Card> }
          </div>
        ))}
      </Card>
      <PrintSchedule routePdf={obj.pdf} />
    </div>
  );
}

export default RouteDetails;
