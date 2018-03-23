import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import PdfIcon from 'material-ui-icons/PictureAsPdf';

const PrintSchedule = ({ routePdf }) => (
    <div style={{margin: 10}}>
      {routePdf.map((p, i) => 
        <Chip 
          key={i}
          style={{marginRight: '.5em'}}
          label={<a href={p} style={{ textDecoration: 'none' }}>{routePdf.length === 1 ? `All service` :  i === 0 ? `Weekday` : `Saturday-Sunday` }</a>} 
          avatar={<Avatar><PdfIcon color='action' /></Avatar>} />
      )}
    </div>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
