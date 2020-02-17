import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Games = new Mongo.Collection('games');

if (Meteor.isServer) {
  Meteor.publish('games', function gamesPublication() {
    return Games.find();
  });
}

Meteor.methods({
  'games.insert'(text, day) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a game
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Games.insert({
      title: text,
      description: "GM Needed",
      createdAt: new Date(),
      day,
      open: true,
      gameMaster: '',
      players: [],
      longDescription: '',
      maxSeats: 4,
      gameSystem: '',
    });
  },
  'games.remove'(gameId) {
    check(gameId, String);
 
    Games.remove(gameId);
  },
  'games.setClaimed'(gameId) {
    check(gameId, String);
 
    Games.update(gameId, { 
                 $set: { open: false, gameMaster: Meteor.users.findOne(this.userId).username  }
    });
  },
  'games.setAll'(gameId, title, description, longDescription, maxSeats, gameSystem) {
    check(gameId, String);
    check(title, String);
    check(description, String);
    check(longDescription, String);
    check(maxSeats, Number);
    check(gameSystem, String);

    Games.update(gameId, { 
                 $set: { title, description, longDescription, maxSeats, gameSystem },
    });
  },
  'games.unsetClaimed'(gameId) {
    check(gameId, String);
 
    Games.update(gameId, { 
                 $set: { title: "GM Needed", description: "GM Needed", open: true, gameMaster: '', players: [], longDescription: '', maxSeats: 4, gameSystem: '',
                }
    });
  },
  'games.addPlayer'(gameId, player) {
    check(gameId, String);
    check(player, String);

    Games.update(gameId, { 
                 $push: { players: player }
    });
  },
  'games.removePlayer'(gameId, player) {
    check(gameId, String);
    check(player, String);

    Games.update(gameId, { 
                 $pull: { players: player }
    });
  },
});