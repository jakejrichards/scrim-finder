import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import uuid from 'uuid/v4'

import { Games } from './games'

export const Scrims = new Mongo.Collection('scrims')

const times = {
  '5min': 300,
  '15min': 900,
  '30min': 1800,
  '45min': 2700,
  '1hr': 3600,
  '2hr': 7200,
  '3hr': 10800,
  '6hr': 21600,
  '12hr': 43200,
  '24hr': 86400
}

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
  expiresAt: {
    type: Date,
    label: 'Scrim expires at this time'
  },
  game: {
    type: Object
  },
  'game.id': {
    type: String
  },
  'game.title': {
    type: String,
  },
  'game.img': {
    type: String
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
  'scrims.insert'({ title, expireTime, gameTitle, platformValue, region, users, save }) {
    check(title, String)
    check(gameTitle, String)
    check(platformValue, String)
    check(region, String)
    check(users, Array)
    check(expireTime, String)

    if (!(expireTime in times)) {
      throw new Meteor.Error('Not a valid expiration input')
    }
    let expiresAt = new Date()
    expiresAt = new Date(expiresAt.getTime() + (times[expireTime] * 1000))

    const game = Games.findOne({ title: gameTitle, 'platform.value': platformValue }, { fields: { title: 1, img: 1, platform: 1, id: 1 } })
    if (!game) {
      throw new Meteor.Error('Game could not be found')
    }

    const scrim = {
      id: uuid(),
      createdAt: new Date(),
      title,
      game,
      region,
      expiresAt,
      users
    }

    if (save) {
      Meteor.users.update(this.userId, { $push: { scrims: { ...scrim, expireTime } } })
    }

    Scrims.insert(scrim)
  }
})
