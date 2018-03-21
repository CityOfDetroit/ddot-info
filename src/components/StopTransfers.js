import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import StopCard from './StopCard';

const StopTransfers = ({ stops }) => (
  <Card className="transfers overflow-scroll ma1">
    <CardHeader title="Transfer to other routes nearby" />
    <CardContent>
      {stops.map((s, i) => (
        <StopCard key={i} id={s[0]} showTransfers={false} showDir />
      ))}
    </CardContent>
  </Card>
);

export default StopTransfers;
