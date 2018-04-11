import React from 'react';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs, {Tab} from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Feedback from 'material-ui-icons/Feedback';
import Info from 'material-ui-icons/Info';
import Home from 'material-ui-icons/Home';

import Schedules from '../data/schedules.js';

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
              <div className='white fw7 tc' style={{ display: 'flex', alignItems:'center', justifyContent: 'center', width: '2em', height: '2em', backgroundColor: color }}>
                {this.props.number}
              </div> 
              <div className='white glow ph2'>
                {name}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to={{ pathname: `/about` }}>
              <Info style={{ color: '#fff', paddingRight: '.5em' }} />
            </Link>
            <Link to={{ pathname: `/` }}>
              <Home style={{ color: '#fff', paddingRight: '.5em' }} />
            </Link>
            <a href="https://app.smartsheet.com/b/form/28665a43770d48b5bbdfe35f3b7b45ac" style={{ textDecoration: 'none' }}>
              <Button variant="raised" size="small" style={{ backgroundColor: '#B0D27B', color: '#000' }}>
                Feedback
                <Feedback style={{ color: '#000', marginLeft: '.1em' }} />
              </Button>
            </a>
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
