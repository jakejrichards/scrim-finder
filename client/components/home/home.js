import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import S from 'semantic-ui-react'

const games = [
  { title: 'Fortnite', image: 'https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2018/04/fortnite-pc-1024x576-1024x576.jpg' },
  { title: 'WW2', image: 'https://blackfridayhits.com/wp-content/uploads/2017/09/Call-of-Duty-WWII-Black-Friday.jpg' },
  { title: 'CS:GO', image: 'http://esportsjunkie.com/wp-content/uploads/2017/07/CSGO-Logo.jpg' },
  { title: 'Overwatch', image: 'http://i0.kym-cdn.com/entries/icons/original/000/019/337/verwatch.jpg' },
  { title: 'Fortnite', image: 'https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2018/04/fortnite-pc-1024x576-1024x576.jpg' },
  { title: 'WW2', image: 'https://blackfridayhits.com/wp-content/uploads/2017/09/Call-of-Duty-WWII-Black-Friday.jpg' },
  { title: 'CS:GO', image: 'http://esportsjunkie.com/wp-content/uploads/2017/07/CSGO-Logo.jpg' },
  { title: 'Overwatch', image: 'http://i0.kym-cdn.com/entries/icons/original/000/019/337/verwatch.jpg' }
]

const steps = [
  { key: 1, icon: 'game', title: 'Choose Your Game' },
  { key: 2, icon: 'signup', title: 'Post a Scrim' },
  { key: 3, icon: 'line graph', title: 'Improve Your Skills' }
]

const items = [
  { key: 1, label: 'Users', value: '19,850' },
  { key: 2, label: 'Teams', value: '49,610' },
  { key: 3, label: 'Scrims Found', value: '102,940' }
]

class Home extends Component {
  render() {
    return (
      <S.Container textAlign='center'>
        <S.Header as='h1' content='Welcome to Esports Finder' subheader='Improve your skills by quickly and easily finding other players to practice against' />
        <S.Statistic.Group widths='three' items={ items }></S.Statistic.Group>
        <S.Grid container>
          <S.Grid.Row columns={ 1 }>
            <S.Grid.Column>
              <S.Step.Group fluid items={ steps } />
            </S.Grid.Column>
          </S.Grid.Row>
          <S.Grid.Row columns={ 4 }>
            { games.map((game, i) => (
              <S.Grid.Column key={ i } style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                <Link to={ `/game/${ game.title }` }>
                  <S.Card fluid>
                    <S.Image src={ game.image }></S.Image>
                    <S.Card.Content>
                      <S.Card.Header>
                        { game.title }
                      </S.Card.Header>
                    </S.Card.Content>
                  </S.Card>
                </Link>
              </S.Grid.Column>
            )) }
          </S.Grid.Row>
          <S.Grid.Row columns={1}>
            <S.Grid.Column>
              <S.Button color='teal' fluid size='large'>View All Games</S.Button>
            </S.Grid.Column>
          </S.Grid.Row>
        </S.Grid>
      </S.Container>
    )
  }
}

export default Home