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
          firstName: 1 
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
});