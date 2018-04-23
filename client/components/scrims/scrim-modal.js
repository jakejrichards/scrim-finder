import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

const ScrimModal = () => (
  <S.Modal open>
    <S.Modal.Header>Scrim Modal Header</S.Modal.Header>
  </S.Modal>
)

export default ScrimModal