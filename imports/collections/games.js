import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import uuid from 'uuid/v4'

export const Games = new Mongo.Collection('games')

const GameSchema = new SimpleSchema({
  id: {
    type: String,
    label: "Unique game ID"
  },
  title: {
    type: String,
    label: "Game title"
  },
  img: {
    type: String,
    label: "Game's image path"
  },
  platform: {
    type: Object,
  },
  'platform.value': {
    type: String,
    label: 'Platform abbreviation'
  },
  'platform.title': {
    type: String,
    label: 'Platform Title'
  },
  'platform.img': {
    type: String,
    label: 'Platform Image'
  }
})

Games.attachSchema(GameSchema)