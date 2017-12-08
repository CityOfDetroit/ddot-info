import React from 'react';
import PropTypes from 'prop-types';

const ScheduleTable = ({schedule, direction}) => (
  <div className="h4 mh4 mt1">
    <table className="h3 overflow-auto">
      <tbody className="">
      <tr>
        {schedule[direction].stops.map((s, i) => (
          <th className="pv1 ph2 rotate f6 bg-moon-gray fw5" key={i}>{s}</th>
        ))}
      </tr>

      {schedule[direction].trips.map((t, j) => (
        <tr className="striped--light-gray" key={j}>
          {t.timepoints.map((tp, k) => (
            <td className="pa1 w7rem tc f6 fw4" key={k}>{tp}</td>
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