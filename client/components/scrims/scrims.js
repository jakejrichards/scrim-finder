import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'
import moment from 'moment'

import { Scrims } from '../../../imports/collections/scrims'

import ScrimCard from './scrim-card'
import ScrimModal from './scrim-modal'

const games = ['Fortnite', 'Call of Duty']
const platforms = ['Playstation 4', 'Xbox One', 'PC']

class ScrimsComponent extends Component {


  handleScrimClick = ({ title, createdAt, users, platformImg }) => {
    
  }

  render() {
    const { scrims } = this.props
    return (
      <S.Container>
        <S.Header as='h1'>Scrim Finder</S.Header>
        <S.Dropdown text='Filter Games' icon='game' floating labeled button className='icon'>
          <S.Dropdown.Menu>
            <S.Input icon='search' iconPosition='left' className='search' />
            <S.Dropdown.Menu scrolling>
              {games.map((game, i) => <S.Dropdown.Item key={ i }>{ game }</S.Dropdown.Item> )}
            </S.Dropdown.Menu>
          </S.Dropdown.Menu>
        </S.Dropdown>
        <S.Dropdown text='Filter Platforms' icon='desktop' floating labeled button className='icon'>
          <S.Dropdown.Menu>
            <S.Input icon='search' iconPosition='left' className='search' />
            <S.Dropdown.Menu scrolling>
              {platforms.map((platform, i) => <S.Dropdown.Item key={ i }>{ platform }</S.Dropdown.Item> )}
            </S.Dropdown.Menu>
          </S.Dropdown.Menu>
        </S.Dropdown>
        <S.Divider />
        <S.Card.Group itemsPerRow={ 3 }>
          { scrims.map((scrim, i) => (
            <ScrimCard key={ i } handleScrimClick={ this.handleScrimClick } { ...scrim } />
          )) }
        </S.Card.Group>
        <S.Button style={{ marginTop: '2rem' }} color='teal' fluid size='large'>Load More Scrims</S.Button>
      </S.Container>
    )
  }
}

export default withTracker(() => {
  const scrims = Scrims.find({}, { limit: 12 }).fetch()
  return { scrims }
})(ScrimsComponent)