import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

class ScrimCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      front: true,
      back: false,
      frontLoading: false,
      backLoading: false
    }
  }

  handleFront = (e) => {
    console.log('front')
    e.stopPropagation()
    this.setState({ front: false, frontLoading: true })
  }

  onHideFront = () => {
    console.log('front hide')
    this.setState({ back: true, frontLoading: false })
  }

  handleBack = (e) => {
    console.log('back')
    e.stopPropagation()
    this.setState({ back: false, backLoading: true })
  }

  onHideBack = () => {
    console.log('back hide')
    this.setState({ front: true, backLoading: false })
  }

  render() {
    const { title, region, createdAt, users, game } = this.props
    const { front, back, frontLoading, backLoading } = this.state

    if(front || frontLoading) {
      console.log('1')
      return (
        <S.Transition key={0} onHide={ this.onHideFront } visible={ front } transitionOnMount animation='browse right' duration={ 250 }>
          <S.Card onClick={ this.handleFront }>
            <S.Image src={ game.img } />
            <S.Card.Content>
              <S.Image size='mini' floated='right' src={ game.platform.img } />
              <S.Card.Header>{ title }</S.Card.Header>
              <S.Card.Meta>{ region }</S.Card.Meta>
            </S.Card.Content>
            <S.Card.Content extra><S.Icon name='time' />{ moment(createdAt).fromNow() }</S.Card.Content>
          </S.Card>
        </S.Transition>
      )
    } else if (back || backLoading) {
      console.log('2')
      return (
        <S.Transition key={1} onHide={ this.onHideBack } visible={ back } transitionOnMount animation='browse right' duration={ 250 }>
          <S.Card onClick={ this.handleBack }>
            <S.Card.Content>
            <S.Header content={ title } subheader={ game.title } /> 
            </S.Card.Content>
            <S.Card.Content>
              <S.Card.Meta>Roster</S.Card.Meta>
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
        </S.Transition>
      )
    }
  }
}
ScrimCard.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  users: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired
}

export default ScrimCard