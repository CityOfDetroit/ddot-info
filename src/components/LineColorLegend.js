import React from 'react';

let downtownStyle = { backgroundColor: '#44aa42' };
let ewStyle = { backgroundColor: '#0079c2' };
let nsStyle = { backgroundColor: '#9b5ba5' };
let specialStyle = { backgroundColor: '#d07c32' };

const LineColorLegend = () => (
  <div className="absolute bottom-2 z-2 f5 fw7" style={{backgroundOpacity: '0.1'}}>
    <div className="ma3 pa2 br2 white" style={downtownStyle}>Routes that go downtown</div>
    <div className="ma3 pa2 br2 white" style={ewStyle}>Routes that go East-West, not downtown</div>
    <div className="ma3 pa2 br2 white" style={nsStyle}>Routes that go North-South, not downtown</div>
    <div className="ma3 pa2 br2 white" style={specialStyle}>Special routes</div>
  </div>
);

export default LineColorLegend;
