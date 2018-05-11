import React from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import LiveIcon from 'material-ui-icons/SpeakerPhone';
import ScheduleIcon from 'material-ui-icons/Schedule';
import PdfIcon from 'material-ui-icons/PictureAsPdf';
import Bus from 'material-ui-icons/DirectionsBus';
import NearbyIcon from 'material-ui-icons/Place';

import BusIcon from './BusStop'
import TopNav from './TopNav';

/** Content for /about page */
const About = () => (
  <div>
    <TopNav />
    <div style={{ margin: '1em 2em' }}>
      <h1>About</h1>
      <p>This app helps transit riders find bus schedules and real-time arrival information for DDOT routes and bus stops.</p>
      <p>Our goal is to make the DDOT system more transparent and simpler to navigate; this tool helps demystify service areas for new riders and allows regular riders to bookmark schedules for the routes and stops they frequent.</p>
      
      <Divider />
      <h2>Key features</h2>
      <ul>
        <li style={{ paddingBottom: '.5em' }}><strong>Find nearby bus stops and routes:</strong> See stops and routes within a quarter mile, or about a 5 minute walk, on the <Link to="/nearby">../nearby</Link> page. Your web browser will prompt to know your location, and you must allow it to use this feature</li>
        <li style={{ paddingBottom: '.5em' }}><strong>Bookmarkable route and stop pages:</strong> Each bus route and stop has a unique URL that looks like ../route/(number) or ../stop/(number) so that familiar riders can navigate directly to the info they need</li>
        <li><strong>Time-awareness:</strong> Features like the bus schedule display service information based on the current time and day of the week, so if you open this page on a Tuesday you'll see the Weekday schedule by default</li>
      </ul>

      <Divider />
      <h2>FAQ</h2>
      <h4>How accurate are predictions?</h4>
      <p>The real-time data, indicated by the speaker phone icon, are generated using a bus' Automatic Vehicle Location (AVL). Currently, about 75% of DDOT buses are outfitted with AVL technology. As DDOT undergoes a technology upgrade, all buses will have AVL and existing AVL will be improved.</p>
      <p>Based on our experience, it's not uncommon for the real-time prediction to be 1-3 minutes off in either direction, so give yourself a few extra minutes.</p>
      <p>Knowing that the real-time data isn't 100% accurate or available 100% of the time, we provide route- and stop-specific data from the schedule (indicated by the clock icon) in addition to the real-time arrival information so that you can get the full picture.</p>

      <h4>What about trip-planning?</h4>
      <p>This app does not currently support trip planning. Trip planning means asking the app something like, "I am here and want to go there, which bus(es) should I get on?"</p>
      <p>We may incorporate trip planning in a future iteration, but for now our primary goal is to explain DDOT service. Trip planning will require a more regional scope.</p>
      <p>DDOT recommends downloading Transit App from your app store for trip planning. Transit App utilizes the same data sources as this app, but also incorporates transit data from SMART, QLine, People Mover, MoGo bike-share docks and Lyft and Uber ride-sharing.</p>

      <Divider />
      <h2>Symbology</h2>
      <table className="collapse ma1 mb4">
        <tbody>
          <tr>
            <td className="bb b--moon-gray tc pa2"><strong>Icon</strong></td>
            <td className="bb b--moon-gray bl pl2"><strong>Description</strong></td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><LiveIcon /></td>
            <td className="bb b--moon-gray bl pl2">Predicted time of departure based on a bus' Automatic Vehicle Location (AVL), as available</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><ScheduleIcon /></td>
            <td className="bb bl b--moon-gray pl2">Scheduled time of departure based on the fixed bus route</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><Bus /></td>
            <td className="bb bl b--moon-gray pl2">Active buses on a route; zoom in to see more details about that bus</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><BusIcon /></td>
            <td className="bb bl b--moon-gray pl2">Bus stops</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><NearbyIcon /></td>
            <td className="bb bl b--moon-gray pl2">See service nearby your current location</td>
          </tr>
          <tr>
            <td className="bb b--moon-gray tc pa2"><PdfIcon /></td>
            <td className="bb bl b--moon-gray pl2">Download the current route schedule as a PDF</td>
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
            <td className="bb b--moon-gray tc pa2"><div style={{ height: '20px', width: '50px', backgroundColor: '#d07c32', margin: 'auto' }}></div></td>
            <td className="bb bl b--moon-gray pl2">Special routes</td>
          </tr>
          <tr>
            <td className="tc pa2"><div style={{ height: '20px', width: '50px', backgroundColor: 'hsl(60, 84%, 49%)', margin: 'auto' }}></div></td>
            <td className="bl b--moon-gray pl2">Stop ID; these numbers will appear on future DDOT bus stop signs</td>
          </tr>
        </tbody>
      </table>

      <Divider />
      <h2>Data sources</h2>
      <p>Link to and explain GTFS and OneBusAway API.</p>

      <Divider />
      <h2>Feedback</h2>
      <p>This app is developed by <a href="https://cityofdetroit.github.io/iet" target="_blank" rel="noopener noreferrer">IET</a>. Our code is on <a href="https://github.com/CityOfDetroit/route-explorer" target="_blank" rel="noopener noreferrer">Github</a>.</p>
      <p>Find a bug or have an idea for the project team? Reach out by <a href="mailto:iet@detroitmi.gov">email</a> or leave us a <a href="https://github.com/CityOfDetroit/route-explorer/issues" target="_blank" rel="noopener noreferrer">Github Issue</a>.</p>
    </div>
  </div>
)

export default About;
