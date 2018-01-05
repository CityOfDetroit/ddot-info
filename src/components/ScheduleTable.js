import React, { Component } from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import chroma from 'chroma-js';

export default class ScheduleTable extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    const background = `rgba(${chroma(this.props.color).darken().alpha(0.25).rgba().toString()}`

    let tripsToHighlight = this.props.liveTrips.map(t => t.slice(8))
    console.log(tripsToHighlight)

    return (
      <div className="h6 v-top">
        <StickyTable className="h6 v-top" stickyColumnCount={0}>
          <Row className="fw7">
            {this.props.schedule[this.props.direction].stops.map((s, i) => (
              <Cell className="pa2 fw6 f7 tc v-top black" style={{backgroundColor: background}} key={i}>{s}</Cell>
            ))}
          </Row>
          {this.props.schedule[this.props.direction].trips.map((t, j) => (
            <Row 
              className="striped--near-white" 
              key={t.trip_id}
              style={tripsToHighlight.indexOf(t.trip_id) > 0 ? {fontWeight: 'bold'} : {}}
              >
              {t.timepoints.map((tp, k) => (
                <Cell 
                  className={(j+1) % 5 === 0 ? "pa1 bb br tc f6 v-btm w5" : "pa1 br tc f6 v-btm w5"}  
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
  }
}