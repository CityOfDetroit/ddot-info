import React, { Component } from 'react';

import StopInput from './StopInput';
import StopsList from './StopsList';
import Stops from '../data/stops';

class StopSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allStops: (Stops),
      filteredStops: (Stops),
      input: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    Object.values(this.state.allStops).forEach(st => {
      if ((st.name.toUpperCase().indexOf(val.toUpperCase()) > -1)) {
        matched.push(st);
      }
    })

    this.setState({ 
      input: event.target.value, 
      filteredStops: matched 
    });
  }

  render() {
    return (
      <div className="pa2">
        <span className="fw7 f3 pa2">Search Stops</span>
        <StopInput input={this.state.input} onSearchChange={this.handleSearchChange} />
        { this.state.input.length > 0 ? <StopsList stops={this.state.filteredStops} /> : '' }
      </div>
    )
  }
}

export default StopSearch;
