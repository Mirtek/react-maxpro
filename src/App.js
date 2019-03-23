import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/news/">NewsList</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route 
            path="/news/" 
            render={ (props) => <NewsList {...props} newsList={this.state.newsList} /> }
          />
        </div>
      </Router> 
    );
  }
}



export default App;
