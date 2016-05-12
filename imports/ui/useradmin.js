import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/users.js';
 
import './user.js';
import './useradmin.html';

Template.useradmin.onCreated(function bodyOnCreated() {
  Session.set("currentlyEditedUser",null);
  Meteor.subscribe('users');
});

Template.useradmin.helpers({
  users() {
    return Meteor.users.find({"roles":{$not: { $in : [ 'admin' ] }}},{ sort: { createdAt: -1 } });
  },
  currentlyEditedUser() {
  	return Session.get("currentlyEditedUser");
  }
});

Template.useradmin.events({
  'click .add'() {
    Session.set("currentlyEditedUser",null);
  },
});
