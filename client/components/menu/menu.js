import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'

import AccountsUIWrapper from '../accounts/AccountsUIWrapper'

const Item = ({ to, children }) => (
  <Link to={ to } className='item'>{ children }</Link>
)

class Menu extends Component {
  render() {
    return (
      <S.Menu size='large' fluid borderless>
        <Item to='/' color='teal'>
          <S.Header as='h3'><span style={{ color: '#00b5ad' }}>scrims</span>.<span style={{ color: '#db2828'}}>win</span></S.Header>
        </Item>
        <Item to='/scrims'>Find Scrims</Item>
        <S.Menu.Menu position='right'>
          <S.Menu.Item fitted>
            <AccountsUIWrapper />
          </S.Menu.Item>
        </S.Menu.Menu>
      </S.Menu>
    )
  }
}

export default Menu