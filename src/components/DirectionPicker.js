import React from 'react';
import SiteSection from './SiteSection'

import feedDirs from '../data/directions.json'
import { ToggleButton } from './ToggleButton';

const DirectionPicker = ({ directions, direction, setDirection, routeOrientation, className, inline = true }) => {
  return (
    <SiteSection title={`Direction: ${feedDirs[routeOrientation][direction]}`} fullWidth>
      <div className="flex mb-3">
      {directions.map(d => (
        <ToggleButton
        onClick={() => setDirection(d)}
        title={feedDirs[routeOrientation][d]}
        active={direction === d} />
        ))}
        </div>
    </SiteSection>
  )
}

export default DirectionPicker