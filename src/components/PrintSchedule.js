import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import PdfIcon from 'material-ui-icons/PictureAsPdf';

const PrintSchedule = ({ routePdf }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '.5em' }}>Download schedule:</span>
      {routePdf.map((p, i) => 
        <Button key={i} variant="raised" size="small" style={{ margin: '.5em', color: '#eee' }}>
          <a href={p} style={{ textDecoration: 'none' }}>{routePdf.length === 1 ? `All service` :  i === 0 ? `Weekday` : `Saturday-Sunday` }</a>
          <PdfIcon style={{ color: '#000', marginLeft: '.1em' }} />
        </Button>
      )}
    </div>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
