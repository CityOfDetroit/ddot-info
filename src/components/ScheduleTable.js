import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import _ from 'lodash';

export default class ScheduleTable extends Component {
  render() {
    return (
      <div className="w-80" style={{height: '500px'}}>
        <StickyTable className="" stickyColumnCount={0}>
          <Row className="fw7">
            {this.props.schedule[this.props.direction].stops.map((s, i) => (
              <Cell className="pa2 fw6 f7 tc v-btm bg-gray white" key={i}>{_.toUpper(s)}</Cell>
            ))}
          </Row>
          {this.props.schedule[this.props.direction].trips.map((t, j) => (
            <Row className="striped--near-white" key={j}>
              {t.timepoints.map((tp, k) => (
                <Cell className="pa1 tc f6 fw4 v-btm" key={k}>{tp}</Cell>
              ))}
            </Row>
          ))}
        </StickyTable>
      </div>
    );
  }
}