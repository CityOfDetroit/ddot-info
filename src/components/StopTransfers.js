import React from 'react';
import List, {ListItem, ListItemText, ListItemIcon} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

import StopInlineLink from './StopInlineLink';
import RouteLink from './RouteLink';
import Helpers from '../helpers';

/** List of nearby stops where you can transfer to other routes by direction for Stop */
class StopTransfers extends React.Component {
  state = {
    open: false
  }

  handleChange = () => {
    this.setState({ open: !this.state.open });
  }
  
  render() {
    const stops = this.props.stops;

    return (
      <div className="transfers">
        <List style={{ paddingTop: 0 }}>
          <ListItem button style={{ background: '#fff' }} onClick={this.handleChange} >
            <ListItemIcon >
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>          
            <ListItemText primary="Nearby transfers" />
          </ListItem>
          <Collapse in={this.state.open} style={{ marginBottom: '.5em', background: 'white' }} timeout="auto" unmountOnExit>
            {Object.keys(this.props.stops).map(s => (
              <div style={{ background: 'white', margin: 10, padding: 10 }}>
                <RouteLink id={s} />
                {stops[s].map(st => (
                  <div style={{ padding: 10 }}>{Helpers.lookup[st[1]]}: <StopInlineLink id={st[2]}/></div>
                ))}
              </div>
            ))}
          </Collapse>
        </List>
      </div>
    );
  }
}

export default StopTransfers;
