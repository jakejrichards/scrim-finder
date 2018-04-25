import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

const ScrimCard = ({ title, region, createdAt, users, game, handleScrimClick }) => (
  <S.Transition transitionOnMount animation='horizontal flip' duration={ 250 }>
    <S.Card onClick={ () => handleScrimClick({ title, region, createdAt, users, game }) }>
      <S.Image src={ 'https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2018/04/fortnite-pc-1024x576-1024x576.jpg' } />
      <S.Card.Content>
        <S.Image size='mini' floated='right' src={ game.platform.img } />
        <S.Card.Header>{ title }</S.Card.Header>
        <S.Card.Meta>{ region }</S.Card.Meta>
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
      <S.Card.Content extra><S.Icon name='time' />{ moment(createdAt).fromNow() }</S.Card.Content>
    </S.Card>
  </S.Transition>
)

ScrimCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  users: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired,
  handleScrimClick: PropTypes.func.isRequired
}

export default ScrimCard