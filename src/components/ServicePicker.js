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
      <select className="fw7 f6 pa2 mr2" style={{border: '3px solid #ddd'}} onChange={this.props.onChange}>
        {this.props.services.map(s => (
          <option className="fw5" value={s} key={s}>{_.capitalize(s)}</option>
        ))}
      </select>
    )
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;
