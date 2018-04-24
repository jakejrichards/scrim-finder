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
  { key: 3, value: 'Global', text: 'Global' }
]

class ScrimForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerInputs: [1]
    }
  }

  addPlayerInput = () => {
    const { playerInputs } = this.state
    this.setState({ playerInputs: [ ...playerInputs, 1 ] })
  }

  render() {
    const { games } = this.props
    console.log(games)
    const { playerInputs } = this.state
    return (
      <S.Form>
        <S.Form.Field>
          <label>Title</label>
          <input placeholder='2v2 Scrim' />
        </S.Form.Field>
        <S.Form.Group widths='equal'>
          <S.Form.Field>
            <label>Players</label>
            { playerInputs.map((player, i) => (
              <input key={ i } style={{ marginBottom: '.5rem' }} placeholder='Player Username' />
            )) }
            <S.Button onClick={ this.addPlayerInput } style={{ marginTop: '.5rem' }} color='teal' size='small' labelPosition='left' icon='plus' content='Add Player'/>
          </S.Form.Field>
          <S.Form.Field>
            <label>Game</label>
            <S.Dropdown placeholder='Game' search selection options={ games.map(game => { 
              return { ...game, text: game.title, value: game.title, key: game.id }
            }) } />
            <label style={{ marginTop: '1rem' }}>Platform</label>
            <S.Select placeholder='Select Platform' options={ platforms }/>
            <label style={{ marginTop: '1rem' }}>Region</label>
            <S.Select placeholder='Select Region' options={ regions }/>
          </S.Form.Field>
        </S.Form.Group>
        <S.Button size='large' fluid type='submit'>Submit</S.Button>
      </S.Form>
    )
  }
}

export default withTracker(() => {
  const games = Games.find({}).fetch()
  return { games }
})(ScrimForm)