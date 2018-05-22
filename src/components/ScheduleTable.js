import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { withStyles } from "material-ui/styles";
import Arrow from 'material-ui-icons/KeyboardArrowRight';

import Stops from '../data/stops.js';

// attempting a fixedHeader like this: https://codesandbox.io/s/k0vwm7xpl3
const styles = theme => ({
  head: {
    position: "sticky",
    top: 0,
    backgroundColor: 'white',
  }
});

/** Schedule table for RouteSchedule */
class ScheduleTable extends Component {
  render() {
    const { classes } = this.props;
    const background = `rgba(${chroma(this.props.color).alpha(0.25).rgba().toString()}`;
    let tripsToHighlight = this.props.liveTrips.map(t => t.slice(8));

    return (
      <div style={{ overflow: 'auto', maxHeight: '50vh', backgroundColor: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              {this.props.schedule[this.props.direction].timepoints.map((s, k) => (
                <TableCell
                className={classes.head}
                key={k}
                style={{ borderBottom: '0', padding: 0 }}>
                  <div style={{ borderBottom: '0', height: '50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '.2em .5em' }}>
                    <Link style={{ fontSize: '1.1em', color: 'black', fontWeight: 700 }} to={{ pathname: `/stop/${s}/` }}  >
                      {Stops[s].name.indexOf('Rosa Parks') > -1 ? "Rosa Parks TC" : Stops[s].name}
                    </Link>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '11px', height: '8px', right: k === 0 ? 0 : null, width: k === (this.props.schedule[this.props.direction].timepoints.length - 1) || k === 0 ? '50%' : '100%', backgroundColor: `${this.props.color}`, verticalAlign: 'center' }}></div>
                    <Arrow style={{ color: k === this.props.schedule[this.props.direction].timepoints.length - 1 ? '#000' : 'white', backgroundColor: '#000', height: '24px', width: '24px', borderRadius: '2em', border: '3px solid #fff', margin: 'auto', verticalAlign: 'center', zIndex: '200' }} />
                  </div>
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
                    style={{ borderBottom: (j+1) % 5 === 0 ? `2px solid ${this.props.color}` : 0, borderRight: '1px solid #ccc', textAlign: 'center', fontWeight: tp.indexOf('p') > -1 ? 700 : 500 }}
                    key={k}>
                    {tp === "\u2013" ? `—` : tp.slice(0, -2)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ScheduleTable.propTypes = {
  color: PropTypes.string,
  liveTrips: PropTypes.array,
}

export default withStyles(styles)(ScheduleTable);
