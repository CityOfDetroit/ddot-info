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
      <div class="dib ml3">
        <span class="f3 ml3 fw5">Service Day</span>
        <form>
        {this.props.services.map(s => (
          <div class="dib pa2" key={s}>
            <label class="f3">
            <input
              class="ma2"
              type="radio" 
              name="service" 
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
      </div>
    )
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;