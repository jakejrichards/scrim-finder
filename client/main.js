import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import S from 'semantic-ui-react'

import Menu from './components/menu/menu'
import Home from './components/home/home'
import Scrims from './components/scrims/scrims'

const App = () => (
  <Router>
    <S.Container fluid>
      <Menu />
      <Route exact path='/' component={ Home } />
      <Route path='/scrims' component={ Scrims } />
      <S.Loader active={ false } size='large'></S.Loader>
    </S.Container>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#target'))
})