import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { List } from 'material-ui/List';

import StopListItem from './StopListItem';

const StopTransfers = ({ stops }) => (
  <div className="transfers">
    <Toolbar>
      <ToolbarTitle text="Nearby transfers" style={{ color: 'black', fontWeight: 700}} />
    </Toolbar>
    <List>
      {stops.map((s, i) => (
        <div key={i}>
         <StopListItem id={s[0]}/>
          {/* <StopCard id={s[0]} showTransfers={false} showDir /> */}
        </div>
      ))}
    </List>
  </div>
)

export default StopTransfers;
