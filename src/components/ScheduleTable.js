import React from 'react';
import PropTypes from 'prop-types';

const ScheduleTable = ({stops, trips}) => (
  <div class="h4 ma4">
    <table class="h3 overflow-auto">
      <tbody class="">
      <tr>
        {stops.map(s => (
          <th class="pv1 ph2 rotate f6 bg-moon-gray fw5" key={s}>{s}</th>
        ))}
      </tr>

      {trips.map(t => (
        <tr class="striped--light-gray" key={t.trip_id}>
          {t.timepoints.map(tp => (
            <td class="pa1 w7rem tc f6 fw4" key={tp}>{tp}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  </div>
); 

ScheduleTable.propTypes = {
  stops: PropTypes.array.isRequired,
  trips: PropTypes.array.isRequired,
}

export default ScheduleTable;