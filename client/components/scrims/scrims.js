import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'
import qs from 'query-string'
import moment from 'moment'

import { Games } from '../../../imports/collections/games'
import { Scrims } from '../../../imports/collections/scrims'

import ScrimCard from './scrim-card'
import ScrimForm from './scrim-form'
import ScrimModal from './scrim-modal'
import ScrimsList from './scrims-list'

const platforms = [
  { key: 0, value: '', text: 'All Platforms' },
  { key: 1, value: 'ps4', text: 'Playstation 4' },
  { key: 2, value: 'xb1', text: 'Xbox One' },
  { key: 3, value: 'pc', text: 'PC' }
]

const regions = [
  { key: 0, value: '', text: 'All Regions' },
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

class ScrimsComponent extends Component {
  constructor(props) {
    super(props)
    const { scrimsHandle, scrimsReady } = props
    const { game, platform, region } = qs.parse(props.location.search)
    this.state = {
      scrimsCount: 12,
      filterGameTitle: game ? game : '',
      filterPlatformValue: platform ? platform : '',
      filterRegion: region ? region : '',
      formModalOpen: false,
      scrimModalOpen: false,
      scrimModalContent: {}
    }
  }

  handleFormModalButtonClick = (e) => {
    this.setState({ formModalOpen: true })
  }

  handleLoadMoreClick = () => {
    this.setState({ scrimsCount: this.state.scrimsCount + 12 })
  }

  handleScrimClick = (scrimModalContent) => {
    this.setState({ scrimModalContent, scrimModalOpen: true })
  }

  handleScrimFormSubmit = () => {
    this.setState({ formModalOpen: false })
  }

  render() {
    const { games } = this.props
    const { scrimModalContent, scrimModalOpen, formModalOpen, scrimsCount, filterGameTitle, filterPlatformValue, filterRegion } = this.state

    return (
      <S.Container>
        <S.Header
          style={{ marginBottom: '2rem', marginTop: '2rem' }}
          as='h1'
          content='Find Scrims'
          subheader='Seamlessly find and post scrims to improve your skills' />
        <S.Menu stackable borderless style={{ border: 0, boxShadow: 'none' }} widths={6}>
        <S.Menu.Item>
          <S.Select search button fluid
            onChange={ (e, data) => this.setState({ filterGameTitle: data.value, scrimsCount: 12 })}
            value={ filterGameTitle }
            placeholder='Select Game'
            options={ [{ key: -1, value: '', text: 'All Games' }].concat(games.map((game, i) => {
              return { key: i, value: game, text: game }
            })) } />
        </S.Menu.Item>
        <S.Menu.Item>
          <S.Select search button fluid
            onChange={ (e, data) => this.setState({ filterPlatformValue: data.value, scrimsCount: 12 })}
            value={ filterPlatformValue }
            placeholder='Select Platform'
            options={ platforms } />
        </S.Menu.Item>
        <S.Menu.Item>
          <S.Select search button fluid
            onChange={ (e, data) => this.setState({ filterRegion: data.value, scrimsCount: 12 })}
            value={ filterRegion }
            placeholder='Select Region'
            options={ regions } />
        </S.Menu.Item>
        <S.Menu.Item position='right'>
          <S.Button fluid
            color='red'
            content='Post Scrim'
            onClick={ this.handleFormModalButtonClick } />
        </S.Menu.Item>
        </S.Menu>
        <S.Modal size='small' style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto' }} open={ formModalOpen } onClose={ () => this.setState({ formModalOpen: false }) }>
          <S.Modal.Header>Post A Scrim</S.Modal.Header>
          <S.Modal.Content>
            <S.Modal.Description>
              <ScrimForm handleScrimFormSubmit={ this.handleScrimFormSubmit } />
            </S.Modal.Description>
          </S.Modal.Content>
        </S.Modal>
        <S.Divider />
        <ScrimsList
          scrimsCount={ scrimsCount }
          gameTitle={ filterGameTitle }
          platformValue={ filterPlatformValue }
          region={ filterRegion }
          handleLoadMoreClick={ this.handleLoadMoreClick } />
        <ScrimModal open={ scrimModalOpen } content={ scrimModalContent } onClose={ () => this.setState({ scrimModalOpen: false }) } />
        <S.Advertisement style={{ maxWidth: '100%' }} centered unit='panorama' test='Your Ad Here!' />
      </S.Container>
    )
  }
}

export default withTracker(() => {
  const games = Games.find({}).map(game => game.title)
  const uniqueGames = games.filter((game, index, self) => {
    return self.indexOf(game) == index
  })
  return { games: uniqueGames }
})(ScrimsComponent)
