import React from 'react';
import Logo from '../data/codlogo.png';

const Footer = () => (
  <div 
    className="footer" 
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1em', marginTop: 10, backgroundColor: '#eee' }}>
    <a href="http://www.detroitmi.gov/">
      <img src={Logo} style={{ height: '60px' }} alt="City of Detroit website" />
    </a>
  </div>
);

export default Footer;