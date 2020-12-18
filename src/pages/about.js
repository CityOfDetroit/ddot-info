import React from "react";
import Layout from "../components/layout"


const About = () => {
    return (
        <Layout>
            <section className="my-1">
                <h1 className="text-lg py-2 border-bottom">About</h1>
                <p className="py-2">This app helps bus riders find schedules and real-time arrival information for all DDOT routes and bus stops.</p>
                <p className="py-2">You can browse routes, look up a bus stop, or find service near your current location.</p>
            </section>
            <section className="my-1">
            <h1 className="text-lg py-2">Key Features</h1>
                <ul className="list-disc px-3 gibson">
                    <li className="text-lg">
                    <strong>Bookmarkable pages:</strong> Each route and bus stop has a unique URL that looks like ../route/(number) or ../stop/(stop ID) so that you can navigate directly to the info you need
                    </li>
                    <li className="text-lg">
                    <strong>Time awareness:</strong> Features like the bus schedule display service information based on the current time and day of the week, so if you open this page on a Tuesday you'll see the Weekday schedule by default
                    </li>
                </ul>
            </section>
            <h1 className="text-lg py-2">FAQ</h1>
            <h2>Where does the data come from?</h2>
            <p>This app uses DDOT's GTFS data (available <a href="https://data.detroitmi.gov/datasets/ddot-gtfs-file">here</a>; learn more about the <a href="https://developers.google.com/transit/gtfs/">GTFS format</a> here) and the DDOT realtime bus API (more details on that soon).</p>
            <h1 className="text-lg py-2">Feedback</h1>
            <p>This app is developed by the Department of Innovation and Technology (DoIT) at the city of Detroit.</p>
            <p>You can find the code for this app in <a href="https://github.com/CityOfDetroit/route-explorer">this GitHub repository.</a></p>
            <p>Find a bug or have an idea for improvements? Please leave a note on our <a href="https://airtable.com/shrugiMUTLnAn77Xd">feedback form.</a></p>
        </Layout>
    );
};

export default About;