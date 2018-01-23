import React from 'react';

import TopNav from './TopNav';

const About = () => (
  <div>
    <TopNav />
    <div className="ml4">
      <h1>About</h1>
      <p>Route-Explorer is a beta project between DoIT and DDOT to make bus schedules easier to access and more dynamic by incorporating real-time data.</p>
      <p>It will replace the PDF links on this City webpage: <a className="black dim hover-mid-gray" href="http://www.detroitmi.gov/How-Do-I/Locate-Transportation/Bus-Schedules" 
        target="_blank" rel="noopener noreferrer">http://www.detroitmi.gov/How-Do-I/Locate-Transportation/Bus-Schedules</a>
      </p>
      <p>See our project roadmap and share feedback on <a className="black dim hover-mid-gray" href="https://github.com/CityOfDetroit/route-explorer" target="_blank" rel="noopener noreferrer">Github</a>.</p>
    </div>
  </div>
)

export default About;
