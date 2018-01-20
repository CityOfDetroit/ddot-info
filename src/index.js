import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import './css/index.css';
import App from './App';
import About from './components/About';
import LineRealTime from './components/LineRealTime';
import LineSchedule from './components/LineSchedule';
import Stop from './components/Stop';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-107915075-4');

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
  <Router basename="/route-explorer">
    <GAListener>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/about' component={About} />
        <Route path='/stop/:name' component={Stop} />
        <Route path="/route/:name/real-time" component={LineRealTime} />
        <Route path="/route/:name/schedule" component={LineSchedule} />
      </Switch>
    </GAListener>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
