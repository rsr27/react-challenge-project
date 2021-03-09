import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth != null 
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const AppRouter = (props) => {
  console.log('props', props);
  return (
    <Router>
      <Route path="/" exact component={Main} />
	  <Route path='/login' exact component={Login} />
	  <GuardedRoute path='/order' exact component={OrderForm} auth={props.auth.token} />
	  <GuardedRoute path='/view-orders' exact component={ViewOrders} auth={props.auth.token} />
    </Router>
  );
}

export default connect(mapStateToProps, null) (AppRouter);
