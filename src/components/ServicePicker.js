import React from 'react';
import feedServices from '../data/services.json'
import SiteSection from './SiteSection';
import { ToggleButton } from './ToggleButton';

const ServicePicker = ({ services, service, setService, inline = true, expands = true, startsClosed = true, className="" }) => {
  if (services.length === 3) {
    services = ["1", "3", "2"]
  }
  return (
    <SiteSection className={className} title={<span>Day of week: <b>{feedServices[service]}</b></span>} {...{ expands, startsClosed }} fullWidth>
      <div className="flex w-100">
        {services.map(s => (
          <ToggleButton
            key={s}
            title={feedServices[s]}
            active={service === s}
            onClick={() => setService(s)}
          />
        ))}
      </div>
    </SiteSection>
  )
}

export default ServicePicker