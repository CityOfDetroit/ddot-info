import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';
import BusIcon from 'material-ui-icons/Timeline';
import StopIcon from 'material-ui-icons/DirectionsBus';
import ScheduleIcon from 'material-ui-icons/Schedule';

import NavLinks from './NavLinks.js';

/** Navigation tabs for /route/{#} page */
class RouteHeader extends React.Component {
  constructor(props) {
    super(props);

    switch (this.props.page) {
      case 'schedule':
        this.state = { currentTab: 2 }
        break;
      case 'stops':
        this.state = { currentTab: 1 }
        break;
      default:
        this.state = { currentTab: 0 }
        break;
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ currentTab: value });
  }

  render() {
    const tabs = [
      { label: "Overview", path: `/route/${this.props.number}`, icon: <BusIcon /> },
      { label: "Bus stops", path: `/route/${this.props.number}/stops`, icon: <StopIcon /> },
      { label: "Schedule", path: `/route/${this.props.number}/schedule`, icon: <ScheduleIcon /> },
    ];

    const { currentTab } = this.state;
    
    return (
      <div className="nav header" style={{ background: '#004445' }}>
        <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingLeft: '1rem', paddingRight: '1rem', fontSize: window.innerWidth < 650 ? '1.25em' : '2em' }}>
            <Link style={{ color: '#fff', textDecoration: 'none' }} to={{ pathname: '/' }}>DDOT</Link>
          </div>
          <NavLinks />
        </div>
        <div>
          <Tabs value={currentTab} onChange={this.handleChange} textColor="white" style={{ fontSize: '1.2em' }}>
            {tabs.map(({ label, path, icon }) =>
              <Tab key={label} icon={icon} label={label} component={Link} to={path} style={label !== 'Schedule' ? { borderRight: '.1px solid #fff' } : null}/>
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
