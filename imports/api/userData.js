import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('userData');

if (Meteor.isServer) {
  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        fields: { 
          isAdmin: 1,
          email: 1,
          firstName: 1,
          avatar: 1,
          forumSignature: 1
        }
      });
    } else {
      this.ready()
    }
  });
}

Meteor.methods({
  'userData.editFirstName'(id, firstName) {
    check(id, String);
    check(firstName, String);

    Meteor.users.update(id, { 
                 $set: { firstName },
    });
  },
  'userData.editAvatar'(id, avatar) {
    check(id, String);
    check(avatar, String);

    Meteor.users.update(id, { 
                 $set: { avatar },
    });
  },
  'userData.editEmail'(id, email) {
    check(id, String);
    check(email, String);

    Meteor.users.update(id, { 
                 $set: { email },
    });
  },
  'userData.editForumSignature'(id, forumSignature) {
    check(id, String);
    check(forumSignature, String);

    Meteor.users.update(id, { 
                 $set: { forumSignature },
    });
  },
});