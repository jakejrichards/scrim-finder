import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import S from 'semantic-ui-react'
import moment from 'moment'

const ScrimModal = ({ content, open, onClose }) => { 
  const { title, region, createdAt, users, game } = content
  console.log(content)
  
  if (!open) {
    return null
  }

  return (
    <S.Modal size='small' style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto' }} open={ open } onClose={ onClose }>
      <S.Header as='h2' content={ title } />
      <S.Modal.Content>
        <S.Modal.Description>
          <S.Header as='h3' content={ game.title } subheader={ game.platform.title } />
            <S.List>
            { users.map((user, i) => (
              <S.List.Item key={ i }>
                <S.List.Icon name='user' />
                <S.List.Content>
                  <S.List.Header>{ user }</S.List.Header>
                </S.List.Content>
              </S.List.Item>
            )) }
          </S.List>
        </S.Modal.Description>
      </S.Modal.Content>
    </S.Modal>
  )
}

export default ScrimModal