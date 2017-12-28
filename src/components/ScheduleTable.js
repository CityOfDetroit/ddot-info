import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import _ from 'lodash';

export default class ScheduleTable extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  componentDidMount() {
  }

  render() {
      return (
        <div className="h6">
          <StickyTable className="h6" stickyColumnCount={0}>
            <Row className="fw7">
              {this.props.schedule[this.props.direction].stops.map((s, i) => (
                <Cell className="pa2 fw6 f7 tc v-btm bg-light-gray black w4" key={i}>{_.toUpper(s)}</Cell>
              ))}
            </Row>
            {this.props.schedule[this.props.direction].trips.map((t, j) => (
              <Row className="striped--near-white" key={j} id={"DDOT_116".concat(t.trip_id.toString())}>
                {t.timepoints.map((tp, k) => (
                  <Cell className="pa1 tc f6 fw4 w6 min-w3 v-btm" key={k}>{tp}</Cell>
                ))}
              </Row>
            ))}
          </StickyTable>
        </div>
      );
    // }


  }
}