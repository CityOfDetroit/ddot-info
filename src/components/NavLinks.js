import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Feedback from 'material-ui-icons/Feedback';
import Info from 'material-ui-icons/InfoOutline';
import Home from 'material-ui-icons/Home';

/** Navigation links used in TopNav */
const NavLinks = () => (
  <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
    <Link to={{ pathname: `/about` }}>
      <Info style={{ color: '#fff', paddingRight: '.5em', fontSize: '2em' }} />
    </Link>
    <Link to={{ pathname: `/` }}>
      <Home style={{ color: '#fff', paddingRight: '.5em', fontSize: '2em' }} />
    </Link>
    <a href="https://app.smartsheet.com/b/form/28665a43770d48b5bbdfe35f3b7b45ac" style={{ textDecoration: 'none' }}>
      <Button variant="raised" size="small" style={{ backgroundColor: '#B0D27B', color: '#000' }}>
        Feedback
        <Feedback style={{ color: '#000', marginLeft: '.1em' }} />
      </Button>
    </a>
  </div>
);

export default NavLinks;
