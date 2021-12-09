import SiteSection from "./SiteSection"
import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ServiceSuspended = ({ at = 'stop' }) => {
  return (
    <SiteSection title={`Service suspended!`} icon={faExclamationCircle} className='bg-red-200 my-0'>
      <p className="pt-2 py-5 text-xl">
        Service is currently suspended 
        {at === 'stop' ? ` at this stop ` : ` along this route `} 
        as of November 15, 2021.
      </p>
    </SiteSection>
  )
}

export default ServiceSuspended;