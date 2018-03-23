import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Stops from '../data/stops.js';

class ScheduleTable extends Component {
  render() {
    const background = `rgba(${chroma(this.props.color).alpha(0.25).rgba().toString()}`;
    let tripsToHighlight = this.props.liveTrips.map(t => t.slice(8));

    return (
      <Table>
        <TableHead>
          <TableRow>
            {this.props.schedule[this.props.direction].stops.map((s, i) => (
              <TableCell 
                key={i}
                style={{ borderBottom: '0', textAlign: 'center' }}>
                <Link className="dim black f6 fw7" to={{ pathname: `/stop/${s}/` }} >
                  {Stops[s].name.indexOf('Rosa Parks') > -1 ? "Rosa Parks TC" : Stops[s].name}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.schedule[this.props.direction].trips.map((t, j) => (
            <TableRow 
              key={t.trip_id}
              style={tripsToHighlight.indexOf(t.trip_id) > -1 ? { backgroundColor: background } : {}}>
              {t.timepoints.map((tp, k) => (
                <TableCell
                  className={tp.indexOf('p') > -1 ? "fw7" : "" }
                  style={(j+1) % 5 === 0 ? { borderBottom: `2px solid ${this.props.color}`, borderRight: '1px solid #ccc', textAlign: 'center' } : { borderBottom: '0', borderRight: '1px solid #ccc', textAlign: 'center' } }
                  key={k}>
                  {tp.slice(0, -2)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

ScheduleTable.propTypes = {
  color: PropTypes.string,
  liveTrips: PropTypes.array,
}

export default ScheduleTable;
