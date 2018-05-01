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

const regions = [
  { key: 1, value: 'NA East', text: 'NA East' }, 
  { key: 2, value: 'NA West', text: 'NA West' },
  { key: 3, value: 'EU', text: 'EU' },
  { key: 4, value: 'Global', text: 'Global' }
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
      save: false
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
    const { handleScrimFormSubmit } = this.props
    const { playerInputs, titleInput, gameInput, platformInput, regionInput, save } = this.state
    Meteor.call('scrims.insert', { 
      users: playerInputs, 
      title: titleInput, 
      gameTitle: gameInput, 
      platformValue: platformInput, 
      region: regionInput,
      save
    })
    handleScrimFormSubmit()
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
    const { playerInputs, titleInput, gameInput, platformInput, regionInput, savedValue, save } = this.state
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
        <S.Form.Field>
          <label>Title</label>
          <input onChange={ (e) => this.setState({ titleInput: e.target.value })} value={ titleInput } placeholder='2v2 Scrim (max characters - 25)' />
        </S.Form.Field>
        <S.Form.Group widths='equal'>
          <S.Form.Field>
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
            <label>Game</label>
            <S.Dropdown onChange={ (e, data) => this.setState({ gameInput: data.value })} value={ gameInput } placeholder='Game' search selection options={ games.map((game, i) => {
              return { key: i, value: game, text: game }
            }) } />
            <label style={{ marginTop: '1rem' }}>Platform</label>
            <S.Select onChange={ (e, data) => this.setState({ platformInput: data.value })} value={ platformInput } placeholder='Select Platform' options={ platforms }/>
            <label style={{ marginTop: '1rem' }}>Region</label>
            <S.Select onChange={ (e, data) => this.setState({ regionInput: data.value })} value={ regionInput } placeholder='Select Region' options={ regions }/>
          </S.Form.Field>
        </S.Form.Group>
        <S.Form.Field>
        { !!Meteor.userId() 
          ? <S.Checkbox color='red' onChange={ () => this.setState({ save: !save }) } checked={ save } slider label='Save scrim for future use' />
          : <S.Label onClick={ this.handleLoginLabelClick } as='a' content='Login to save scrims' color='blue' icon='chevron right' />
        }
        </S.Form.Field>
        <S.Button size='large' fluid type='submit' style={{ marginBottom: '.5rem', marginTop: '.5rem' }}>Submit</S.Button>
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