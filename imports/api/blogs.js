import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Blogs = new Mongo.Collection('blogs');

if (Meteor.isServer) {
  Meteor.publish('blogs', function blogsPublication() {
    return Blogs.find();
  });
}

Meteor.methods({
  'blogs.insert'(title, body, ownerId) {
    check(title, String);
    check(body, String);
    check(ownerId, String);
 
    // Make sure the user is logged in before inserting a game
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Blogs.insert({
      title,
      body,
      createdAt: new Date(),
      ownerId
    });
  },

  'blogs.remove'(blogId) {
    check(blogId, String);
 
    Blogs.remove(blogId);
  },

  'blogs.update'(blogId, title, body) {
    check(blogId, String);
    check(title, String);
    check(body, String);

    Blogs.update(blogId, { 
                 $set: { title, body },
    });
  },

});