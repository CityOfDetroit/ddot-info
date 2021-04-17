import React from "react";
import Layout from "../components/layout"


const Covid = () => {
    return (
        <>
          <div className="px-4 my-4">

            <h1 className="text-2xl">Responding to COVID-19</h1>
            <p className="py-2 text-lg">
            The Detroit Department of Transportation takes the COVID-19 situation very seriously. We are working with the City of Detroit, state and local public health officials and following the CDC’s guidance to reduce the spread of COVID-19.
            </p>
            <p className="py-2 text-lg">
            DDOT and the Detroit Police Department would like to remind all passengers of the following when riding a DDOT coach: 
            </p>
            <ul className="list-disc mx-6">
                <li className="text-lg px-2 py-1 gibson"><b>Mask required.</b> Wearing a face covering is mandated by federal law. When you cover properly, you protect everyone</li>
                <li className="text-lg px-2 py-1 gibson"><b>Fare collection has resumed.</b> Appropriate fare is required to ride a DDOT vehicle.</li>
                <li className="text-lg px-2 py-1 gibson"><b>Avoid riding if you feel ill.</b> Please do not ride the bus if you feel sick. Get well soon!</li>
                <li className="text-lg px-2 py-1 gibson"><b>Stay 6 feet apart.</b> Remember to maintain social distancing from others while riding inside the bus. </li>
            </ul>
            <p className="py-2 text-lg">  
              Bus Passes are available to purchase on the DART App or in-person at 1301 E. Warren and the Rosa Parks Transit Center. To view the full list of participating locations, visit <a href="https://detroitmi.gov/departments/detroit-department-transportation/transportation-fares/buy-pass">DDOT's website.</a>
            </p>
            <h2 className="py-2 mt-6 text-xl">What you can do to help reduce the spread of COVID-19</h2>

            <p className="py-2 text-lg">
            The Detroit Department of Transportation supports social distancing to help prevent the spread of germs and COVID-19. We ask that passengers:
            </p>
            <ul className="list-disc mx-6">
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
          </div>
        </>
    );
};

export default Covid;