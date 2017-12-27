import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import _ from 'lodash';

export default class ScheduleTable extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  componentDidMount() {
    const something = this.props.liveTrips
    console.log(something)
  }

  render() {
    let width = window.innerWidth

    if (width < 600) {
      return (
        <div className="h6">
          <StickyTable className="h6 w-100" stickyRowCount={0}>
            {this.props.schedule[this.props.direction].stops.map((s, i) => (
              <Row key={i} className="striped--near-white">
                <Cell className="bg-gray white fw6 f7 pv2 tr pr2" style={{minWidth: '110px'}}>{_.toUpper(s)}</Cell>
                {this.props.schedule[this.props.direction].trips.map((t) => (
                  <Cell className = "ph2 f7 fw5 v-mid" key={t.trip_id} id={ i === 1 ? "DDOT_116".concat(t.trip_id.toString()) : null }>{t.timepoints[i]}</Cell>
                ))}
              </Row>
            ))}
          </StickyTable>
        </div>
      );
    }
    else {
      return (
        <div className="h6">
          <StickyTable className="h6 w6" stickyColumnCount={0}>
            <Row className="fw7">
              {this.props.schedule[this.props.direction].stops.map((s, i) => (
                <Cell className="pa2 fw6 f7 tc v-btm bg-gray white w4" key={i}>{_.toUpper(s)}</Cell>
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
    }


  }
}