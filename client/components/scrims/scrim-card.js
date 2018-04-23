import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

const ScrimCard = ({ title, createdAt, users, platformImg }) => (
  <S.Card>
    <S.Card.Content>
    <S.Image size='mini' floated='right' src={ platformImg } />
      <S.Card.Header>{ title }</S.Card.Header>
      <S.Card.Meta>{ moment(createdAt).fromNow() }</S.Card.Meta>
      <S.Card.Description>
        <S.List>
          { users.map((user, i) => (
            <S.List.Item key={ i }>
              <S.List.Icon name='user' />
              <S.List.Content>
                <S.List.Header>{ user }</S.List.Header>
              </S.List.Content>
            </S.List.Item>
          )) }
        </S.List>
      </S.Card.Description>
    </S.Card.Content>
  </S.Card>
)

ScrimCard.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  users: PropTypes.array,
  platformImg: PropTypes.string
}

export default ScrimCard