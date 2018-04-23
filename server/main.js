import { Meteor } from 'meteor/meteor';
import uuid from 'uuid/v4'

import { Games } from '../imports/collections/games'
import { Scrims } from '../imports/collections/scrims'

const games = ['Fornite Battle Royale', 'Call of Duty WWII']
const platforms = ['ps4', 'xb1', 'pc']
const platformNames = {
  'ps4': 'Playstation 4',
  'xb1': 'Xbox One',
  'pc': 'PC'
}
const platformImages = {
  'ps4': 'https://vignette.wikia.nocookie.net/althistory/images/9/90/Playstation_logo.png/revision/latest?cb=20121215100331',
  'xb1': 'https://png.icons8.com/metro/1600/xbox.png',
  'pc': 'https://cdn1.unrealengine.com/UnrealTournament/3475636/com/epicgames/plugins/clientDownload/logo-epic-cb4399a7ee205610531057537937045e.png'
}

const users = ['Consisttt', 'GuyIsOnline', 'NeverOutslayed']

Meteor.startup(() => {
  
  const gamesCount = Games.find().count()
  if (gamesCount === 0) {
    for (let game of games) {
      for (let platform of platforms) {
        const g = {
          id: uuid(),
          title: game,
          platform: platform,
          platformTitle: platformNames[platform],
          platformImg: platformImages[platform]
        }
        Games.insert(g)
      }
    }
  }

  const scrimsCount = Scrims.find().count()
  if (scrimsCount === 0) {
    for (let i = 0; i < 50; i++) {
      const user1 = users[Math.floor(Math.random()*users.length)]
      const user2 = users[Math.floor(Math.random()*users.length)]
      const [ game ] = Games.aggregate([ { $sample: { size: 1 } } ])
      const scrim = {
        id: uuid(),
        createdAt: new Date(),
        users: [ user1, user2 ],
        title: '2v2 Scrim',
        game
      }
      Scrims.insert(scrim)
    }
  }

});
