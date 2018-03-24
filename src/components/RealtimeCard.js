import React, { Component } from 'react';
import StaticMap, {Marker} from 'react-map-gl'

import BusIcon from 'material-ui-icons/DirectionsBus'
import LiveIcon from 'material-ui-icons/SpeakerPhone'
import ScheduleIcon from 'material-ui-icons/Schedule'

import { Card, CardHeader, CardContent, AppBar, Toolbar } from 'material-ui';

import {defaultMapStyle} from '../style.js';
import Helpers from '../helpers'
import Stops from '../data/stops'

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
            <Card elevation={3}>
                <CardHeader title={`${properties.direction} ${properties.tripId}`} subheader={`Next stop: ${Stops[properties.nextStop.slice(5,)].name}`} />
                <CardContent>
                    <StaticMap
                        width={300}
                        height={300}
                        latitude={geometry.coordinates[1]}
                        longitude={geometry.coordinates[0]}
                        zoom={14.75}
                        mapStyle={defaultMapStyle}
                        mapboxApiAccessToken={Helpers.mapboxApiAccessToken} 
                        attributionControl={false}
                        >
                        <Marker latitude={geometry.coordinates[1]} longitude={geometry.coordinates[0]}>
                            <BusIcon />
                        </Marker>
                    </StaticMap>
                    {properties.predicted 
                        ? <div style={styles.prediction}>showing<LiveIcon style={styles.predictionIcon}/><p>real-time location</p></div>
                        : <div style={styles.prediction}>showing<ScheduleIcon style={styles.predictionIcon}/><p>scheduled location</p></div>}
                    {properties.predicted 
                        ? <div>running <b style={properties.onTime >= 0 ? styles.ahead : styles.behind}>{Math.abs(properties.onTime)} minutes {properties.onTime <= 0 ? 'ahead of' : 'behind'}</b> schedule</div>
                        : ``}
                </CardContent>
            </Card>
        )
    }
}

export default RealtimeCard;