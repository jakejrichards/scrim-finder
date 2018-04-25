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
      regionInput: ''
    }
  }

  handlePlayerInputChange = (e) => {
    const { playerInputs } = this.state
    playerInputs[e.target.attributes.player.value] = e.target.value
    this.setState({ playerInputs })
  }

  addPlayerInput = () => {
    const { playerInputs } = this.state
    this.setState({ playerInputs: [ ...playerInputs, '' ] })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { handleScrimFormSubmit } = this.props
    const { playerInputs, titleInput, gameInput, platformInput, regionInput } = this.state
    Meteor.call('scrims.insert', { 
      users: playerInputs, 
      title: titleInput, 
      gameTitle: gameInput, 
      platformValue: platformInput, 
      region: regionInput 
    })
    handleScrimFormSubmit()
  }

  render() {
    const { games } = this.props
    const { playerInputs, titleInput, gameInput, platformInput, regionInput } = this.state
    return (
      <S.Form onSubmit={ this.handleSubmit }>
        <S.Form.Field>
          <label>Title</label>
          <input onChange={ (e) => this.setState({ titleInput: e.target.value })} value={ titleInput } placeholder='2v2 Scrim' />
        </S.Form.Field>
        <S.Form.Group widths='equal'>
          <S.Form.Field>
            <label>Players</label>
            { playerInputs.map((player, i) => (
              <input onChange={ this.handlePlayerInputChange } value={ playerInputs[i] } player={ i } key={ i } style={{ marginBottom: '.5rem' }} placeholder='Player Username' />
            )) }
            <S.Button type='button' onClick={ this.addPlayerInput } style={{ marginTop: '.5rem' }} color='teal' size='small' labelPosition='left' icon='plus' content='Add Player'/>
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
        <S.Button size='large' fluid type='submit'>Submit</S.Button>
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