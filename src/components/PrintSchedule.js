import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import PdfIcon from 'material-ui-icons/PictureAsPdf';

const PrintSchedule = ({ routePdf }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {routePdf.map((p, i) => 
        <Button key={i} variant="raised" style={{ margin: '.5em', color: '#eee', textTransform: 'none' }}>
          <a href={p} style={{ color: '#000', textDecoration: 'none' }}>{routePdf.length === 1 ? `Schedule` :  i === 0 ? `Weekday schedule` : `Weekend schedule`}</a>
          <PdfIcon style={{ color: '#000', marginLeft: '.1em' }} />
        </Button>
      )}
    </div>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
