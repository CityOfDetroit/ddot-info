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
        <Table style={{background: '#fff'}}>
            <TableHead >
              <TableRow>
                {this.props.schedule[this.props.direction].stops.map((s, i) => (
                  <TableCell 
                  key={i}
                  style={{ borderBottom: '0', textAlign: 'center', padding: '0em 1em' }}>
                    <Link className="dim black f6 fw7" to={{ pathname: `/stop/${s}/` }}  >
                      {Stops[s].name.indexOf('Rosa Parks') > -1 ? "Rosa Parks TC" : Stops[s].name}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {this.props.schedule[this.props.direction].stops.map((s, j) => (
                  <TableCell 
                    key={j}
                    style={{ borderBottom: '0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '8px', height: '8px', right: j === 0 ? 0 : null, width: j === (this.props.schedule[this.props.direction].stops.length - 1) || j === 0 ? '50%' : '100%', backgroundColor: `${this.props.color}`, verticalAlign: 'center'}}></div>
                      <div style={{ backgroundColor: '#000', height: '24px', width: '24px', borderRadius: '2em', border: '3px solid #fff', margin: 'auto', verticalAlign: 'center', zIndex: '200' }}></div>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
        <TableBody style={{overflowY: 'scroll', height: 400}}>
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
