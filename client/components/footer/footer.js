import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'

const Footer = () => (
  <S.Segment inverted vertical style={{ padding: '5em 0em', marginTop: '2rem' }}>
    <S.Container>
      <S.Grid divided inverted stackable>
        <S.Grid.Row>
          <S.Grid.Column width={3}>
            <S.Header inverted as='h4' content='Follow Us' />
            <S.List link inverted>
              <S.List.Item as='a' target='_blank' href='https://twitter.com/esportsfinder'>Twitter</S.List.Item>
            </S.List>
          </S.Grid.Column>
          <S.Grid.Column width={7}>
            <S.Header as='h4' inverted>Scrims Win Information</S.Header>
            <p>For business inquiries please contact<br/>jake@scrims.win</p>
            <p>Copyright ScrimsWin 2018. All Rights Reserved.</p>
          </S.Grid.Column>
        </S.Grid.Row>
      </S.Grid>
    </S.Container>
  </S.Segment>
)

export default Footer