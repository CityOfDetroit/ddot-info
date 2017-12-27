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
      <div className="dib ph4 v-mid tl">
        <h4 className="">Service Day</h4>
        <select className="mt2 fw5" onChange={this.props.onChange}>
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