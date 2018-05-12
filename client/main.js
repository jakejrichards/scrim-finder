import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Analytics from 'react-router-ga'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import 'semantic-ui-css/semantic.css'
import S from 'semantic-ui-react'

import Menu from './components/menu/menu'
import Footer from './components/footer/footer'
import Home from './components/home/home'
import Scrims from './components/scrims/scrims'
import User from './components/users/user'
import Profile from './components/users/profile'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route { ...rest } component={ props => (
      loggedIn
      ? <Component { ...props } />
      : <Redirect to='/' />
    )} />
  )
}

const App = ({ loggedIn }) => (
  <Router>
    <Analytics id='UA-118892210-1'>
      <S.Container fluid>
        <Menu loggedIn={ loggedIn } />
        <Route exact path='/' component={ Home } />
        <Route path='/scrims' component={ Scrims } />
        <Route path='/users/:id' component={ User } />
        <PrivateRoute path='/profile' loggedIn={ loggedIn } component={ Profile } />
        <Footer />
      </S.Container>
    </Analytics>
  </Router>
)

const AppWithTracker = withTracker(() => {
  Meteor.subscribe('games')
  Meteor.subscribe('user')
  Meteor.subscribe('users')
  const currentUser = Meteor.user()
  const loggedIn = Meteor.userId() && currentUser !== null
  return { loggedIn }
})(App)

Meteor.startup(() => {
  ReactDOM.render(<AppWithTracker />, document.querySelector('#target'))
})
