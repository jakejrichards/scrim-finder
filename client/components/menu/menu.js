import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'

import AccountsUIWrapper from '../accounts/AccountsUIWrapper'

const Item = ({ to, children, onClick }) => (
  <Link to={ to } onClick={ onClick } className='item'>{ children }</Link>
)

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  open = () => this.setState({ visible: true })
  close = () => this.setState({ visible: false })
  render() {
    const { loggedIn } = this.props
    return (
      <S.Menu size='large' fluid borderless>
        <S.Menu.Item fitted>
          <S.Button style={{ border: 0, boxShadow: 'none' }} basic icon onClick={ this.open }>
            <S.Icon size='large' style={{ margin: 0 }} name='bars' />
          </S.Button>
        </S.Menu.Item>
        <S.Sidebar as={ S.Menu } animation='overlay' visible={ this.state.visible } vertical>
          <S.Menu.Header>
            <S.Button floated='right' style={{ border: 0, boxShadow: 'none' }} basic icon onClick={ this.close }>
              <S.Icon size='large' style={{ margin: 0 }} name='x' />
            </S.Button>
          </S.Menu.Header>
          <Item onClick={ this.close } to='/'>
            <S.Header as='h2'>Scrims Win</S.Header>
          </Item>
          <Item onClick={ this.close } to='/scrims'>Find Scrims</Item>
          <Item onClick={ this.close } to='/8s'>Find 8s</Item>
          { loggedIn ? <Item onClick={ this.close } to='/profile'>My Profile</Item> : '' }
          <S.Menu.Item>
            <AccountsUIWrapper />
          </S.Menu.Item>
        </S.Sidebar>
      </S.Menu>
    )
  }
}

export default Menu
