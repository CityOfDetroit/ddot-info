import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PdfIcon from '@material-ui/icons/PictureAsPdf';

/** Print PDF button(s) for RouteDetails */
const PrintSchedule = ({ routePdf }) => (
  <div style={{ display: 'flex', alignItems: 'center', fontSize: '.9em' }}>
    <span>Download:</span>
    {routePdf.map((p, i) => 
      <Button key={i} variant="raised" size="small" style={{ margin: '.5em', color: '#eee', textTransform: 'none' }}>
        <a href={p} style={{ color: '#000', textDecoration: 'none' }}>{routePdf.length === 1 ? `All service` :  i === 0 ? `Weekday` : `Weekend`}</a>
        <PdfIcon style={{ color: '#000', marginLeft: '.1em' }} />
      </Button>
    )}
  </div>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
