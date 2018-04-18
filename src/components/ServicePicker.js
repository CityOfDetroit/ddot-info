import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Radio, {RadioGroup} from 'material-ui/Radio';
import { FormControl, FormControlLabel } from 'material-ui/Form';

/** Service day picker for RouteSchedule */
class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      selectedOption: props.currentSvc 
    }
  }

  render() {
    return (
      <FormControl component="fieldset" required style={{ marginRight: 30 }}>
        <RadioGroup name="serviceDays" value={this.props.currentSvc} onChange={this.props.onChange}>
          {this.props.services.map(s => (
            <FormControlLabel key={s} value={s} control={<Radio/>} label={_.capitalize(s)} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;
