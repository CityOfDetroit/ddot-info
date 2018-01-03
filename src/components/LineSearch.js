import React, { Component } from 'react';

import LineInput from './LineInput';
import LinesList from './LinesList';
import Schedules from '../data/schedules';

class LineSearch extends Component {
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
    fetch('https://ddot-proxy-test.herokuapp.com/api/where/routes-for-agency/DDOT.json?key=BETA')
      .then(response => response.json())
      .then(d => {
        let sorted = d.data.list.sort((a,b)=>{
          return parseInt(a.id, 10) > parseInt(b.id, 10);
        })
        this.setState({realTime: sorted})
      })
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    this.state.allLines.forEach(ln => {
      if (
          (ln.id.indexOf(val) > -1) || 
          (ln.rt_name.toUpperCase().indexOf(val.toUpperCase()) > -1)) {
        matched.push(ln);
      }
    })

    this.setState({ input: event.target.value, filteredLines: matched });
  }

  render () {
    return (
      <div className="w-50-l w-50-m w-80-s mh3">
        <LineInput input={this.state.input} onSearchChange={this.handleSearchChange} />
        { this.state.filteredLines.length > 0 ? <LinesList lines={this.state.filteredLines} /> : <p><strong>Loading...</strong></p> }
      </div>
    )
  }
}

export default LineSearch;
