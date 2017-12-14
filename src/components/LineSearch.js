import React, { Component } from 'react';

import LineInput from './LineInput';
import LinesList from './LinesList';

class LineSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allLines: [],
      filteredLines: [],
      input: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    fetch('https://ddot-proxy-test.herokuapp.com/api/where/routes-for-agency/DDOT.json?key=BETA')
      .then(response => response.json())
      .then(d => {
        let sorted = d.data.list.sort((a,b)=>{
          return parseInt(a.shortName, 10) > parseInt(b.shortName, 10);
        })
        this.setState({ allLines: sorted, filteredLines: sorted });
      })
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    this.state.allLines.forEach(ln => {
      if (
          (ln.shortName.indexOf(val) > -1) || 
          (ln.longName.indexOf(val.toUpperCase()) > -1)) {
        matched.push(ln);
      }
    })

    this.setState({ input: event.target.value, filteredLines: matched });
  }

  render () {
    return (
      <div className="ml4">
        <LineInput input={this.state.input} onSearchChange={this.handleSearchChange} />
        { this.state.filteredLines.length > 0 ? <LinesList lines={this.state.filteredLines} /> : <p><strong>Loading...</strong></p> }
      </div>
    )
  }
}

export default LineSearch;
