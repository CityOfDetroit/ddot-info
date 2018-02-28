import React from 'react';
import { Link } from 'react-router-dom';

import TopNav from './TopNav';
import SchedSVG from '../img/schedule.svg';
import LiveSVG from '../img/speaker_phone.svg';

const About = () => (
  <div>
    <TopNav />
    <div className="ml4">
      <h1>About</h1>
      <p>This app helps transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
      <p>Our goal is to make the DDOT system more transparent and simpler to navigate; this tool helps demystify service areas for new riders and allows regular riders to bookmark schedules for the routes and stops they frequent.</p>
      
      <h2>FAQ</h2>
      <p>Coming soon...</p>

      <h2>Symbology</h2>
      <p>These are descriptions of the icons and colors you'll find throughout this site:</p>
      <table className="collapse ma1">
        <tbody>
          <tr>
            <td className="bb b--moon-gray tc pa2"><img src={LiveSVG} alt="Speaker phone" /></td>
            <td className="bb b--moon-gray bl pl2">Time of arrival based on a bus' Automatic Vehicle Location (AVL); about 75% of buses have AVL technology now</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><img src={SchedSVG} alt="Clock" /></td>
            <td className="bb bl b--moon-gray pl2">Time of arrival based on the route schedule</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2">Bus</td>
            <td className="bb bl b--moon-gray pl2">Location of active buses on the route, color-coded by travel direction</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2">Red Pin</td>
            <td className="bb bl b--moon-gray pl2">Your current location when viewing service <Link to="/nearby">nearby</Link></td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><div style={{ height: '20px', width: '50px', backgroundColor: '#44aa42', margin: 'auto' }}></div></td>
            <td className="bb bl b--moon-gray pl2">Downtown routes</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><div style={{ height: '20px', width: '50px', backgroundColor: '#0079c2', margin: 'auto' }}></div></td>
            <td className="bb bl b--moon-gray pl2">Eastbound/Westbound routes</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><div style={{ height: '20px', width: '50px', backgroundColor: '#9b5ba5', margin: 'auto' }}></div></td>
            <td className="bb bl b--moon-gray pl2">Northbound/Southbound routes</td>
          </tr>
          <tr>
            <td className="tc pa2"><div style={{ height: '20px', width: '50px', backgroundColor: '#d07c32', margin: 'auto' }}></div></td>
            <td className="bl b--moon-gray pl2">Special routes</td>
          </tr>
        </tbody>
      </table>

      <h2>Data sources</h2>
      <p>Link to and explain GTFS and OneBusAway API.</p>

      <h2>Feedback</h2>
      <p>This app is developed by <a className="black dim hover-mid-gray" href="https://cityofdetroit.github.io/iet" target="_blank" rel="noopener noreferrer">IET</a>. Our code is on <a className="black dim hover-mid-gray" href="https://github.com/CityOfDetroit/route-explorer" target="_blank" rel="noopener noreferrer">Github</a>.</p>
      <p>Find a bug or have an idea for the team? Reach out by email or leave us a <a className="black dim hover-mid-gray" href="https://github.com/CityOfDetroit/route-explorer/issues" target="_blank" rel="noopener noreferrer">Github Issue</a>.</p>
    </div>
  </div>
)

export default About;
