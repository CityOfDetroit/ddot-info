import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import BusIcon from '@material-ui/icons/DirectionsBus';
import BusStop from './BusStop';
import LiveIcon from '@material-ui/icons/SpeakerPhone';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Warning from '@material-ui/icons/Warning';
import moment from 'moment';
import Stops from '../data/stops.js';

const styles = {
  prediction: {
    display: 'flex',
    alignItems: 'center',
    opacity: '0.6',
    marginTop: '.5em'
  },
  predictionIcon: {
    marginRight: '.25em',
    width: '1em'
  },
  ahead: {
    color: 'darkgreen',
    fontWeight: 700,
    paddingLeft: '.25em'
  },
  behind: {
    color: 'darkred',
    fontWeight: 700,
    paddingLeft: '.25em'
  }
}

/** Realtime bus details for RouteRealtime */
class RealtimeCard extends Component {
  computeTimeAway(tripStatus) {
    if (tripStatus.predicted) {
      return Math.ceil((tripStatus.predictedArrivalTime - moment()) / 60000)
    } else { 
      return Math.ceil((tripStatus.scheduledArrivalTime - moment()) / 60000) 
    }
}

  render() {
    let nextStopId = null;
    if (this.props.status) {
        nextStopId = this.props.status.tripStatus.nextStop.slice(5,);
        // nextStopDirection = Stops[nextStopId].routes.filter(a => { return parseInt(a, 10) === parseInt(this.props.route, 10)})[0][1];
    }

    // let opposites = {
    //     'westbound': 'eastbound',
    //     'eastbound': 'westbound',
    //     'northbound': 'southbound',
    //     'southbound': 'northbound',
    // }

    return (
      this.props.status ? 
        (<Card elevation={3} style={{ minWidth: 320, maxHeight: 500, display: 'flex', flexWrap: 'wrap' }}>
          <CardContent>
            {this.props.status.tripStatus.activeTripId === this.props.trip ?
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BusIcon style={{ height: 20, width: 20, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'white' }} />
                <div style={{ marginLeft: '.5em' }}>
                  {this.props.status.predicted ? `Arrives here` : `Scheduled to arrive`} in 
                  <span style={{ fontWeight: 700, paddingLeft: '.25em' }}>{this.computeTimeAway(this.props.status)} minutes</span>
                </div>
              </div>
              : <div style={styles.prediction}><Warning style={styles.predictionIcon}/>This bus is still finishing another trip and will turn around before starting this trip</div>
            }
            <div style={{ marginTop: '.5em', display: 'flex', alignItems: 'center' }}>
              <BusStop style={{ height: 20, width: 20, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'white' }} />
              <span style={{ marginLeft: '.5em' }}>Now near</span>
              <Link 
                style={{ fontSize: '1em', color: '#000', fontWeight: 300, padding: '0px 5px 0px 5px' }} 
                to={{ pathname: `/stop/${nextStopId}/` }}>
                <span style={{fontWeight: 700}}>{Stops[nextStopId].name}</span>
              </Link>
              <span style={{ background: '#eee', padding: '.25em', display: 'inline-block' }}>#{nextStopId}</span>
            </div>
            {this.props.status.predicted ? 
              <div style={styles.prediction}>
                <LiveIcon style={{ height: 20, width: 20, borderRadius: 9999, padding: 2.5, }}/>
                <div style={{marginLeft: '.5em'}}>Real-time location 
                  {this.props.status.predicted ? 
                    (<span style={this.props.status.tripStatus.scheduleDeviation > 0 ? styles.behind : styles.ahead}>
                        {this.props.status.scheduleDeviation === 0 ? `on time` : (
                        `${Math.abs(this.props.status.tripStatus.scheduleDeviation/60)} min ${this.props.status.tripStatus.scheduleDeviation >= 0 ? ' late' : ' early'}`
                        )}</span>)    
                  : `` }
                </div>
              </div>
              : <div style={styles.prediction}>
                  <ScheduleIcon style={{ height: 20, width: 20, borderRadius: 9999, padding: 2.5, }}/>
                  <div style={{marginLeft: '.5em'}}>Scheduled location</div>
                </div>
            }
          </CardContent>
        </Card>)
      : <Card style={{ minWidth: 320, maxHeight: 500 }}><CardContent>{`No data available...`}</CardContent></Card>
    );
  }
}

RealtimeCard.propTypes = {
  route: PropTypes.string,
  stop: PropTypes.string,
  trip: PropTypes.string,
  status: PropTypes.object,
}

export default RealtimeCard;
