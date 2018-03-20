import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import PdfIcon from 'material-ui/svg-icons/file/file-download';

const PrintSchedule = ({ routePdf }) => (
  <Card>
    <CardText style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ marginRight: '.5em', fontSize: '1.2em' }}>Download schedule:</div>
      {routePdf.map((p, i) => 
        <Chip key={i} style={{ marginRight: '.5em' }}>
          <Avatar color="#444" icon={<PdfIcon />} />
          <a href={p} style={{ textDecoration: 'none' }}>{routePdf.length === 1 ? `All service` :  i === 0 ? `Weekday` : `Saturday-Sunday` }</a>
        </Chip>
      )}
    </CardText>
  </Card>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
