import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ScheduleTable = ({schedule, direction}) => (
  <div className="h4 overflow-auto mh4 mt1 w-60">
    <table className="h3 overflow-auto">
      <tr>
        {schedule[direction].stops.map((s, i) => (
          <th className="pa1 w7rem tc f6 fw4" key={i}>{_.toUpper(s)}</th>
        ))}
      </tr>
      {schedule[direction].trips.map((t, j) => (
        <tr className="striped--light-gray" key={j}>
          {t.timepoints.map((tp, k) => (
            <td className="pa1 w7rem tc f6 fw4" key={k}>{tp}</td>
          ))}
        </tr>
      ))}
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