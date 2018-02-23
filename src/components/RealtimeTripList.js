import React, { Component } from 'react'
import _ from 'lodash'

import RealtimeTrip from './RealtimeTrip'
import Colors from '../data/colors.js'

import SchedSVG from '../img/schedule.svg';
import LiveSVG from '../img/speaker_phone.svg';

export default class RealtimeTripList extends Component {
  render() {
    const byDirection = _.groupBy(this.props.trips, 'properties.direction')

    const dirCount = Object.keys(byDirection).map(d => ([byDirection[d].length, d]))

    console.log(dirCount)

    return (
      <div className="list">

        <div className="pa3 f4">
          {dirCount.length === 0 ? `There are no buses currently running.` : 
          (<div>There are
            {dirCount.map((dc, i) => (
              <div className="dib">
              <span className="ph2 pv1 mh1" style={{backgroundColor: Colors[dc[1]]}}>{dc[0]} {dc[1]}</span> {i+1 === dirCount.length ? ` ` : `&`}</div>
            ))}
          buses currently running.</div>)
            }
        </div>


        <div className="w-100 pa3 f4 fw7" style={{ display: 'flex', justifyContent: 'center', alignItems: 'top', borderBottom: '1px solid #000', }}>
          <div className="w-40">
            <span className='db'>Current trips</span>
            <span className='db f7 fw5 i'>Trips are grouped by direction and displayed in order of distance along route.</span>
          </div>
          <div className="w-60">
            <span className='db'>Next stop</span>
            {/* <span className='db f7 fw5 i w5'>Transfer routes board at nearby stops or at the same stop. Check bus stop signs.</span> */}
          </div>
        </div>

        {Object.keys(byDirection).map((dir, i) =>
          <div key={i}>
            {/* <span 
              className="db pa2 f5 f4-ns fw7 black"
              style={{ backgroundColor: `rgba(${chroma(Colors[dir]).rgba().toString()})` }}>
                {_.capitalize(dir)} to {Stops[this.props.route.schedules.weekday[dir].stops.slice(-1,)].name}
                <br />
                {byDirection[dir].length > 0 ? byDirection[dir].length : 'no'} {byDirection[dir].length === 1 ? `bus` : `buses`}
            </span> */}
            {_.sortBy(byDirection[dir], 'properties.scheduledDistanceAlongTrip').map((t, i) =>
              <div key={i}>
                <RealtimeTrip trip={t} key={t.properties.tripId} />
              </div>
            )}
          </div>
        )}


        <div className="pa3" style={{display: 'flex', alignItems: 'center'}}>
          <span>Trips showing a live location are marked with</span>
          <img src={LiveSVG} className="pa2" style={{width: '1.25em'}} alt={"Real time prediction"} />
          <span>all other trips</span>
          <img src={SchedSVG} className="pa2" style={{width: '1.25em'}} alt={"Scheduled time"} />
          <span>show the scheduled location.</span>
        </div>

      </div>
    )
  }
}
