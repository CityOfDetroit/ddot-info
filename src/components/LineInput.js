import React, { Component } from 'react';

class LineInput extends Component {
  render() {
    return (
      <input className='w-25'
                value={this.props.input}
                onChange={this.props.onSearchChange} />
    )
  }
}

export default LineInput;
