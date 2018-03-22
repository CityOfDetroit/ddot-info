import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List'

import StopCard from './StopCard';
import RouteLink from './RouteLink';
import {Chip} from 'material-ui';

const StopTransfers = ({ stops }) => (
  <Card className="transfers ma1">
    <CardHeader title="Transfer to other routes nearby" />
    <CardContent className="overflow-scroll">
      {stops.map((s, i) => (
        <div>
        <div style={{display: 'flex', margin: '.5em', justifyContent: 'space-between'}}>
          <RouteLink id={s[0]} />
          <Chip label={s[1]} style={{padding: '.5em'}} />
        </div>
        <StopCard id={s[2]} />
        </div>
      ))}
    </CardContent>
  </Card>
);

export default StopTransfers;
