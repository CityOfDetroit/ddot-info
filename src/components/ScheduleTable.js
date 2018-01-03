import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';

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
                <Cell className="pa2 stopHeader fw6 f7 tc v-top black" key={i}>{s}</Cell>
              ))}
            </Row>
            {this.props.schedule[this.props.direction].trips.map((t, j) => (
              <Row className="striped--near-white" key={j} id={"DDOT_116".concat(t.trip_id.toString())}>
                {t.timepoints.map((tp, k) => (
                  <Cell className={(j+1) % 5 === 0 ? "pa1 bb stopTime fifthRow tc f6 fw4 v-btm w5" : "pa1 br stopTime tc f6 fw4 v-btm w5"} key={k}>{tp}</Cell>
                ))}
              </Row>
            ))}
          </StickyTable>
        </div>
      );
    // }


  }
}