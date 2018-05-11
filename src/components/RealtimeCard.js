import React, { Component } from 'react';
import StaticMap, {Marker} from 'react-map-gl';
import {Link} from 'react-router-dom'
import { Card, CardContent, CardMedia } from 'material-ui';
import BusIcon from 'material-ui-icons/DirectionsBus';
import BusStop from './BusStop'
import LiveIcon from 'material-ui-icons/SpeakerPhone';
import ScheduleIcon from 'material-ui-icons/Schedule';
import Warning from 'material-ui-icons/Warning';
import Stops from '../data/stops.js'

import {defaultMapStyle, routeLineIndex} from '../style.js';
import StopInlineLink from './StopInlineLink';
import Helpers from '../helpers';

const styles = {
    prediction: {
        display: 'flex',
        alignItems: 'center',
        opacity: '.5',
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
    constructor(props) {
        super(props);

        this.state = {
            allData: {},
            tripData: null,
            fetched: false
        }
    }

    fetchData() {
        fetch(`${Helpers.endpoint}/trip-details/${this.props.trip}.json?key=BETA&includeStatus=true&includePolylines=false`)
        .then(response => response.json())
        .then(d => {
            this.props.onChange(d.data.entry.status, this.props.route)
            this.setState({ 
                tripData: d.data.entry.status,
                allData: d,
                fetched: true
            })
        })
        .catch(e => console.log(e))
    }

    componentDidMount() {
        this.fetchData();
        this.interval = setInterval(() => this.fetchData(), 3000);
    }

    componentWillUnmount() {
        this.props.onChange(null);
        clearInterval(this.interval);
    }

    computeStopsAway(current, target) {
        const stopOrder = this.state.allData.data.references.stops.map(s => s.id.slice(5,));
        const currentPosition = stopOrder.indexOf(current);
        const targetPosition = stopOrder.indexOf(target);
        return (targetPosition - currentPosition);
      }    
    
    computeTimeAway(current, target) {
        const currentTime = this.state.allData.data.entry.schedule.stopTimes.filter(st => { return st.stopId.slice(5,) === current.toString() })[0] || this.state.allData.data.entry.schedule.stopTimes.slice(1)[0];
        const targetTime = this.state.allData.data.entry.schedule.stopTimes.filter(st => { return st.stopId.slice(5,) === target.toString() })[0];
        const timeFromTarget = Math.floor((targetTime.departureTime - currentTime.departureTime)/60);
        return timeFromTarget;
    }

    render() {
        let style = defaultMapStyle;
        style = style.setIn(['layers', routeLineIndex, 'filter', 2], parseInt(this.props.route, 10));
        
        let nextStopId, nextStopDirection = null;
        if(this.state.fetched && this.state.tripData) {
            nextStopId = this.state.tripData.nextStop.slice(5,);
            nextStopDirection = Stops[nextStopId].routes.filter(a => { return parseInt(a) === parseInt(this.props.route)})[0][1];
        }

        let opposites = {
            'westbound': 'eastbound',
            'eastbound': 'westbound',
            'northbound': 'southbound',
            'southbound': 'northbound',
        }

        return (
            this.state.fetched && this.state.tripData ? 
            (<Card elevation={3} style={{ minWidth: 320, maxHeight: 500, display: 'flex', flexWrap: 'wrap' }}>
                {/* <CardHeader title={`${this.state.tripData.direction} ${this.state.tripData.tripId}`} subheader={`Next stop: ${Stops[nextStopId].name}`} /> */}
                <CardContent>
                    {this.state.tripData.activeTripId === this.props.trip ?
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <BusIcon style={{ height: 20, width: 20, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'white' }} />
                        <div style={{marginLeft: '.5em'}}>
                            Arrives here in 
                            <span style={{ fontWeight: 700, paddingLeft: '.25em' }}>{this.computeTimeAway(nextStopId, this.props.stop)} minutes</span>
                        </div>
                    </div>
                    : <div style={styles.prediction}><Warning style={styles.predictionIcon}/>This bus is still traveling {opposites[nextStopDirection]} and has not started this {nextStopDirection} trip </div>
                    }
                    <div style={{marginTop: '.5em', display: 'flex', alignItems: 'center'}}>
                        <BusStop style={{ height: 20, width: 20, borderRadius: 9999, background: 'rgba(0,0,0,.75)', padding: 2.5, color: 'white' }} />
                        <span style={{marginLeft: '.5em'}}>Now near</span>
                        <Link 
                            style={{ fontSize: '1em', color: '#000', fontWeight: 300, padding: '0px 5px 0px 5px' }} 
                            to={{ pathname: `/stop/${nextStopId}/` }}>
                            <span>{Stops[nextStopId].name}</span>
                        </Link>
                        <span style={{ background: '#eee', padding: '.25em', display: 'inline-block' }}>#{nextStopId}</span>
                        {this.computeStopsAway(nextStopId, this.props.stop) > 0 ?
                            <span style={{ color: '#444', paddingLeft: 10 }}>({this.computeStopsAway(nextStopId, this.props.stop)} stops away)</span>
                            : ``} 
                    </div>
                    {this.state.tripData.predicted ? 
                        <div style={styles.prediction}>
                            <LiveIcon style={styles.predictionIcon}/>
                            <p>Real-time location 
                            {this.state.tripData.predicted ? 
                                (<span style={this.state.tripData.scheduleDeviation > 0 ? styles.behind : styles.ahead}>
                                {this.state.tripData.scheduleDeviation === 0 ? `on time` : (
                                    `${Math.abs(this.state.tripData.scheduleDeviation/60)} min ${this.state.tripData.scheduleDeviation >= 0 ? ' late' : ' early'}`
                                )}</span>)
                                
                            : `` }
                            </p>
                        </div>
                        : <div style={styles.prediction}>
                            <ScheduleIcon style={styles.predictionIcon}/>
                            <p>scheduled location</p>
                          </div>
                    }
                </CardContent>
            </Card>)
            : <Card style={{ minWidth: 320, maxHeight: 500 }}><CardContent>{this.state.fetched ? `No data available...` : `Loading...`}</CardContent></Card>
        );
    }
}

export default RealtimeCard;
