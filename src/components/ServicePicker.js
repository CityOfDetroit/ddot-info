import React from 'react';
import PropTypes from 'prop-types';

class ServicePicker extends React.Component {
  constructor(props) {
    console.log(props.currentSvc)
    super(props)
    this.state = {selectedOption: props.currentSvc}
  }

  render() {
    return (
      <form>
      {this.props.services.map(s => (
        <div key={s}>
          <label>
          <input 
            type="radio" 
            name="direction" 
            onChange={(e) => {
              this.props.onChange(e);
              this.setState({selectedOption: s});
              }} 
            value={s} 
            checked={this.state.selectedOption === s} 
          />
          {s}</label>
        </div>
      ))}
      </form>
    )
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;