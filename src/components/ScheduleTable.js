import React from 'react';
import PropTypes from 'prop-types';

const ScheduleTable = ({schedule, direction}) => (
  <table>
    <tbody>
    <tr>
      {schedule[direction].stops.map(s => (
        <th key={s}>{s}</th>
      ))}
    </tr>

    {schedule[direction].trips.map(t => (
      <tr key={t.trip_id}>
        {t.timepoints.map(tp => (
          <td key={tp}>{tp}</td>
        ))}
      </tr>
    ))}
    </tbody>
  </table>
); 

ScheduleTable.propTypes = {
  schedule: PropTypes.shape({
    stops: PropTypes.array,
    trips: PropTypes.array,
  }).isRequired,
  direction: PropTypes.string.isRequired,
}

export default ScheduleTable;