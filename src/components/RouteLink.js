import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StopIcon from './BusStop';
import ScheduleIcon from '@material-ui/icons/Schedule';

import routeDetails from '../data/routeDetails.js'
import _ from 'lodash'

/** Linked route number and name with optional icons for RoutesList, NearbyList, StopTransfers and Stop */
class RouteLink extends Component {
  render() {
    const route = _.find(routeDetails, a => { return a.number === parseInt(this.props.id, 10) })
    console.log('Here', route);
    console.log('Id', this.props.id)

    const styles = {
      wrapper: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: '#eee',
      },
      badge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2em',
        height: '2em',
        margin: 5,
        backgroundColor: `${route.color}`,
        borderRadius: route.radius,
        // border: `1px solid ${route.color}`,
        color: '#fff',
        fontSize: '1.25em',
        fontWeight: 700
      },
      name: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        flexGrow: 1,
        marginLeft: 5
      },
      span: {
        fontSize: `1.1em`, 
        fontFamily: "Gibson Detroit Light", 
        fontWeight: 600,
        color: 'black', 
      },
      icons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 60,
        padding: 10
      },
      svg: {
        height: 30,
        color: "#ccc"
      }

    }
    return (
      <div style={styles.wrapper}>
        <div style={styles.badge}>
          <Link
            to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id } }}
            style={{ textDecoration: 'none', color: '#fff' }}>
            {this.props.id}
          </Link>
        </div>
        <div style={styles.name}>
          <Link  
              to={{ pathname: `/route/${this.props.id}`, state: { id: this.props.id } }}
              style={{ textDecoration: 'none' }}>
              <span style={styles.span}>
                {route.name} {this.props.direction ? ` (${this.props.direction})` : ``}
              </span>
          </Link>
        </div>
        {this.props.icons ?
            <div style={styles.icons}>
              <Link aria-label="Stops" to={{ pathname: `/route/${this.props.id}/stops` }}>
                <StopIcon style={styles.svg} />
              </Link>
              <Link aria-label="Schedule" to={{ pathname: `/route/${this.props.id}/schedule` }}>
                <ScheduleIcon style={styles.svg} />
              </Link>
            </div>
          : ``}
      </div>
    );
  }
}

RouteLink.propTypes = {
  id: PropTypes.string.isRequired,
  icons: PropTypes.bool,
}

export default RouteLink;
