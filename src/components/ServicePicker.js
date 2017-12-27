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
      <div className="dib pa3 v-top">
        <h4 className="mb1">Service Day</h4>
        <form>
        {this.props.services.map(s => (
          <div className="pa1" key={s}>
            <label className="">
            <input
              className="mr2"
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