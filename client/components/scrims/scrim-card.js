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
    e.stopPropagation()
    this.setState({ front: false, frontLoading: true })
  }

  onHideFront = () => {
    this.setState({ back: true, frontLoading: false })
  }

  handleBack = (e) => {
    e.stopPropagation()
    this.setState({ back: false, backLoading: true })
  }

  onHideBack = () => {
    this.setState({ front: true, backLoading: false })
  }

  onClickShare = (e) => {
    e.stopPropagation()
    const { title, region, createdAt, users, game } = this.props
    let tweet = `${title}\n${ game.platform.value.toUpperCase() } - ${ game.title }\nRegion - ${ region }\nRoster - `
    let usersStr = ''
    users.forEach(user => {
      usersStr += user + ', '
    })
    tweet += usersStr
    tweet = tweet.substring(0, tweet.length - 2)
    tweet += '\n\nvia @scrimswin http://scrims.win'
    tweet = encodeURI(tweet)
    window.open('https://twitter.com/intent/tweet?text=' + tweet, '_blank')
  }

  render() {
    const { title, region, createdAt, users, game, expiresAt } = this.props
    const { front, back, frontLoading, backLoading } = this.state

    if(front || frontLoading) {
      return (
        <S.Transition key={0} onHide={ this.onHideFront } visible={ front } transitionOnMount animation='browse right' duration={ 200 }>
          <S.Card onClick={ this.handleFront }>
            <div style={{ height: '10rem', backgroundPosition: 'center center', backgroundSize: 'cover', backgroundImage: `url(${game.img})` }}></div>
            <S.Card.Content>
              <S.Image size='mini' floated='right' src={ game.platform.img } />
              <S.Card.Header style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{ title.substring(0, 25) }</S.Card.Header>
              <S.Card.Meta>{ region }</S.Card.Meta>
            </S.Card.Content>
            <S.Card.Content extra>
              <S.Icon name='time' />expires { moment(expiresAt).fromNow() }
              <S.Label size='small' color='blue' onClick={ this.onClickShare } attached='bottom right'>
                <S.Icon name='share' />
                Share
              </S.Label>
            </S.Card.Content>
          </S.Card>
        </S.Transition>
      )
    } else if (back || backLoading) {
      return (
        <S.Transition key={1} onHide={ this.onHideBack } visible={ back } transitionOnMount animation='browse right' duration={ 200 }>
          <S.Card onClick={ this.handleBack }>
            <S.Card.Content>
              <S.Image size='mini' floated='right' src={ game.platform.img } />
              <S.Card.Header style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{ title.substring(0, 25) }</S.Card.Header>
              <S.Card.Meta>{ game.title }</S.Card.Meta>
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
