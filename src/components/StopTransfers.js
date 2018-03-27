import React from 'react';
import Card, { CardHeader } from 'material-ui/Card';
import Tabs, {Tab} from 'material-ui/Tabs'
import Toolbar from 'material-ui/Toolbar';
import { AppBar } from 'material-ui';

import StopInlineLink from './StopInlineLink';
import RouteBadge from './RouteBadge'
import RouteLink from './RouteLink';

class StopTransfers extends React.Component {
  
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value })
  }
  
  render() {
    const stops = this.props.stops
    return (
      <div className="transfers">
      <AppBar position="static" color="red" style={{display: 'flex'}} elevation={0}>
        <Toolbar>
          <h4 style={{margin: 0, padding: '.5em'}}>Transfers</h4>
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
      <Card style={{padding: '1em'}}>
        <CardHeader component={RouteLink} id={Object.keys(stops)[this.state.value]} />
        {stops[Object.keys(stops)[this.state.value]].map((t, i) => (
            <p style={{margin: 0, padding: 5}}>
              {t[1]}: {<StopInlineLink id={t[2]} />}
            </p>
        ))}
      </Card>
      </div>
    )
  }
}

export default StopTransfers;
