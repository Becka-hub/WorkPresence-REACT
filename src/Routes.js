import React,{useEffect} from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Result from './pages/Result';
import NotFoundPage from './pages/NotFoundPage';

const Routes = () => {
  let history = useHistory();
  let location = useLocation();


  useEffect(() => {
    if (!localStorage.getItem('token') && location.pathname === "/dashboard") {
        history.push('/');
    }
}, [location.pathname,history])

useEffect(() => {
  if (localStorage.getItem('token') && (location.pathname === "/" || location.pathname === "/result/:email/:mdp")) {
      history.push('/dashboard');
  }
}, [location.pathname,history])

  return (
        <Switch location={location} key={location.pathname}>
          <Route exact path='/' component={Home} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/result/:email/:mdp' component={Result} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
  )
}

export default Routes