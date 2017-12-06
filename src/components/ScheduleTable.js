import React from 'react';
import PropTypes from 'prop-types';

const ScheduleTable = ({schedule, direction}) => (
  <table>
    <tr>
      {schedule[direction].stops.map(s => (
        <th>{s}</th>
      ))}
    </tr>

    {schedule[direction].trips.map(t => (
      <tr key={t.trip_id}>
        {t.timepoints.map(tp => (
          <td>{tp}</td>
        ))}
      </tr>
    ))}
  </table>
); 

export default ScheduleTable;