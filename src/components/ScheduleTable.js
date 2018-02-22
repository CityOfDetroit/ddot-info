import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

import Stops from '../data/stops.js';

class ScheduleTable extends Component {
  render() {
    const background = `rgba(${chroma(this.props.color).darken().alpha(0.25).rgba().toString()}`;
    const active = `rgba(${chroma(this.props.color).darken(2).rgba().toString()}`;

    let tripsToHighlight = this.props.liveTrips.map(t => t.slice(8))

    return (
      <div className="v-top schedule">
        <StickyTable className="h6 v-top">
          <Row className="fw7">
          {/* <Cell className="pa2 fw6 f7 tc v-top black bb br tripid w2"></Cell> */}
            {this.props.schedule[this.props.direction].stops.map((s, i) => (
              <Cell className="pa2 fw6 f7 tc v-top black bb w2 sched" style={{backgroundColor: background}} key={i}>
                <Link to={{pathname: `/stop/${s}/`}} >
                  {Stops[s].name}
                </Link>
              </Cell>
            ))}
          </Row>
          {this.props.schedule[this.props.direction].trips.map((t, j) => (
            <Row 
              className="striped--near-white" 
              key={t.trip_id}
              style={tripsToHighlight.indexOf(t.trip_id) > -1 ? {color: active, fontWeight: 'bold', backgroundColor: background} : {}}
              >
                {/* <Cell 
                  className={(j+1) % 5 === 0 ? "pa2 bb br tc f7 fw5 v-btm tripid" : "pa2 br tc f7 fw5 v-btm tripid"}  
                  style={(j+1) % 5 === 0 ? {borderBottomColor: background, borderBottomWidth: '4px'} : {} }
                >
                  {t.trip_id}
                </Cell>               */}
              {t.timepoints.map((tp, k) => (
                <Cell 
                  className={(j+1) % 5 === 0 ? "pa2 bb br tc f6 v-mid w5 fw5 sched" : "pa2 br tc f6 v-mid fw5 w5 sched"}  
                  style={(j+1) % 5 === 0 ? {borderBottomColor: background, borderBottomWidth: '4px'} : {} }
                  key={k}
                >
                  {tp}
                </Cell>
              ))}
            </Row>
          ))}
        </StickyTable>
      </div>
    );
  }
}

ScheduleTable.propTypes = {
  color: PropTypes.string,
  liveTrips: PropTypes.array,
}

export default ScheduleTable;
