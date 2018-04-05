import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import PdfIcon from 'material-ui-icons/PictureAsPdf';

const PrintSchedule = ({ routePdf }) => (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <span style={{marginRight: '.5em'}}>Download schedule:</span>
      {routePdf.map((p, i) => 
        <Chip 
          key={i}
          style={{marginRight: '.5em'}}
          label={<a href={p} style={{ textDecoration: 'none' }}>{routePdf.length === 1 ? `All service` :  i === 0 ? `Weekday` : `Saturday-Sunday` }</a>} 
          avatar={<Avatar><PdfIcon style={{ color: '#000' }} /></Avatar>} />
      )}
    </div>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
