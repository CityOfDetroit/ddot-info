import React from 'react';

let downtownStyle = { backgroundColor: '#44aa42' };
let ewStyle = { backgroundColor: '#0079c2' };
let nsStyle = { backgroundColor: '#9b5ba5' };
let specialStyle = { backgroundColor: '#d07c32' };

const LineColorLegend = () => (
  <div>
    <div className="w-25 pa2 mv2 br2 b white" style={downtownStyle}>Routes that go downtown</div>
    <div className="w-25 pa2 mv2 br2 b white" style={ewStyle}>Routes that go East-West, not downtown</div>
    <div className="w-25 pa2 mv2 br2 b white" style={nsStyle}>Routes that go North-South, not downtown</div>
    <div className="w-25 pa2 mv2 br2 b white" style={specialStyle}>Special routes</div>
  </div>
);

export default LineColorLegend;
