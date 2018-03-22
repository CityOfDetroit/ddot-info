import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List'

import StopInlineLink from './StopInlineLink';
import RouteLink from './RouteLink';
import {Chip} from 'material-ui';

import Schedules from '../data/schedules.js';
import Stops from '../data/stops.js';

const StopTransfers = ({ stops }) => (
  <div className="transfers ma1">
    <h4>Transfer to other routes</h4>
    {stops.map((s, i) => (
      <Card style={{margin: 10}}>
        <CardHeader component={RouteLink} id={s[0]} direction={s[1]} />
        <CardContent component={StopInlineLink} id={s[2]} showRoutes={false} />
      </Card>
    ))}
  </div>
);

export default StopTransfers;
