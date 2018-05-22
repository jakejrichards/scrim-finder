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
import Pool from './components/8s/pool'
import Enter from './components/8s/enter'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route { ...rest } component={ props => (
      loggedIn
      ? <Component { ...props } />
      : <Redirect to='/' />
    )} />
  )
}

const Route8s = ({ loggedIn, in8s, ...rest }) => {
  return (
    <Route { ...rest } component={ props => (
      loggedIn && in8s !== false ?
        in8s ?
          <Pool { ...props } />
        :
          <S.Loader active={ true } />
      :
        <Enter { ...props } />
    )} />
  );
}

const App = ({ loggedIn, in8s }) => (
  <Router>
    <Analytics id='UA-118892210-1'>
      <S.Container fluid>
        <Menu loggedIn={ loggedIn } />
        <Route exact path='/' component={ Home } />
        <Route path='/scrims' component={ Scrims } />
        <Route path='/users/:id' component={ User } />
        <Route8s path='/8s' loggedIn={ loggedIn } in8s={ in8s } />
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
  const in8s = Meteor.user() && Meteor.user() !== null && Meteor.user().in8s;

  return { loggedIn, in8s }
})(App)

Meteor.startup(() => {
  ReactDOM.render(<AppWithTracker />, document.querySelector('#target'))
})
