import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import PdfIcon from 'material-ui-icons/PictureAsPdf';

const PrintSchedule = ({ routePdf }) => (
  <Card>
    <CardContent style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ marginRight: '.5em', fontSize: '1.2em' }}>Download schedule:</div>
      {routePdf.map((p, i) => 
        <Chip key={i} style={{ marginRight: '.5em' }}>
          <Avatar color="#444" icon={<PdfIcon />} />
          <a href={p} style={{ textDecoration: 'none' }}>{routePdf.length === 1 ? `All service` :  i === 0 ? `Weekday` : `Saturday-Sunday` }</a>
        </Chip>
      )}
    </CardContent>
  </Card>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
