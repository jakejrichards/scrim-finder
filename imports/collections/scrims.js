import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import uuid from 'uuid/v4'

export const Scrims = new Mongo.Collection('scrims')

const ScrimSchema = new SimpleSchema({
  id: {
    type: String,
    label: "Scrim unique ID"
  },
  createdAt: {
    type: Date,
    label: "Scrim post time"
  },
  title: {
    type: String,
    label: "Scrim title"
  },
  region: {
    type: String,
    label: 'Scrim region'
  },
  game: {
    type: Object
  },
  'game.platform': {
    type: Object
  },
  'game.platform.value': {
    type: String,
    label: 'Platform abbreviation'
  },
  'game.platform.title': {
    type: String,
    label: 'Platform Title'
  },
  'game.platform.img': {
    type: String,
    label: 'Platform Image'
  },
  users: {
    type: Array
  },
  'users.$': {
    type: String,
    label: "Username"
  }
})
Scrims.attachSchema(ScrimSchema)

Meteor.methods({
  'scrims.insert'({ title, gameTitle, platformValue, region, users }) {
    check(title, String)
    check(gameTitle, String)
    check(platformValue, String)
    check(region, String)
    check(users, Array)

    const game = Games.findOne({ title: gameTitle, 'platform.value': platformValue }, { fields: { title: 1, platform: 1 } })
    if (!game) {
      throw new Meteor.Error('Game could not be found')
    }

    console.log(game)

    const scrim = {
      id: uuid(),
      createdAt: new Date(),
      title, game, platform, region, users
    }

    console.log(scrim)

  }
})