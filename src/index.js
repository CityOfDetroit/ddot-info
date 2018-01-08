import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './css/index.css';
import App from './App';
import About from './components/About';
import LineRealTime from './components/LineRealTime';
import LineSchedule from './components/LineSchedule';

ReactDOM.render(
  <Router basename="/route-explorer">
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/about' component={About} />
      <Route path="/route/:name/real-time" component={LineRealTime} />
      <Route path="/route/:name/schedule" component={LineSchedule} />
    </Switch>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
