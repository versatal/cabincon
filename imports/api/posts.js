import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });

}

Meteor.methods({
  'posts.insert'(text, type, title, subTopicOf, postedIn, replyTo) {
    check(text, String);
    check(type, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      createdAt: new Date(),
      text,
      type,
      title,
      replyTo,
      subTopicOf,
      postedIn,
      ownerId: this.userId,
      owner: Meteor.users.findOne(this.userId).username,
    });
  },

  'posts.remove'(postId) {
    check(postId, String);
 
    Posts.remove(postId);
  },  
});