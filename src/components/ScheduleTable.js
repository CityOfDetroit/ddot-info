import React from 'react';
import PropTypes from 'prop-types';

const ScheduleTable = ({schedule, direction}) => (
  <div className="h4 ma4">
    <table className="h3 overflow-auto">
      <tbody className="">
      <tr>
        {schedule[direction].stops.map(s => (
          <th className="pv1 ph2 rotate f6 bg-moon-gray fw5" key={s}>{s}</th>
        ))}
      </tr>

      {schedule[direction].trips.map(t => (
        <tr className="striped--light-gray" key={t.trip_id}>
          {t.timepoints.map(tp => (
            <td className="pa1 w7rem tc f6 fw4" key={tp}>{tp}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  </div>
); 

ScheduleTable.propTypes = {
  schedule: PropTypes.shape({
    stops: PropTypes.array,
    trips: PropTypes.array,
  }).isRequired,
  direction: PropTypes.string.isRequired,
}

export default ScheduleTable;