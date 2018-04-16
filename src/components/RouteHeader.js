import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';

import Schedules from '../data/schedules.js';
import NavLinks from './NavLinks.js';

/** Navigation for /route/{#} page */
class RouteHeader extends React.Component {
  constructor(props) {
    super(props);

    switch (this.props.page) {
      case 'schedule':
        this.state = {currentTab: 2}
        break;
      case 'stops':
        this.state = {currentTab: 1}
        break;
      default:
        this.state = {currentTab: 0}
        break;
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ currentTab: value });
  }

  render() {
    const tabs = [
      { label: "Overview", path: `/route/${this.props.number}` },
      { label: "Bus stops", path: `/route/${this.props.number}/stops` },
      { label: "Schedule", path: `/route/${this.props.number}/schedule` },
    ];

    const thisRoute = Schedules[this.props.number];
    const color = thisRoute.color;
    const name = thisRoute.rt_name;
    const { currentTab } = this.state;
    
    return (
      <div className="nav header" style={{ background: '#004445' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1em' }}>
          <div>
            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: color, color: '#fff', fontWeight: 'bold' }}>
                {this.props.number}
              </div> 
              <div style={{ color: '#fff', paddingLeft: '.5em', fontSize: '1.5em' }}>
                {name}
              </div>
            </div>
          </div>
          <NavLinks />
        </div>
        <div>
          <Tabs value={currentTab} onChange={this.handleChange} textColor="white" style={{ fontSize: '1.2em' }}>
            {tabs.map(({ label, path }) =>
              <Tab key={label} label={label} component={Link} to={path} style={ label !== 'Schedule' ? { borderRight: '.1px solid #fff' } : null }/>
            )}
          </Tabs>
        </div>
      </div>
    );
  }
}

RouteHeader.propTypes = {
  number: PropTypes.string,
}

export default RouteHeader;
