import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles' 
import PinIcon from '@material-ui/icons/Place';
import BusIcon from '@material-ui/icons/Timeline';
import StopIcon from './BusStop';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
import Nearby from './Nearby';
import Helpers from '../helpers';

const styles = {
  root: {
    fontSize: '1em',
    fontWeight: 700
  }
}

/** Top level component for App */
class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: 'routes'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = key => () => {
    this.setState({ open: this.state.open === key ? null : key });
  }

  render() {
    return (
      <div style={{ background: Helpers.colors.background }}>
        <TopNav />
        <div style={{background: "#B0D27B", padding: '.5em', textAlign: 'center', display: 'flex', fontFamily: 'Gibson Detroit Light', alignItems: 'vertical', justifyContent: 'center', fontSize: '1.2em'}}>
          <span>This is a <b>beta</b> tool, which means we want <a href="https://app.smartsheet.com/b/form/28665a43770d48b5bbdfe35f3b7b45ac">your feedback!</a></span>
        </div>
        <Card>
          <CardHeader title="Welcome to DDOT's new bus schedule tool" />
          <CardContent>
            You can browse bus routes, look up a bus stop, or see service near your current location
          </CardContent>
        </Card>
        <List 
          style={{ background: '#fff' }}>
          <ListItem key="routes" button onClick={this.handleClick("routes")} style={{ background: this.state.open === "routes" ? Helpers.colors.background : '#fff' }}>
            <ListItemIcon style={{ fontSize: 30 }}>
              <BusIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText inset primary="Choose your bus route" />
            {this.state.open === "routes" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem key="stops" button onClick={this.handleClick("stops")} style={{ background: this.state.open === "stops" ? Helpers.colors.background : '#fff' }}>
            <ListItemIcon style={{ fontSize: 30 }}>
              <StopIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText inset primary="Find your bus stop" />
            {this.state.open === "stops" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem key="nearby" button onClick={this.handleClick("nearby")} style={{ background: this.state.open === "nearby" ? Helpers.colors.background : '#fff' }}>
            <ListItemIcon style={{ fontSize: 30 }}>
              <PinIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText inset primary="See what's nearby" />
            {this.state.open === "nearby" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={true} timeout="auto" unmountOnExit>
            {this.state.open === "routes" ? <RouteSearch /> 
              : this.state.open === "stops" ? <StopSearch /> 
                : this.state.open === "nearby" ? <Nearby />
                  : null}
          </Collapse>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Homepage);
