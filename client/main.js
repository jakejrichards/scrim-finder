import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Analytics from 'react-router-ga'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import S from 'semantic-ui-react'

import Menu from './components/menu/menu'
import Footer from './components/footer/footer'
import Home from './components/home/home'
import Scrims from './components/scrims/scrims'

const App = () => (
  <Router>
    <Analytics id='UA-118892210-1'>
      <S.Container fluid>
        <Menu />
        <Route exact path='/' component={ Home } />
        <Route path='/scrims' component={ Scrims } />
        <Footer />
      </S.Container>
    </Analytics>
  </Router>
)

Meteor.startup(() => {
  Meteor.subscribe('games')
  Meteor.subscribe('user')
  ReactDOM.render(<App />, document.querySelector('#target'))
})
