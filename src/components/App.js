import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import ForgotPassword from './ForgotPassword.js';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{
          minHeight: '100vh'
        }}>
        <div className='w-100' style={{
          maxWidth: '400px'
        }}>
          <BrowserRouter>
            <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <Route path='/resetPwd' component={ForgotPassword}/>
            </Switch>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App;
