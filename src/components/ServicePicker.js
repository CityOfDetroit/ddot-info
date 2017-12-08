import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ServicePicker extends React.Component {
  constructor(props) {
    console.log(props.currentSvc);
    super(props);
    this.state = { selectedOption: props.currentSvc }
  }

  render() {
    return (
      <div className="dib ml3">
        <span className="f3 ml3 fw5">Service Day</span>
        <form>
        {this.props.services.map(s => (
          <div className="dib pa2" key={s}>
            <label className="f3">
            <input
              className="ma2"
              type="radio" 
              name="service" 
              onChange={(e) => {
                this.props.onChange(e);
                this.setState({selectedOption: s});
              }} 
              value={s} 
              checked={this.state.selectedOption === s} 
            />
            {_.capitalize(s)}</label>
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