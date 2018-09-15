import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from '../Home'
import TicketDetails from '../TicketDetails'

import './index.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path ='/' component={Home} />
          <Route path ='/ticket-details' component={TicketDetails} />
        </Switch>
      </Router>
    )
  }
}

export default App
