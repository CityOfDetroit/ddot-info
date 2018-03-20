import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class ServicePicker extends React.Component {
  render() {
    return (
      <RadioButtonGroup name="services" defaultSelected={this.props.currentSvc} onChange={this.props.onChange}>
        {this.props.services.map(s => (
          <RadioButton 
            key={s}
            value={s} 
            label={_.capitalize(s)} />
        ))}
      </RadioButtonGroup>
    );
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;
