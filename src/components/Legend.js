import React from 'react';

const Legend = () => (
  <div className="ma2" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
    <div className='white fw5 f5 ma2 pa2' style={{ backgroundColor: '#44aa42' }}>Downtown Routes</div>
    <div className='white fw5 f5 ma2 pa2' style={{ backgroundColor: '#0079c2' }}>EB/WB Routes</div>
    <div className='white fw5 f5 ma2 pa2' style={{ backgroundColor: '#9b5ba5' }}>NB/SB Routes</div>
    <div className='white fw5 f5 ma2 pa2' style={{ backgroundColor: '#d07c32' }}>Special Routes</div>
  </div>
);

export default Legend;
