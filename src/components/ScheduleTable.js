import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import _ from 'lodash';

export default class ScheduleTable extends Component {
  render() {
    return (
      <div className="" style={{width: '600px'}}>
        <StickyTable className="" stickyRowCount={0}>
          {this.props.schedule[this.props.direction].stops.map((s, i) => (
            <Row key={i}>
              <Cell className="bg-dark-gray white fw7 f7 pa2 w5" style={{'min-width': '200px'}}>{s}</Cell>
              {this.props.schedule[this.props.direction].trips.map((t) => (
                <Cell className="pa1 striped--near-white">{t.timepoints[i]}</Cell>
              ))}
            </Row>
          ))}
        </StickyTable>
      </div>
    );
  }
}