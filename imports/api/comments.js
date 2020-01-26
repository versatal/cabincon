import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  Meteor.publish('comments', function gamesPublication() {
    return Comments.find();
  });
}

Meteor.methods({
  'comments.insert'(body, ownerId, commentOf) {
    check(body, String);
    check(ownerId, String);
 
    // Make sure the user is logged in before inserting a game
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Comments.insert({
      body,
      createdAt: new Date(),
      ownerId,
      commentOf
    });
  },

  'comments.remove'(commentId) {
    check(commentId, String);
 
    Comments.remove(commentId);
  },

  'comments.update'(commentId, body) {
    check(commentId, String);
    check(body, String);

    Comments.update(commentId, { 
                 $set: { body },
    });
  },

});