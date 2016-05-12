import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './home.html';

Template.home.onCreated(function bodyOnCreated() {
  Session.set("currentlyEditedTask",null)
  Meteor.subscribe('tasks');
});
 
Template.home.helpers({
  tasks() {
    return Tasks.find({}, { sort: { sorting: -1 } });
  },
  currentlyEditedTask() {
    return Session.get("currentlyEditedTask");
  }
});

Template.home.events({
  'click .add'() {
    Session.set("currentlyEditedTask",null);
  },
});