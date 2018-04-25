import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import S from 'semantic-ui-react'

import { Scrims } from '../../../imports/collections/scrims'

import ScrimCard from './scrim-card'

class ScrimsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { scrims, scrimsReady, handleScrimClick, handleLoadMoreClick } = this.props

    return (
      <div>
        <S.Card.Group itemsPerRow={ 4 }>
          { scrims.map((scrim, i) => (
              <ScrimCard key={ scrim.id } handleScrimClick={ handleScrimClick } { ...scrim } />
          )) }
        </S.Card.Group>
        <S.Button fluid
          onClick={ handleLoadMoreClick } 
          style={{ marginTop: '2rem', marginBottom: '2rem' }} 
          color='teal'
          size='large'>Load More Scrims</S.Button>
      </div>      
    )
  }
}

export default withTracker(({ scrimsCount = 12, gameTitle = '', platformValue = '', region = '' }) => {
  const scrimsHandle = Meteor.subscribe('scrims', scrimsCount, gameTitle, platformValue, region)
  const scrims = Scrims.find({}, { sort: { createdAt: -1 } }).fetch()
  const scrimsReady = !!scrimsHandle.ready() && !!scrims

  return { scrims, scrimsHandle, scrimsReady }
})(ScrimsList)