import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import chroma from 'chroma-js';

export default class ScheduleTable extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  componentDidMount() {
  }

  render() {
    const background = `rgba(${chroma(this.props.color).darken().alpha(0.25).rgba().toString()}`
      return (
        <div className="h6 v-top">
          <StickyTable className="h6 v-top" stickyColumnCount={0}>
            <Row className="fw7">
              {this.props.schedule[this.props.direction].stops.map((s, i) => (
                <Cell className="pa2 fw6 f7 tc v-top black" style={{backgroundColor: background}} key={i}>{s}</Cell>
              ))}
            </Row>
            {this.props.schedule[this.props.direction].trips.map((t, j) => (
              <Row className="striped--near-white" key={j} id={"DDOT_116".concat(t.trip_id.toString())}>
                {t.timepoints.map((tp, k) => (
                  <Cell 
                    className={(j+1) % 5 === 0 ? "pa1 bb br tc f6 fw4 v-btm w5" : "pa1 br tc f6 fw4 v-btm w5"}  
                    style={(j+1) % 5 === 0 ? {borderBottomColor: background, borderBottomWidth: '0.25em'} : {} }
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
    // }


  }
}