import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'

export default class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [
        {
          path: '/',
          component: Home,
          exact: true
        },
        { 
          path: '/search/:word',
          component: Home
        }
      ]
    }
  }

  render() {
    return (
      <Switch>
        {this.state.routes.map((route, i) => (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
        <Route component={Home} /> {/* Default route */}
      </Switch>
    )
  }
}
