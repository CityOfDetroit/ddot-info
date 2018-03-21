import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Radio, {RadioGroup} from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';

class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      selectedOption: props.currentSvc 
    }
  }

  render() {
    return (
      <FormControl component="fieldset" required>
      <RadioGroup value={this.props.currentSvc} onChange={this.props.onChange} style={{width: 140, background: '#fff'}}>
        {this.props.services.map(s => (
          <FormControlLabel value={s} control={<Radio/>} label={_.capitalize(s)} />
        ))}
      </RadioGroup>
      </FormControl>
    )
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;
