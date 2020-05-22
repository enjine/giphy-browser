import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store } from './app/store';
import { GiphyBrowser, GiphyDetail } from './features/giphy-browser';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={GiphyBrowser} />
        <Route path="/:id" exact component={GiphyDetail} />
        <Route render={() => (<h1>404 Not Found</h1>)} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
