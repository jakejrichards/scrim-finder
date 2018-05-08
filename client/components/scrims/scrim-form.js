import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

import { Games } from '../../../imports/collections/games'

const platforms = [
  { key: 1, value: 'ps4', text: 'Playstation 4' },
  { key: 2, value: 'xb1', text: 'Xbox One' },
  { key: 3, value: 'pc', text: 'PC' }
]

const titles = [
  { key: 1, value: '1v1 Scrim', text: '1v1 Scrim' },
  { key: 2, value: '2v2 Scrim', text: '2v2 Scrim' },
  { key: 3, value: '3v3 Scrim', text: '3v3 Scrim' },
  { key: 4, value: '4v4 Scrim', text: '4v4 Scrim' },
  { key: 5, value: '5v5 Scrim', text: '5v5 Scrim' }
]

const expires = [
  { key: 1, value: '5min', text: '5 minutes' },
  { key: 2, value: '15min', text: '15 minutes' },
  { key: 3, value: '30min', text: '30 minutes' },
  { key: 4, value: '45min', text: '45 minutes' },
  { key: 5, value: '1hr', text: '1 hour' },
  { key: 6, value: '2hr', text: '2 hours' },
  { key: 7, value: '3hr', text: '3 hours' },
  { key: 8, value: '6hr', text: '6 hours' },
  { key: 9, value: '12hr', text: '12 hours' },
  { key: 10, value: '24hr', text: '24 hours' }
]

const regions = [
  { key: 1, value: 'NA East', text: 'NA East' },
  { key: 2, value: 'NA West', text: 'NA West' },
  { key: 3, value: 'EU', text: 'EU' },
  { key: 4, value: 'APAC', text: 'APAC' },
  { key: 5, value: 'BR', text: 'BR' },
  { key: 6, value: 'EUNE', text: 'EUNE' },
  { key: 7, value: 'EUW', text: 'EUW' },
  { key: 8, value: 'LAN', text: 'LAN' },
  { key: 9, value: 'LAS', text: 'LAS' },
  { key: 10, value: 'OCE', text: 'OCE' },
  { key: 11, value: 'RU', text: 'RU' },
  { key: 12, value: 'TR', text: 'TR' },
  { key: 13, value: 'JP', text: 'JP' },
  { key: 14, value: 'SEA', text: 'SEA' },
  { key: 15, value: 'KR', text: 'KR' },
  { key: 16, value: 'JP', text: 'JP' },
  { key: 17, value: 'CN', text: 'CN' },
]

class ScrimForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerInputs: [''],
      titleInput: '',
      gameInput: '',
      platformInput: '',
      regionInput: '',
      savedValue: '',
      expiresInput: '',
      save: false,
      playerError: false,
      titleError: false,
      gameError: false,
      platformError: false,
      regionError: false,
      expiresError: false
    }
  }

  handlePlayerInputChange = (e) => {
    const { playerInputs } = this.state
    playerInputs[e.target.attributes.player.value] = e.target.value
    this.setState({ playerInputs })
  }

  addPlayerInput = () => {
    const { playerInputs } = this.state
    if (playerInputs.length < 5) {
      this.setState({ playerInputs: [ ...playerInputs, '' ] })
    }
  }

  removePlayerInput = () => {
    const { playerInputs } = this.state
    if (playerInputs.length > 1) {
      playerInputs.pop()
      this.setState({ playerInputs })
    }
  }

  handleLoginLabelClick = () => {
    Meteor.loginWithTwitter()
    const { handleScrimFormSubmit } = this.props
    handleScrimFormSubmit()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let err = false
    const { handleScrimFormSubmit } = this.props
    const { playerInputs, expiresInput, titleInput, gameInput, platformInput, regionInput, save } = this.state
    let playerError = false, titleError = false, gameError = false, platformError = false, regionError = false, expiresError = false

    if (playerInputs.length === 1 && !playerInputs[0]) {
      playerError = true
    }
    if (!titleInput) {
      titleError = true
    }
    if (!gameInput) {
      gameError = true
    }
    if (!platformInput) {
      platformError = true
    }
    if (!regionInput) {
      regionError = true
    }
    if (!expiresInput) {
      expiresError = true
    }
    this.setState({ playerError, titleError, gameError, platformError, regionError, expiresError })
    if (!(playerError || titleError || gameError || platformError || regionError || expiresError)) {
      Meteor.call('scrims.insert', {
        users: playerInputs,
        title: titleInput,
        gameTitle: gameInput,
        platformValue: platformInput,
        region: regionInput,
        expireTime: expiresInput,
        save
      }, err => {
        if (!err) {
          handleScrimFormSubmit()
        }
      })
    }
  }

  handleSelectSavedScrim = (e, data) => {
    const savedScrim = JSON.parse(data.value)
    const { game, region, title, users } = savedScrim

    this.setState({
      savedValue: data.value,
      playerInputs: users,
      titleInput: title,
      gameInput: game.title,
      platformInput: game.platform.value,
      regionInput: region
    })
  }

  render() {
    const { games } = this.props
    const { playerInputs, expiresInput, titleInput, gameInput, platformInput, regionInput, savedValue, save, playerError, expiresError, titleError, gameError, platformError, regionError } = this.state
    return (
      <S.Form onSubmit={ this.handleSubmit }>
        { !!Meteor.userId() ?
          <S.Form.Field>
            <label>Select A Saved Scrim</label>
            <S.Select
              onChange={ this.handleSelectSavedScrim }
              value={ savedValue }
              placeholder='Select A Saved Scrim'
              options={ Meteor.user().scrims.map(scrim => {
                return { key: scrim.id, value: JSON.stringify(scrim), text: scrim.title }
              }) } />
          </S.Form.Field> : ''
        }
        <S.Form.Group widths='equal'>
          <S.Form.Field error={ playerError }>
            <label>Players</label>
            { playerInputs.map((player, i) => (
              <input onChange={ this.handlePlayerInputChange } value={ playerInputs[i] } player={ i } key={ i } style={{ marginBottom: '.5rem' }} placeholder='Player Username' />
            )) }
            {
              playerInputs.length < 5
              ? <S.Button type='button' onClick={ this.addPlayerInput } style={{ marginTop: '.5rem' }} color='teal' size='mini' labelPosition='left' icon='plus' content='Add Player'/>
              : ''
            }
            {
              playerInputs.length > 1
              ? <S.Button type='button' onClick={ this.removePlayerInput } style={{ marginTop: '.5rem' }} color='red' size='mini' labelPosition='left' icon='minus' content='Remove Player'/>
              : ''
            }
          </S.Form.Field>
          <S.Form.Field>
            <label>Title</label>
            <S.Select error={ titleError } onChange={ (e, data) => this.setState({ titleInput: data.value })} value={ titleInput } placeholder='Scrim Title' options={ titles } />
            <label style={{ marginTop: '1rem' }}>Game</label>
            <S.Dropdown error={ gameError } onChange={ (e, data) => this.setState({ gameInput: data.value })} value={ gameInput } placeholder='Game' search selection options={ games.map((game, i) => {
              return { key: i, value: game, text: game }
            }) } />
            <label style={{ marginTop: '1rem' }}>Platform</label>
            <S.Select error={ platformError } onChange={ (e, data) => this.setState({ platformInput: data.value })} value={ platformInput } placeholder='Select Platform' options={ platforms }/>
            <label style={{ marginTop: '1rem' }}>Region</label>
            <S.Select error={ regionError } onChange={ (e, data) => this.setState({ regionInput: data.value })} value={ regionInput } placeholder='Select Region' options={ regions }/>
            <label style={{ marginTop: '1rem' }}>Expire Time</label>
            <S.Select error={ expiresError } onChange={ (e, data) => this.setState({ expiresInput: data.value }) } value={ expiresInput } placeholder='How long will you be scrimming?' options={ expires } />
          </S.Form.Field>
        </S.Form.Group>
        <S.Form.Field>
        { !!Meteor.userId()
          ? <S.Checkbox color='red' onChange={ () => this.setState({ save: !save }) } checked={ save } slider label='Save scrim for future use' />
          : <S.Label onClick={ this.handleLoginLabelClick } as='a' content='Login to save scrims' color='blue' icon='chevron right' />
        }
        </S.Form.Field>
        <S.Button size='large' fluid type='submit' style={{ marginBottom: '.5rem', marginTop: '.5rem' }}>Submit</S.Button>
        { (playerError || titleError || gameError || platformError || regionError)
        ? <S.Message negative><p>Please fill in the missing fields</p></S.Message> : ''}
      </S.Form>
    )
  }
}

export default withTracker(() => {
  const games = Games.find({}).map(game => game.title)
  const uniqueGames = games.filter((game, index, self) => {
    return self.indexOf(game) == index
  })
  return { games: uniqueGames }
})(ScrimForm)
