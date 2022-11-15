import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import ListProductForm from './components/listProductForm/ListProductForm';
import ItemDetailsPage from './components/ItemDetialsPage'
import EditItemForm from './components/EditItemForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/sign-in' exact={true}>
          <div className='sign-up-forms-wrapper'>
            <LoginForm />
            <SignUpForm />
          </div>
        </Route>
        <Route path='/list-product' exact={true}>
          <ListProductForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
        </Route>
        <Route exact path="/items/:itemId/edit-item">
          <EditItemForm />
        </Route>
        <Route path="/items/:itemId">
          <ItemDetailsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
