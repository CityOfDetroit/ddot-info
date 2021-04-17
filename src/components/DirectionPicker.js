import React from 'react';
import SiteSection from './SiteSection'

import feedDirs from '../data/directions.json'
import { ToggleButton } from './ToggleButton';

const DirectionPicker = ({ directions, direction, setDirection, routeOrientation, className, inline = true }) => {
  return (
    <SiteSection title={`Direction: ${feedDirs[routeOrientation][direction]}`} className="mb-0" fullWidth>
      <div className="flex">
      {directions.map(d => (
        <ToggleButton
        key={d}
        onClick={() => setDirection(d)}
        title={feedDirs[routeOrientation][d]}
        active={direction === d} />
        ))}
        </div>
    </SiteSection>
  )
}

export default DirectionPicker