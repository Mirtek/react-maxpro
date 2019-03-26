import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Profile from './Profile.js'

import NewsList from './NewsList.js';
import Home from './Home.js';

class App extends Component {

   constructor(props) {
    super(props);

    this.state = {
        newsList: {
          1 : {
            "H2" : "First Heading",
            "P" : "First Text"
          },
          2 : {
            "H2" : "Second Heading",
            "P" : "Second Text text"            
          },
          3 : {
            "H2" : "Third Heading",
            "P" : "Third Text text text"            
          },
          4 : {
            "H2" : "Fourth Heading",
            "P" : "Fourth Text text text text"            
          }
        },
    };
  }

  render() {
    return (
      <Router>
        <div>
          <AuthButton/>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/news/">NewsList</Link>
              </li>
              <li>
                <Link to="/profile/">Profile</Link>
              </li>

            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile/" component={Profile} />
          <Route 
            path="/news/" 
            render={ (props) => <NewsList {...props} newsList={this.state.newsList} /> }
          />
          <Route path="/login/" component={Login} />
        </div>
      </Router> 
    );
  }
}



export default App;




const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', value2: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
  }
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  handleSubmit = (event) => {
    if (this.state.value == 'admin' && this.state.value2 == '12345') {
      this.login();
    }
    event.preventDefault();
  }
  handleChangeLogin(event) {
    this.setState({value: event.target.value});
  }
  handleChangePass(event) {
    this.setState({value2: event.target.value});
  }
  render() {
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to='/profile/' />
    }

    return (
      <div><h2>Login page</h2>
      <p>Please sign in</p>
      <form onSubmit={this.handleSubmit}>
      <label htmlFor="login">login<input type="text" value={this.state.value} onChange={this.handleChangeLogin} id="login" name="login" /></label>
      <label htmlFor="password">pass<input type="text" id="password" value={this.state.value2} onChange={this.handleChangePass} name="pass" /></label>
      <input type="submit" value="Log in" />
      </form>
      </div>
    );
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))