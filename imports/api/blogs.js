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
  'blogs.insert'(title, body, ownerId, category) {
    check(title, String);
    check(body, String);
    check(ownerId, String);
    check(category, String)
 
    // Make sure the user is logged in before inserting a game
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Blogs.insert({
      title,
      body,
      createdAt: new Date(),
      ownerId,
      category
    });
  },

  'blogs.remove'(blogId) {
    check(blogId, String);
 
    Blogs.remove(blogId);
  },

  'blogs.update'(blogId, title, body, category) {
    check(blogId, String);
    check(title, String);
    check(body, String);
    check(category);

    Blogs.update(blogId, { 
                 $set: { title, body, category },
    });
  },

});