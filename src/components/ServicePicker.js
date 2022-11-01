import React from 'react';
import feedServices from '../data/services.json'
import SiteSection from './SiteSection';
import { ToggleButton } from './ToggleButton';

const ServicePicker = ({ services, service, setService, inline = true, expands = true, startsClosed = true, className="" }) => {

  // stupid hack because there's a ghost service id
  services = services.filter(s => s !== "4")

  if (services.length === 3) {
    services = ["3", "2", "1"]
  }
  if (services.length === 1) {
    expands = false;
    startsClosed = false;
  }
  return (
    <SiteSection className={className} title={<span>Day of week: <b>{feedServices[service]}</b></span>} {...{ expands, startsClosed }} fullWidth>
      {services.length > 1 && <div className="flex w-100">
        {services.map(s => (
          <ToggleButton
            key={s}
            title={feedServices[s]}
            active={service === s}
            onClick={() => setService(s)}
          />
        ))}
      </div>}
    </SiteSection>
  )
}

export default ServicePicker