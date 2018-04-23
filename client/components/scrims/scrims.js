import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'
import moment from 'moment'

import ScrimCard from './scrim-card'

const games = ['Fortnite', 'Call of Duty']

const platforms = ['Playstation 4', 'Xbox One', 'PC']

class Scrims extends Component {
  render() {
    return (
      <S.Container>
        <S.Header as='h1'>Find Scrims</S.Header>
        <S.Dropdown text='Filter Games' icon='game' floating labeled button className='icon'>
          <S.Dropdown.Menu>
            <S.Input icon='search' iconPosition='left' className='search' />
            <S.Dropdown.Divider />
            <S.Dropdown.Menu scrolling>
              {games.map((game, i) => <S.Dropdown.Item key={ i }>{ game }</S.Dropdown.Item> )}
            </S.Dropdown.Menu>
          </S.Dropdown.Menu>
        </S.Dropdown>
        <S.Dropdown text='Filter Platforms' icon='desktop' floating labeled button className='icon'>
          <S.Dropdown.Menu>
            <S.Input icon='search' iconPosition='left' className='search' />
            <S.Dropdown.Divider />
            <S.Dropdown.Menu scrolling>
              {platforms.map((platform, i) => <S.Dropdown.Item key={ i }>{ platform }</S.Dropdown.Item> )}
            </S.Dropdown.Menu>
          </S.Dropdown.Menu>
        </S.Dropdown>
        <S.Divider />
        <S.Card.Group>
          <ScrimCard title='2v2 Scrim' createdAt={ new Date() } users={ ['Consistt', 'GuyIsOnline'] } platformImg='https://vignette.wikia.nocookie.net/althistory/images/9/90/Playstation_logo.png/revision/latest?cb=20121215100331' />
        </S.Card.Group>
      </S.Container>
    )
  }
}

export default Scrims