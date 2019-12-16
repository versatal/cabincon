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
  'posts.insert'(text) {
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.insert({
      createdAt: new Date(),
      text
    });
  },
});