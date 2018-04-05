import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';

import Schedules from '../data/schedules.js';
import ChevronSVG from '../img/chevron.svg';
import Info from '../img/info_outline.svg';

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
      { label: "Route", path: `/route/${this.props.number}` },
      { label: "Stops", path: `/route/${this.props.number}/stops` },
      { label: "Schedule", path: `/route/${this.props.number}/schedule` },
    ];

    const thisRoute = Schedules[this.props.number];
    const color = thisRoute.color;
    const name = thisRoute.rt_name;
    const { currentTab } = this.state;
    
    return (
      <div className="nav header" style={{ background: '#004445' }}>
        <div className="pa3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: window.innerWidth < 650 ? '1em' : '1.5em' }}>
          <div>
            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-start' }}>
              <Link className="link dim pr3" to={{ pathname: `/` }}>
                <img src={ChevronSVG} className="" alt="Back to home" />
              </Link>
              <div className='white fw7 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: color }}>
                {this.props.number}
              </div> 
              <div className='white glow ph2'>
                {name}
              </div>
            </div>
          </div>
          <div>
            <Link className="link dim pr3" to={{ pathname: `/about` }}>
              <img src={Info} alt="Info" />
            </Link>
          </div>
        </div>
        <div>
          <Tabs value={currentTab} onChange={this.handleChange} textColor="white" style={{ fontSize: '1.2em' }}>
            {tabs.map(({ label, path }) => 
              <Tab key={label} label={label} component={Link} to={path} />
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
