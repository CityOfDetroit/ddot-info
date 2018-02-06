import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      selectedOption: props.currentSvc 
    }
  }

  render() {
    return (
      <div className="dib pa2">
        <select className="fw5 f4" onChange={this.props.onChange}>
          {this.props.services.map(s => (
            <option className="fw5" value={s} key={s}>{_.capitalize(s)}</option>
          ))}
        </select>
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
