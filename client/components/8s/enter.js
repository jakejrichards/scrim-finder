import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import S from 'semantic-ui-react'

const roles = [
    { key: 1, value: 'AR', text: 'AR' },
    { key: 2, value: 'SMG', text: 'SMG' },
    { key: 3, value: 'Flex', text: 'Flex' },
    { key: 4, value: 'Custom', text: 'Custom' },
]

const regions = [
  { key: 1, value: 'NA East', text: 'NA East' },
  { key: 2, value: 'NA West', text: 'NA West' },
  { key: 3, value: 'EU', text: 'EU' },
  { key: 4, value: 'APAC', text: 'APAC' },
  { key: 5, value: 'BR', text: 'BR' },
  { key: 6, value: 'EUNE', text: 'EUNE' },
  { key: 7, value: 'EUW', text: 'EUW' },
  { key: 8, value: 'LAN', text: 'LAN' },
  { key: 9, value: 'LAS', text: 'LAS' },
  { key: 10, value: 'OCE', text: 'OCE' },
  { key: 11, value: 'RU', text: 'RU' },
  { key: 12, value: 'TR', text: 'TR' },
  { key: 13, value: 'JP', text: 'JP' },
  { key: 14, value: 'SEA', text: 'SEA' },
  { key: 15, value: 'KR', text: 'KR' },
  { key: 16, value: 'JP', text: 'JP' },
  { key: 17, value: 'CN', text: 'CN' },
]

class Enter extends Component {
    constructor(props) {
        super(props);
        const { username = '', role = '', region = '', mlg = '', cmg = '', customRole = '' } = this.props.savedPoolInfo

        this.state = { 
            username, region, mlg, cmg, role, customRole,
            usernameError: false, regionError: false, roleError: false 
        };
    }

    handleSubmit = () => {
        const { username, region, role, customRole, mlg, cmg } = this.state
        let usernameError = false, regionError = false, roleError = false
        if (!username) {
            usernameError = true;
        }

        if (!region) {
            regionError = true;
        }

        if (!role || (role === 'Custom' && !customRole)) {
            roleError = true;
        }

        if (usernameError || regionError || roleError) {
            return this.setState({ usernameError, regionError, roleError })
        }

        if (role === 'Custom') {
            return Meteor.call('enter8s', { username, region, role: customRole, mlg, cmg, savedPoolInfo: this.state });
        }

        Meteor.call('enter8s', { username, region, role, mlg, cmg, savedPoolInfo: this.state });

    }

    render() {
        const { username, region, role, customRole, mlg, cmg, usernameError, regionError, roleError } = this.state;
        
        return (
          <S.Container style={{ marginBottom: '7.5rem' }}>
            <S.Form onSubmit={ this.handleSubmit }>
                <S.Grid stackable centered columns={ 1 }>
                    <S.Grid.Column width={12}>
                        <S.Header
                            as='h1'
                            style={{ marginTop: '2rem', marginBottom: '2rem' }}
                            content='Find 8s'
                            subheader='Call of Duty: WWII on PS4' 
                        />
                    </S.Grid.Column>
                    <S.Grid.Column width={12}>
                        <S.Form.Field>
                            <label>Username</label>
                            <S.Form.Input error={ usernameError } onChange={ (e, data) => this.setState({ username: data.value }) } placeholder='Username' value={ username } />
                        </S.Form.Field>
                    </S.Grid.Column>
                    <S.Grid.Column width={12}>
                        <S.Form.Field>
                            <label>Region</label>
                            <S.Select error={ regionError } onChange={ (e, data) => this.setState({ region: data.value }) } value={ region } placeholder='Region' options={ regions } />
                        </S.Form.Field>
                    </S.Grid.Column>
                    <S.Grid.Column width={12}>
                        <S.Form.Field>
                            <label>Role</label>
                            <S.Select error={ roleError } onChange={ (e, data) => this.setState({ role: data.value })} value={ role } placeholder='Role' options={ roles } />
                            { 
                                role === 'Custom' ?
                                    <input onChange={ (e) => this.setState({ customRole: e.target.value }) } value={ customRole } style={{ marginTop: '1rem' }} placeholder='Custom Role' />
                                : ''
                            }
                        </S.Form.Field>
                    </S.Grid.Column>
                    <S.Grid.Column width={12}>
                        <S.Form.Field>
                            <label>MLG Profile Link</label>
                            <input type='text' onChange={ e => this.setState({ mlg: e.target.value }) } value={ mlg } placeholder='http://profile.majorleaguegaming.com/ConsisT-/' />
                        </S.Form.Field>
                    </S.Grid.Column>
                    <S.Grid.Column width={12}>
                        <S.Form.Field>
                            <label>CMG Profile Link</label>
                            <input type='text' onChange={ e => this.setState({ cmg: e.target.value }) } value={ cmg } placeholder='https://www.checkmategaming.com/profile/56663/jjrichar' />
                        </S.Form.Field>
                    </S.Grid.Column>
                    <S.Grid.Column width={12}>
                        <S.Button size='large' floated='right' color='blue'>Join 8s Pool</S.Button>
                    </S.Grid.Column>
                </S.Grid>
            </S.Form>
          </S.Container>
        )
    }
}

export default withTracker(() => {
    const { savedPoolInfo } = Meteor.user();
    return { savedPoolInfo: savedPoolInfo ? savedPoolInfo: {} };
})(Enter);