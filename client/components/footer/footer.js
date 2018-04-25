import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'

const Footer = () => (
  <S.Segment inverted vertical style={{ padding: '5em 0em', marginTop: '2rem' }}>
    <S.Container>
      <S.Grid divided inverted stackable>
        <S.Grid.Row>
          <S.Grid.Column width={3}>
            <S.Header inverted as='h4' content='About' />
            <S.List link inverted>
              <S.List.Item as='a'>Sitemap</S.List.Item>
              <S.List.Item as='a'>Contact Us</S.List.Item>
              <S.List.Item as='a'>Religious Ceremonies</S.List.Item>
              <S.List.Item as='a'>Gazebo Plans</S.List.Item>
            </S.List>
          </S.Grid.Column>
          <S.Grid.Column width={3}>
            <S.Header inverted as='h4' content='Services' />
            <S.List link inverted>
              <S.List.Item as='a'>Banana Pre-Order</S.List.Item>
              <S.List.Item as='a'>DNA FAQ</S.List.Item>
              <S.List.Item as='a'>How To Access</S.List.Item>
              <S.List.Item as='a'>Favorite X-Men</S.List.Item>
            </S.List>
          </S.Grid.Column>
          <S.Grid.Column width={7}>
            <S.Header as='h4' inverted>Footer Header</S.Header>
            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          </S.Grid.Column>
        </S.Grid.Row>
      </S.Grid>
    </S.Container>
  </S.Segment>
)

export default Footer