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
    const { scrims, scrimsReady, handleLoadMoreClick } = this.props

    if (scrims.length === 0) {
      return (
        <S.Segment textAlign='center' basic>
          <S.Header style={{ fontStyle: 'italic' }} content='No scrims found.' subheader='Please try changing the scrim filters.' />
        </S.Segment>
      )
    }

    return (
      <div>
        <S.Card.Group stackable itemsPerRow={ 4 }>
          { scrims.map((scrim, i) => (
              <ScrimCard key={ scrim.id } { ...scrim } />
          )) }
        </S.Card.Group>
        { !scrimsReady
        ? <S.Segment basic padded='very'>
            <S.Dimmer active inverted>
              <S.Loader size='medium' />
            </S.Dimmer>
          </S.Segment>
        : <S.Button fluid
            onClick={ handleLoadMoreClick }
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
            color='teal'
            size='large'>Load More Scrims</S.Button>
        }
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
