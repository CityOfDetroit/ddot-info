import React, { Component } from 'react';

import RouteInput from './RouteInput';
import RoutesList from './RoutesList';
import Schedules from '../data/schedules';

import Helpers from '../helpers.js';

class RouteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allLines: (Object.values(Schedules)),
      filteredLines: (Object.values(Schedules)),
      realTime: '',
      input: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    fetch(Helpers.proxyUrl + `${Helpers.endpoint}/routes-for-agency/DDOT.json?key=BETA`)
      .then(response => response.json())
      .then(d => {
        let sorted = d.data.list.sort((a,b) => {
          return parseInt(a.id, 10) > parseInt(b.id, 10);
        })
        this.setState({
          realTime: sorted
        })
      })
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    this.state.allLines.forEach(ln => {
      if ((ln.id.indexOf(val) > -1) || (ln.rt_name.toUpperCase().indexOf(val.toUpperCase()) > -1)) {
        matched.push(ln);
      }
    })

    this.setState({ 
      input: event.target.value, 
      filteredLines: matched 
    });
  }

  render() {
    return (
      <div className="pa2">
        <span className="fw7 f3 pa2 white">Search Routes</span>
        <RouteInput input={this.state.input} onSearchChange={this.handleSearchChange} />
        { this.state.filteredLines.length > 0 ? <RoutesList lines={this.state.filteredLines} /> : '' }
      </div>
    )
  }
}

export default RouteSearch;
