import React from 'react';
import PropTypes from 'prop-types';

import PdfSVG from '../img/pdf.svg';

const PrintSchedule = ({ routePdf }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span className="fw7 mr2">Download schedule as PDF:</span>
    {routePdf.map((p, i) => 
      <a href={p} key={i}>
        <div className="pv2 f6 mr2" style={{ display: 'flex', alignItems:'center' }}>
          <img src={PdfSVG} alt="download PDF" className="ph1" />
          {routePdf.length === 1 ? `All services` :  i === 0 ? `Monday-Friday` : `Saturday-Sunday` }
        </div>
      </a>
    )}
  </div>
);

PrintSchedule.propTypes = {
  routePdf: PropTypes.array.isRequired
};

export default PrintSchedule;
