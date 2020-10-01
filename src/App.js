import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Nav from './components/Navbar/nav';
import Home from './components/Home/home';
import Jobs from './components/Jobs/jobs';

function App() {
  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path="/job">
            <Jobs />
          </Route>
          <Route path="/tradesPeople">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
