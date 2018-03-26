import React, { Component } from 'react';
import StaticMap, {Marker} from 'react-map-gl'

import BusIcon from 'material-ui-icons/DirectionsBus'
import LiveIcon from 'material-ui-icons/SpeakerPhone'
import ScheduleIcon from 'material-ui-icons/Schedule'

import { Card, CardContent, CardMedia, CardActions , Chip, Divider} from 'material-ui';

import {defaultMapStyle} from '../style.js';
import Helpers from '../helpers'
import Stops from '../data/stops'
// import Schedules from '../data/schedules'

const styles = {
    prediction: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '.8em',
        opacity: '.5'
    },
    predictionIcon: {
        margin: '0em .25em',
        width: '1em'
    },
    ahead: {
        color: 'darkgreen'
    },
    behind: {
        color: 'darkred'
    }
}

class RealtimeCard extends Component {

    render() {
        const {properties, geometry} = this.props.trip
        return (
            <Card elevation={3} style={{margin: '1em', minWidth: 320, maxHeight: 500}}>
                <CardMedia component={StaticMap}
                        width={320}
                        height={280}
                        latitude={geometry.coordinates[1]}
                        longitude={geometry.coordinates[0]}
                        zoom={14}
                        mapStyle={defaultMapStyle}
                        mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
                        attributionControl={false}
                        children={[<Chip label={properties.direction} style={{margin: '.5em', background: Helpers.colors[properties.direction], border: '2px solid rgba(0,0,0,0.5)'}} />, <Marker latitude={geometry.coordinates[1]} longitude={geometry.coordinates[0]}>
                                    <BusIcon />
                        </Marker>]}
                        />
                {/* <CardHeader title={`${properties.direction} ${properties.tripId}`} subheader={`Next stop: ${Stops[properties.nextStop.slice(5,)].name}`} /> */}
                <CardContent>
                    <p>Next stop: {Stops[properties.nextStop.slice(5,)].name}</p>
                </CardContent>
                <CardActions disableActionSpacing>
                    {properties.predicted 
                        ? <div style={styles.prediction}><LiveIcon style={styles.predictionIcon}/><p>real-time location {properties.predicted ? <span style={properties.onTime > 0 ? styles.behind : styles.ahead}>{properties.onTime} min {properties.onTime <= 0 ? 'ahead' : 'behind'}</span>: `` }</p></div>
                        : <div style={styles.prediction}><ScheduleIcon style={styles.predictionIcon}/><p>scheduled location</p></div>}
                </CardActions>
            </Card>
        )
    }
}

export default RealtimeCard;