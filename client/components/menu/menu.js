import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'

const Item = ({ to, children }) => (
  <Link to={ to } className='item'>{ children }</Link>
)

class Menu extends Component {
  render() {
    return (
      <S.Menu size='large' fluid borderless>
        <Item to='/'>
          <S.Header>Esports Finder</S.Header>
        </Item>
        <Item to='/players'>Find Players</Item>
        <Item to='/scrims'>Find Scrims</Item>
        <S.Menu.Menu position='right'>
          <S.Menu.Item>
            <S.Button>Login</S.Button>
          </S.Menu.Item>
          <S.Menu.Item>
            <S.Button color='teal'>Sign Up</S.Button>
          </S.Menu.Item>
        </S.Menu.Menu>
      </S.Menu>
    )
  }
}

export default Menu