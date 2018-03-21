import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Radio, {RadioGroup} from 'material-ui/Radio';

class ServicePicker extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      selectedOption: props.currentSvc 
    }
  }

  render() {
    return (
      <RadioGroup value={this.props.currentSvc} onChange={this.props.onChange} style={{width: 140, background: '#fff'}}>
        {this.props.services.map(s => (
          <Radio value={s} primaryText={_.capitalize(s)} />
        ))}
      </RadioGroup>
    )
  }
}

ServicePicker.propTypes = {
  services: PropTypes.array,
  currentSvc: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default ServicePicker;
