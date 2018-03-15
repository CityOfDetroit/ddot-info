import React from 'react';

import StopListItem from './StopListItem';

import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import {List, ListItem} from 'material-ui/List'

const StopTransfers = ({ stops }) => (
  <div>
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
