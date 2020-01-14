import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Search} from './components/Search/Search';
import {Details} from './components/Details/Details';
import {NotFound} from './components/NotFound/NotFound';
import {Layout} from './components/Layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Redirect exact from={'/'} to={'/cars'} />
          <Route exact path={'/cars'} component={Search} />
          <Route exact path={'/cars/:stockNumber'} component={Details} />
          <Route path={'/'} component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

