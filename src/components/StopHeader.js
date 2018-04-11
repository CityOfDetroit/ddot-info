import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Feedback from 'material-ui-icons/Feedback';
import Info from 'material-ui-icons/Info';
import Home from 'material-ui-icons/Home';

const StopHeader = ({ id, name }) => (
  <div className="nav header" style={{ padding: '1em', background: '#004445',display: 'flex', alignItems: 'center', verticalAlign: 'middle', justifyContent: 'space-between' }}>
    <div style={{display: 'flex', alignItems: 'center', fontSize: window.innerWidth < 650 ? '1em' : '1.5em'}}>
      <span className="pa2 fw5 white">
        {name}
      </span>
      <span className="fw7 f5 mr2 pa2" style={{background: '#ddd'}}>
        Stop ID #{id}
      </span>
    </div>
    <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      <Link to={{ pathname: `/about` }}>
        <Info style={{ color: '#fff', paddingRight: '.5em' }} />
      </Link>
      <Link to={{ pathname: `/` }}>
        <Home style={{ color: '#fff', paddingRight: '.5em' }} />
      </Link>
      <a href="https://app.smartsheet.com/b/form/28665a43770d48b5bbdfe35f3b7b45ac" style={{ textDecoration: 'none' }}>
        <Button variant="flat" size="small" style={{ textTransform: 'none', backgroundColor: '#fff', color: '#000' }}>
          Feedback
          <Feedback style={{ color: '#004445', marginLeft: '.25em' }} />
        </Button>
      </a>
    </div>
  </div>
);

export default StopHeader;
