import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import './css/app.css';
import App from './App';
import About from './components/About';
import RouteRealtime from './components/RouteRealtime';
import RouteSchedule from './components/RouteSchedule';
import RouteStops from './components/RouteStops';
import BusRoute from './components/BusRoute'
import Stop from './components/Stop';
import Nearby from './components/Nearby';
import SystemMap from './components/SystemMap'

import ReactGA from 'react-ga';
ReactGA.initialize('UA-107915075-4');

const muiTheme = createMuiTheme({
  typography: {
    fontFamily:
      'Gibson Detroit Regular' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  },
  palette: {
    primary: {
      main: '#B0D27B',
    }
  },
  // eg https://material-ui-next.com/customization/themes/#properties
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiTouchRipple: {
      root: {
        display: 'none',
        '&$focused': {
          display: 'none'
        },
        '&$touched': {
          display: 'none'
        }
      }
    },
    MuiIconButton: {
      root: {
        width: '24px',
        height: '24px',
        padding: '.2em'
      }
    },
    MuiTabScrollButton: {
      root: {
        flex: '0 0 0'
      }
    },
    MuiRadio: {
      colorSecondary: {
        color: '#004445',
        '&$checked': {
          color: '#004445'
        }
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        color: '#004445',
        '&$checked': {
          color: '#004445',
        }
      }
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: '#000'
        }
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          backgroundColor: '#000',
          height: '2px'
        },
        '&:after': {
          backgroundColor: '#b0d27b'
        },
      }
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
    MuiTableRow: {
      root: {
        height: '24px'
      },
      head: {
        height: '24px'
      },
    },
    MuiListItemText: {
      primary: {
        fontSize: '1.25em',
        fontFamily: 'Gibson Detroit Light',
        fontWeight: 700
      }
    },
    MuiTableCell: {
      root: {
        padding: '4px 24px 4px 24px',
        maxWidth: '90px'
      },
      head: {
        padding: '4px 0 4px 0',
        textAlign: 'center',
        '&:last-child': {
          paddingRight: 0
        },
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: '#eee'
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
          <Route path='/system' component={SystemMap} />
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
