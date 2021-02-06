import React from "react";
import Layout from "../components/layout"


const Covid = () => {
    return (
        <Layout>
            <h1 className="text-2xl">Responding to COVID-19</h1>
            <p className="py-2 text-lg">
            The Detroit Department of Transportation takes the COVID-19 situation very seriously. We are working with the City of Detroit, state and local public health officials and following the CDC’s guidance to reduce the spread of COVID-19.
            </p>
            <p className="py-2 text-lg">
            DDOT and the Detroit Police Department would like to remind all passengers of the following when riding a DDOT coach: 
            </p>
            <ul className="list-disc mx-6">
                <li className="text-lg px-2 py-1 gibson">All persons on DDOT coaches are required to wear face coverings, completely covering their nose and mouth for the entire time on the coach, unless excused for purposes of ADA compliance.</li>
                <li className="text-lg px-2 py-1 gibson">With the exception of ADA front-door boarding, all passengers will enter and exit the coach through the rear door.</li>
                <li className="text-lg px-2 py-1 gibson">All passengers should remain in the designated area, and no person shall approach the Coach Operator while on the bus or cross the barrier at any time while on the coach.</li>
                <li className="text-lg px-2 py-1 gibson">All instances of threats or violence will be thoroughly investigated, and DDOT will seek prosecution for these acts, to the fullest extent of the law.</li>
            </ul>
            <h2 className="py-2 mt-6 text-xl">What you can do to help reduce the spread of COVID-19</h2>
            <p className="py-2 text-lg">
            The Detroit Department of Transportation supports social distancing to help prevent the spread of germs and COVID-19. We ask that passengers:
            </p>
            <ul className="list-disc mx-6">
                <li className="text-lg px-2 py-1 gibson">Board and exit using the rear doors. Only customers who require ADA ramp or bus-knelling are to use the front doors.</li>
                <li className="text-lg px-2 py-1 gibson">Refrain from sitting behind the bus driver.</li>
                <li className="text-lg px-2 py-1 gibson">Sit every other seat on the bus.</li>
                <li className="text-lg px-2 py-1 gibson">Contact Customer Service at (313) 933-1300 Monday through Friday from 6 a.m. to 6 p.m. for bus information. Expect delays due to high call volumes.</li>
            </ul>
            <p className="py-2 text-lg">
            Remember to use hand sanitizer dispensers where available and to wash your hands often, and cover coughs and sneezes with a tissue. The CDC recommends everyday preventive actions to help prevent the spread of respiratory viruses, including:
            </p>
            <ul className="list-disc mx-6">
            <li className="text-lg px-2 py-1 gibson">
                Avoid close contact with people who are sick.
            </li>
            <li className="text-lg px-2 py-1 gibson">
                Avoid touching eyes, nose, and mouth.
            </li>
            <li className="text-lg px-2 py-1 gibson">
                Wash hands with soap and water for at least 20 seconds.
            </li>
            <li className="text-lg px-2 py-1 gibson">
                Disinfect frequently touched objects and surfaces.
            </li>            
        </ul>
        </Layout>
    );
};

export default Covid;