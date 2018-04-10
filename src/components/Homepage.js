import React, { Component } from 'react';

import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';

import NearbyIcon from 'material-ui-icons/MyLocation';
import BusIcon from 'material-ui-icons/DirectionsBus';
import StopIcon from 'material-ui-icons/NaturePeople';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import TopNav from './TopNav';
import RouteSearch from './RouteSearch';
import StopSearch from './StopSearch';
import Nearby from './Nearby';
import Helpers from '../helpers';

/** Top level component for App */
class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: null
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
        {!this.state.open ? 
          <Card>
            <CardHeader title="Welcome to the new DDOT bus schedules page" />
            <CardContent>
              You can browse DDOT routes, look up a stop, or see service near your current location.
            </CardContent>
          </Card> : ``}
        <List 
          style={{ background: '#fff' }}>
          <ListItem key="routes" button onClick={this.handleClick("routes")} style={{ background: this.state.open === "routes" ? Helpers.colors.background : '#fff' }}>
            <ListItemIcon>
              <BusIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText inset primary="Choose your bus" />
            {this.state.open === "routes" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem key="stops" button onClick={this.handleClick("stops")} style={{ background: this.state.open === "stops" ? Helpers.colors.background : '#fff' }}>
            <ListItemIcon>
              <StopIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText inset primary="Find your stop" />
            {this.state.open === "stops" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem key="nearby" button onClick={this.handleClick("nearby")} style={{ background: this.state.open === "nearby" ? Helpers.colors.background : '#fff' }}>
            <ListItemIcon>
              <NearbyIcon style={{ color: '#000' }} />
            </ListItemIcon>
            <ListItemText inset primary="See what's nearby" />
            {this.state.open === "nearby" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
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

export default Homepage;
