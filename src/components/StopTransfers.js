import React from 'react';
import List  from 'material-ui/List';

import StopListItem from './StopListItem';

const StopTransfers = ({ stops }) => (
  <div className="transfers">
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
