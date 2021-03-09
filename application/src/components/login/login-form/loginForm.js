import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { loginUser } from '../../../redux/actions/authActions'

const mapActionsToProps = dispatch => ({
  commenceLogin(email, password) {
    dispatch(loginUser(email, password))
  }
})

// TODO: Make it so logging in waits for the redux to get the values before finish onLogin(). This prevents
// the double log in bug which is occuring because the redux doesn't get the values fast enough before the
// relocation happens.

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  }

  login(e) {
    e.preventDefault();
    this.props.commenceLogin(this.state.email, this.state.password);
    this.props.onLogin();
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input type="text" className="form-control"  placeholder="test@test.com" value={this.state.email} onChange={e => this.onChange('email', e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={e => this.onChange('password', e.target.value)}></input>
        </div>
        <div className="d-flex justify-content-center">
            <button onClick={e => this.login(e)} type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    );
  }
}

export default connect(null, mapActionsToProps)(LoginForm);