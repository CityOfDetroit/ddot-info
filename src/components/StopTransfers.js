import React from 'react';

import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

import StopInlineLink from './StopInlineLink';
import RouteLink from './RouteLink';

import Helpers from '../helpers';

class StopTransfers extends React.Component {
  state = {
    open: false
  };

  handleChange = () => {
    this.setState({ open: !this.state.open })
  }
  
  render() {
    const stops = this.props.stops
    return (
      <div className="transfers">
        <List style={{paddingTop: 0}}>
          <ListItem button style={{background: '#fff'}} onClick={this.handleChange} >
            <ListItemIcon >
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>          
            <ListItemText primary="Nearby transfers" />
          </ListItem>
          <Collapse in={this.state.open} style={{marginBottom: '.5em', background: 'white'}} timeout="auto" unmountOnExit>
          {Object.keys(this.props.stops).map(s => (
            <div style={{background: 'white', margin: 10, padding: 10}}>
            <RouteLink id={s} />
            {stops[s].map(st => (
              <div style={{padding: 10}}>{Helpers.lookup[st[1]]}: <StopInlineLink id={st[2]}/></div>
            ))}
            </div>
          ))}
          {/* {stops[Object.keys(stops)[this.state.value]].map((t, i) => (
            <p style={{ margin: 0, padding: '.5em' }}>
              {Helpers.lookup[t[1]]}: {<StopInlineLink id={t[2]} />}
            </p>
          ))} */}
          </Collapse>
        </List>
      {/* <AppBar position="static" color="red" style={{display: 'flex'}} elevation={0}>
        <Toolbar>
          <h4 style={{ margin: 0, padding: '.5em' }}>Transfers</h4>
          <Tabs
            onChange={this.handleChange}
            value={this.state.value}
            indicatorColor="red"
            textColor="primary"
            scrollable={Object.keys(stops).length > 5 ? true : false}
            >
            {Object.keys(stops).map((s, i) => (
              <Tab label={<RouteBadge id={s}/>} value={i} style={{minWidth: 40, width: 50}} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Card style={{ padding: '1em' }}>
        <CardHeader component={RouteLink} id={Object.keys(stops)[this.state.value]} />
        {stops[Object.keys(stops)[this.state.value]].map((t, i) => (
          <p style={{ margin: 0, padding: '.5em' }}>
            {Helpers.lookup[t[1]]}: {<StopInlineLink id={t[2]} />}
          </p>
        ))}
      </Card> */}
      </div>
    )
  }
}

export default StopTransfers;
