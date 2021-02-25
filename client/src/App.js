import React from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Spinner } from 'reactstrap';

import { getAuthUser } from './Redux/actions/authActions';

import AppNavbar from './components/AppNavBar';
import Home from './components/pages/Home/Home';
import PrivateRoute from './components/routes/PrivateRoute';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Users from './components/pages/Home/Users'
import SubscribedIn from './components/pages/Home/SubscribedIn';
import Subscribers from './components/pages/Home/Subscribers';



function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);
  const getUser = () => dispatch(getAuthUser());
  const cards = useSelector(state => state.cardReducer.cards)
  const CategoryString = useSelector(state => state.cardReducer.CategoryString)


  let result = []
  if (CategoryString === 'Schools') {
  result = cards.filter(card => card.category === 'Schools')
} else if (CategoryString === 'Training Centers') {
  result = cards.filter(card => card.category === 'Training Centers')
} else if (CategoryString === 'Coworking Spaces') {
  result = cards.filter(card => card.category === 'Coworking Spaces')
} else if (CategoryString === 'Clubs') {
  result = cards.filter(card => card.category === 'Clubs')
} else {
  result = cards
}

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path="/"> <Home result={result}/> </Route>
        <PrivateRoute path="/Users" component={Users}/>
        <PrivateRoute path="/subscribedIn"> <SubscribedIn result={result}/> </PrivateRoute>
        <PrivateRoute path="/subscribers" component={Subscribers}/>
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;