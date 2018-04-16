import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/index.css';
import App from './App';
import About from './components/About';
import RouteRealtime from './components/RouteRealtime';
import RouteSchedule from './components/RouteSchedule';
import RouteStops from './components/RouteStops';
import BusRoute from './components/BusRoute'
import Stop from './components/Stop';
import Nearby from './components/Nearby';
import TransitCenter from './components/TransitCenter';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme} from 'material-ui/styles';


import ReactGA from 'react-ga';
ReactGA.initialize('UA-107915075-4');

const muiTheme = createMuiTheme({
  typography: {
    fontFamily:
      'Gibson Detroit Regular' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  },
  overrides: {
    MuiRadio: {
      checkedSecondary: {
        color: '#004445'
      },
    },
    MuiFormLabel: {
      focused: {
        color: '#004445',
      },
    },
    MuiCardContent: {
      root: {
        paddingTop: '0em'
      }
    },
    MuiPaper: {
      elevation2: {
        boxShadow: 'none'
      }
    },
    MuiIconButton: {
      root: {
        height: '24px'
      }
    },
    MuiTableRow: {
      root: {
        height: '24px',
      },
      head: {
        height: '24px',
      },
    },
    // MuiInput: {
    //   root: {
    //     padding: 5,
    //     background: 'rgba(0,40,10,0.1)',
    //     border: '1px solid black'
    //   }
    // },
    MuiTableCell: {
      root: {
        padding: '4px 24px 4px 24px',
        maxWidth: '90px'
      },
      head: {
        padding: '4px 0 4px 0',
        textAlign: 'center',
        '&:last-child': {
          paddingRight: 0,
        },
      },
    },
  },
});

class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <GAListener>
      <MuiThemeProvider theme={muiTheme}>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/about' component={About} />
          <Route path='/nearby' component={Nearby} />
          <Route path='/stop/rosa-parks-tc' component={TransitCenter} />
          <Route path='/stop/:name' component={Stop} />
          <Route path="/route/:name/real-time" component={RouteRealtime} />
          <Route path="/route/:name/schedule" component={RouteSchedule} />
          <Route path="/route/:name/stops" component={RouteStops} />
          <Route path='/route/:name' component={BusRoute} />
        </Switch>
      </MuiThemeProvider>
    </GAListener>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
