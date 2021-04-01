import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Layout from "../components/layout"
import PageTitle from "../components/PageTitle";
import SiteSection from "../components/SiteSection";

const About = () => {
  return (
    <>
      <PageTitle text={`About`} icon={faInfoCircle} />

      <SiteSection>
        <p>This app helps bus riders find schedules and real-time arrival information for all DDOT routes and bus stops.</p>
        <p>You can browse routes, look up a bus stop, or find service near your current location.</p>
      </SiteSection>

      <SiteSection title='Key features'>
        <ul className="list-disc list-inside">
          <li>
            <strong>Bookmarkable pages: </strong> 
            Each route and bus stop has a unique URL that looks like ../route/(number) or ../stop/(stop ID) so that you can navigate directly to the info you need
          </li>
          <li>
            <strong>Time awareness: </strong> 
            Features like the bus schedule display service information based on the current time and day of the week, so if you open this page on a Tuesday you'll see the Weekday schedule by default
          </li>
        </ul>
      </SiteSection>

      <SiteSection title="FAQ">
        <h2>Where does the data come from?</h2>
        <p>This app uses DDOT's GTFS data (available <a href="https://data.detroitmi.gov/datasets/ddot-gtfs-file">here</a>; learn more about the <a href="https://developers.google.com/transit/gtfs/">GTFS format</a> here) and the DDOT realtime bus API (more details on that soon).</p>
      </SiteSection> 

      <SiteSection title='Feedback'>
        <p>This app is developed by the Department of Innovation and Technology (DoIT) at the city of Detroit.</p>
        <p>You can find the code for this app in <a href="https://github.com/CityOfDetroit/route-explorer">this GitHub repository.</a></p>
        <p>Find a bug or have an idea for improvements? Please leave a note on our <a href="https://airtable.com/shrugiMUTLnAn77Xd">feedback form.</a></p>
      </SiteSection>
    </>
  );
};

export default About;