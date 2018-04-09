import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
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
      open: "routes"
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
        <Card className="explainer">
          <CardContent style={{ fontSize: '1.2em' }}>
            <p>Find bus schedules and real-time departure information for DDOT routes and bus stops.</p>
          </CardContent>
        </Card>
        <List subheader={<ListSubheader style={{ fontSize: '1.2em' }}>Start here</ListSubheader>}>
          <ListItem key="routes" button onClick={this.handleClick("routes")}>
            <ListItemIcon>
              <BusIcon />
            </ListItemIcon>
            <ListItemText inset primary="Choose your bus" />
            {this.state.open == "routes" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem key="stops" button onClick={this.handleClick("stops")}>
            <ListItemIcon>
              <StopIcon />
            </ListItemIcon>
            <ListItemText inset primary="Find your stop" />
            {this.state.open == "stops" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem key="nearby" button onClick={this.handleClick("nearby")}>
            <ListItemIcon>
              <NearbyIcon />
            </ListItemIcon>
            <ListItemText inset primary="See what's nearby" />
            {this.state.open == "nearby" ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {this.state.open == "routes" ? <RouteSearch /> 
              : this.state.open == "stops" ? <StopSearch /> 
                : this.state.open == "nearby" ? <Nearby /> 
                  : null}
          </Collapse>
        </List>
      </div>
    );
  }
}

export default Homepage;
