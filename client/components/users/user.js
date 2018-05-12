import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

const userActions = () => (
  <div>
  <S.Label disabled basic as='a' pointing ><S.Icon name='star' />Rate</S.Label>
  <S.Label basic as='a' pointing ><S.Icon name='flag' />Report</S.Label>
  <S.Label basic as='a' pointing ><S.Icon name='envelope' />Message</S.Label>
  </div>
)

class User extends Component {
  render() {
    const { user, userReady } = this.props

    if (!userReady || !user.profile) {
      return (
        <S.Segment basic padded='very'>
          <S.Dimmer active inverted>
            <S.Loader size='medium' />
          </S.Dimmer>
        </S.Segment>
      )
    }

    let accountsExists = false
    for (let platform of Object.keys(user.accounts)) {
      if (user.accounts[platform]) {
        accountsExists = true
        break
      }
    }

    return (
      <S.Container textAlign='left'>
        <S.Header style={{ marginBottom: '1rem', marginTop: '2rem' }} as='h1'>
        <S.Icon name='user' />
          <S.Header.Content>
            { user.profile.name }
            <S.Header.Subheader><S.Rating defaultRating={ 5 } maxRating={5} /> Rating Coming Soon...</S.Header.Subheader>
          </S.Header.Content>
        </S.Header>
        <S.Divider />
        <S.Grid stackable columns={16}>
          <S.Grid.Column width={3}>
          { user.links.length ? user.links.map((link, i) => (
            <S.Button as='a' target='_blank' href={ link.url } key={i} size='large' style={{ marginBottom: '.25rem', backgroundColor: link.color, color: '#fff' }} fluid >
              { link.title }
            </S.Button>
          )) : <S.Header disabled as='h5' style={{ fontStyle: 'italic' }}>No Links Found.</S.Header> }
          </S.Grid.Column>
          <S.Grid.Column width={12}>
            <S.Header as='h2'>Accounts</S.Header>
            <S.List horizontal relaxed>
              { accountsExists ? Object.keys(user.accounts).map(platform => {
                return user.accounts[platform] ? (
                    <S.List.Item style={{ paddingLeft: 0, marginLeft: 0, marginBottom: '1rem' }} key={ platform }>
                      <S.Image size='mini' src={ `/images/${ platform }.png` } />
                      <S.List.Content>
                        <S.List.Header>{ user.accounts[platform] }</S.List.Header>
                      </S.List.Content>
                    </S.List.Item>
                  ) : '' }) : <S.Header disabled as='h5' style={{ fontStyle: 'italic' }}>No Accounts Linked.</S.Header> }
            </S.List>
            <S.Header as='h2'>
              Bio
              <S.Header.Subheader>{ user.bio }</S.Header.Subheader>
            </S.Header>
          </S.Grid.Column>
        </S.Grid>
        <S.Divider style={{ marginTop: '12.5rem' }} hidden />
        <S.Advertisement style={{ maxWidth: '100%' }} centered unit='panorama' test='Your Ad Here!' />
      </S.Container>
    )
  }
}

export default withTracker(props => {
  const { id } = props.match.params
  const user = Meteor.users.findOne({ id })
  const userReady = !!user

  return { user, userReady }
})(User)
