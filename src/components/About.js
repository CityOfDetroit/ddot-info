import React from 'react';

import TopNav from './TopNav';

const About = () => (
  <div>
    <TopNav />
    <div className="ml4">
      <h1>About</h1>
      <p>This app helps transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
      <p>It will replace the PDF links on this City webpage: <a className="black dim hover-mid-gray" href="http://www.detroitmi.gov/How-Do-I/Locate-Transportation/Bus-Schedules" 
        target="_blank" rel="noopener noreferrer">http://www.detroitmi.gov/How-Do-I/Locate-Transportation/Bus-Schedules</a>
      </p>
      <p>See our project roadmap and share feedback on <a className="black dim hover-mid-gray" href="https://github.com/CityOfDetroit/route-explorer" target="_blank" rel="noopener noreferrer">Github</a>.</p>
    </div>
  </div>
)

export default About;
