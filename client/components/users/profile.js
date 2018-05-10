import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

class Profile extends Component {
  state = {
    user: this.props.user,
    linkError: '',
    success: '',
    error: ''
  }

  handleBioChange = (e, { name, value }) => {
    const prevState = this.state
    const nextState = {
      ...prevState,
      user: {
        ...prevState.user,
        bio: value
      }
    }
    this.setState(nextState)
  }

  handleAccountChange = (e, { name, value }) => {
    const prevState = this.state
    const nextState = {
      ...prevState,
      user: {
        ...prevState.user,
        accounts: {
          ...prevState.user.accounts,
          [name] : value
        }
      }
    }
    this.setState(nextState)
  }

  handleLinkChange = (e, { name, value }, i) => {
    const { links } = this.state.user
    links[i][name] = value
    const prevState = this.state
    const nextState = {
      ...prevState,
      user: {
        ...prevState.user,
        links: [ ...links ]
      }
    }
    this.setState(nextState)
  }

  handleAddLink = () => {
    const { links } = this.state.user
    if (links.length > 0 && !links[links.length - 1].title && !links[links.length - 1].url && !links[links.length - 1].color) {
      this.setState({ linkError: 'Please fill in the missing fields.' })
      return
    }
    const prevState = this.state
    const nextState = {
      ...prevState,
      user: {
        ...prevState.user,
        links: [
          ...prevState.user.links,
          {
            title: '',
            url: '',
            color: ''
          }
        ]
      }
    }
    this.setState(nextState)
  }

  handleRemoveLink = () => {
    const { links } = this.state.user
    links.pop()
    const prevState = this.state
    const nextState = {
      ...prevState,
      user: {
        ...prevState.user,
        links: [ ...links ]
      }
    }
    this.setState(nextState)
  }

  handleSave = (e) => {
    e.preventDefault()
    const { bio, accounts, links } = this.state.user

    Meteor.call('updateProfile', { bio, accounts, links }, (err, result) => {
      if (err) {
        console.log(err.error)
        return this.setState({ error: err.error })
      }
      this.setState({ success: 'Successfully saved your profile!' })
    })
  }

  render() {
    const { user, linkError, success, error } = this.state

    if (!user || !user.accounts) {
      return (
        <S.Segment basic padded='very'>
          <S.Dimmer active inverted>
            <S.Loader size='medium' />
          </S.Dimmer>
        </S.Segment>
      )
    }

    let accountsExists = false
    for (let a in user.accounts) {
      if (user.accounts[a])
        accountsExists = true
        break
    }

    console.log(error)

    return (
      <S.Container textAlign='left'>
        <S.Header style={{ marginBottom: '1rem', marginTop: '2rem' }} as='h1'>
        <S.Icon name='user' />
          <S.Header.Content>
            { user.profile.name }
            <S.Header.Subheader><S.Rating disabled defaultRating={ 5 } maxRating={5} /> Rating Coming Soon...</S.Header.Subheader>
          </S.Header.Content>
        </S.Header>
        <S.Divider />
        <S.Form onSubmit={ this.handleSave } size='tiny'>
        <S.Grid stackable columns={16}>
          <S.Grid.Column width={16}>
            <S.Header as='h2'>
              Bio
            </S.Header>
            <S.Form.TextArea onChange={ this.handleBioChange } value={ user.bio } />
            <S.Header as='h2'>Accounts</S.Header>
            <S.Form.Group widths={7}>
              <S.Form.Input name='xb1' onChange={ this.handleAccountChange } label='Xbox One' value={ user.accounts.xb1 } />
              <S.Form.Input name='ps4' onChange={ this.handleAccountChange } label='Playstation 4' value={ user.accounts.ps4 } />
              <S.Form.Input name='epicgames' onChange={ this.handleAccountChange } label='Epic Games' value={ user.accounts.epicgames } />
              <S.Form.Input name='lol' onChange={ this.handleAccountChange } label='League of Legends' value={ user.accounts.lol } />
              <S.Form.Input name='steam' onChange={ this.handleAccountChange } label='Steam' value={ user.accounts.steam } />
              <S.Form.Input name='battlenet' onChange={ this.handleAccountChange } label='Battlenet' value={ user.accounts.battlenet } />
              <S.Form.Input name='uplay' onChange={ this.handleAccountChange } label='Uplay' value={ user.accounts.uplay } />
            </S.Form.Group>
            <S.Header as='h2'>Links</S.Header>
            { user.links.length > 0 ? user.links.map((link, i) => (
              <S.Form.Group style={{ marginBottom: '2rem' }} key={i} widths={7}>
                <S.Form.Input name='title' onChange={ (e, data) => this.handleLinkChange(e, data, i) } placeholder={ 'Twitter' } label='Title' value={ link.title } />
                <S.Form.Input name='url' onChange={ (e, data) => this.handleLinkChange(e, data, i) } placeholder={ 'http://twitter.com/scrimswin' } label='Link' value={ link.url } />
                <S.Form.Input name='color' onChange={ (e, data) => this.handleLinkChange(e, data, i) } placeholder={ '#1DA1F2' } label='Color' value={ link.color } />
              </S.Form.Group>
            )) : '' }
            <S.Message visible={ !!linkError } size='tiny' onDismiss={ () => this.setState({ linkError: '' }) } content={ linkError } error />
            <S.Divider hidden />
            { user.links.length < 8 ? <S.Button type='button' color='teal' onClick={ this.handleAddLink } labelPosition='left' icon='plus' content='Add Link'/> : '' }
            { user.links.length > 0 ? <S.Button type='button' color='red' onClick={ this.handleRemoveLink } labelPosition='left' icon='minus' content='Remove Link'/> : '' }
            <S.Divider hidden />
            <S.Divider />
            <S.Message visible={ !!success } size='small' onDismiss={ () => this.setState({ success: '' }) } info content={ success } />
            <S.Message visible={ !!error } size='small' onDismiss={ () => this.setState({ error: '' }) } error content={ error } />
            <S.Button color='blue' content='Save' size='big' fluid />
          </S.Grid.Column>
        </S.Grid>
        </S.Form>
        <S.Divider style={{ marginTop: '10rem' }} hidden />
        <S.Advertisement style={{ maxWidth: '100%' }} centered unit='panorama' test='Your Ad Here!' />
      </S.Container>
    )
  }
}

export default withTracker(props => {
  const user = Meteor.users.findOne({ _id: Meteor.userId() })
  return { user }
})(Profile)
