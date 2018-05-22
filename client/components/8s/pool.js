import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import S from 'semantic-ui-react'

class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
    }
  }

  handleLeave = () => {
    Meteor.call('leave8s');
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
      })
    } else {
      this.setState({
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      });
    }
  }

  sort = data => {
    const { column, direction } = this.state

    if (direction === 'descending') {
      return _.sortBy(data, [column]).reverse()
    }
    return _.sortBy(data, [column]);
  }

  render() {
      const { column, direction } = this.state
      const { pool } = this.props

      return (
        <S.Container textAlign='center' style={{ minHeight: '50rem' }}>
          <S.Header
              as='h1'
              style={{ marginTop: '2rem', marginBottom: '1rem' }}
              content='Welcome to Scrims Win 8s Finder!'
              subheader='Improve your skills by quickly and easily finding other players to practice against' />
          <S.Button onClick={ this.handleLeave } style={{ marginBottom: '1rem' }} color='red' floated='right'>Leave 8s Pool</S.Button>
          <S.Table sortable celled fixed>
            <S.Table.Header>
              <S.Table.Row>
                <S.Table.HeaderCell sorted={column === 'username' ? direction : null} onClick={this.handleSort('username')}>
                  Username
                </S.Table.HeaderCell>
                <S.Table.HeaderCell sorted={column === 'region' ? direction : null} onClick={this.handleSort('region')}>
                  Region
                </S.Table.HeaderCell>
                <S.Table.HeaderCell sorted={column === 'role' ? direction : null} onClick={this.handleSort('role')}>
                  Role
                </S.Table.HeaderCell>
                <S.Table.HeaderCell>
                  Profile Links
                </S.Table.HeaderCell>
              </S.Table.Row>
            </S.Table.Header>
            <S.Table.Body>
              {_.map(this.sort(pool), ({ username, region, role, mlg, cmg }) => (
                <S.Table.Row key={ username }>
                  <S.Table.Cell>{ username }</S.Table.Cell>
                  <S.Table.Cell>{ region }</S.Table.Cell>
                  <S.Table.Cell>{ role }</S.Table.Cell>
                  <S.Table.Cell>
                    { 
                      mlg ?
                        <S.Button target='_blank' href={ mlg } as='a' color='red' size='tiny'>MLG Profile</S.Button>
                      : ''
                    }
                    {
                      cmg ?
                        <S.Button target='_blank' href={ cmg } as='a' color='blue' size='tiny'>CMG Profile</S.Button>
                      : ''
                    }
                  </S.Table.Cell>
                </S.Table.Row>
              ))}
            </S.Table.Body>
          </S.Table>
        </S.Container>
      )
  }
}

export default withTracker(() => {
    const pool = Meteor.users.find({ in8s: true }).map(user => user.poolInfo)
    return { pool };
})(Pool);