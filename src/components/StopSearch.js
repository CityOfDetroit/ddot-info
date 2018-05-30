import React, { Component } from 'react';
import _ from 'lodash';
import { Card, CardHeader, CardContent } from '@material-ui/core/core';

import StopInput from './StopInput';
import StopsList from './StopsList';
import Stops from '../data/stops';

/** Search all stops on Homepage, display three random results at first  */
class StopSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allStops: (Object.values(Stops)),
      filteredStops: (_.sampleSize(Object.values(Stops), 3)),
      enteredInput: false,
      input: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchDebounced = _.debounce(this.handleSearchDebounced, 200);
  }

  handleSearchChange(event) {
    this.setState({ input: event.target.value, enteredInput: true });
    this.handleSearchDebounced(event.target.value);
  }

  handleSearchDebounced(value) {
    if (value.length < 3) {
      return ``
    }

    const matched = []
    let values = value.split(" ")

    Object.values(this.state.allStops).forEach(st => {
      if(values.length > 1) {
        let stopDidMatch = values.every(val => {
          return ( (st.id.indexOf(val) > -1) || (st.name.toUpperCase().indexOf(val.toUpperCase()) > -1) )
        })
        if (stopDidMatch) { 
          matched.push(st) 
        }
      } else {
        if ((st.id.indexOf(value) > -1) || (st.name.toUpperCase().indexOf(value.toUpperCase()) > -1)) {
          matched.push(st);
        }
      }
    })

    this.setState({ filteredStops: matched });
  }

  render() {
    return (
      <Card>
        <CardHeader title="Find your bus stop" subheader="DDOT has more than 5,000 bus stops. Bus stop signs are placed every 2-3 blocks along each route" />
        <CardContent>
          <StopInput input={this.state.input} onSearchChange={this.handleSearchChange} />
          { !this.state.enteredInput ? <div style={{color: '#333', fontSize: '1.2em', marginTop: '1em'}}>Here's a few random bus stops. Start typing in the box above to find your closest stop.</div> : ``}
          { (this.state.input !== '' && this.state.filteredStops.length > 0) ? <div style={{marginTop: '1em'}}>Found {this.state.filteredStops.length} stops</div>: '' }
          { this.state.filteredStops.length > 0 ? <StopsList stops={this.state.filteredStops} dummy={!this.state.enteredInput}/> : <span style={{ color: 'red' }}>No bus stops match your search! Try again</span> }
        </CardContent>
      </Card>
    );
  }
}

export default StopSearch;
