import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Feedback from 'material-ui-icons/Feedback';
import Info from 'material-ui-icons/Info';
import Home from 'material-ui-icons/Home';

const TopNav = () => (
  <div className="nav header" style={{ background: '#004445' }}>
    <div className="pa3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="ph3" style={{ fontSize: window.innerWidth < 650 ? '1.25em' : '2em' }}>
        <Link className="link dim white" to={{ pathname: '/' }}>DDOT</Link>
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
  </div>
)

export default TopNav;
