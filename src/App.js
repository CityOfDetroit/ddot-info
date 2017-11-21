import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TopNav from './components/TopNav';

class Line extends Component {
  render() {
    return (
      <li className="ph3 pv2 bb b--light-silver">
        <span className='bg-dark-green white fw7 f5 w2 pv2 tc dib'>
          {this.props.short.replace(/^[0]{1,}/, '')}
        </span> 

        <span className='tr pl1 f6 fw5 pl2'>
          <Link to={`/${this.props.short}-${this.props.long}`}>{this.props.long}</Link>
        </span>
      </li>
    )
  }
}

class LineInput extends Component {
  render() {
    return (
        <input className='w-25'
               value={this.props.input}
               onChange={this.props.onSearchChange} />
    )
  }
}

class LinesList extends Component {
  render() {
    return (
      <ul className="list pl0 ml0 w-25 ba b--light-silver br3 ma2 vh-75 overflow-scroll">
        {this.props.lines.map(line =>
          <Line key={line.shortName} short={line.shortName} long={line.longName} />
        )}
      </ul>
    )
  }
}

class LineSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allLines: [],
      filteredLines: [],
      input: ''
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount() {
    fetch('https://ddot-proxy-test.herokuapp.com/api/where/routes-for-agency/DDOT.json?key=BETA')
      .then(response => response.json())
      .then(d => {
        let sorted = d.data.list.sort((a,b)=>{
          return parseInt(a.shortName) > parseInt(b.shortName)
        })
        this.setState({ allLines: sorted, filteredLines: sorted })
      })
  }

  handleSearchChange(event) {
    const val = event.target.value
    const matched = []

    this.state.allLines.forEach(ln => {
      if (
          (ln.shortName.indexOf(val) > -1) || 
          (ln.longName.indexOf(val.toUpperCase()) > -1)) {
        matched.push(ln)
      }
    })

    this.setState({ input: event.target.value })
    this.setState({ filteredLines: matched })
  }

  render () {
    return (
      <div className="lineSearch">
        <LineInput input={this.state.input} onSearchChange={this.handleSearchChange} />
        <LinesList lines={this.state.filteredLines} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <LineSearch />
      </div>
    );
  }
}

export default App;
