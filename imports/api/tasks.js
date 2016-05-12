import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    var filter = {};

    if(!Roles.userIsInRole(this.userId,['admin','employer'])) 
      filter = { owner: this.userId };

    return Tasks.find(filter,{ sort: {sorting:-1} });
  });
}

Meteor.methods({
  'tasks.insert'(task) {
    check(task,{
      title:String,
      description:String,
      priority:Number,
      deadline:Date,
      clockodo:String
    });

    task.createdAt =  new Date();
    task.owner = Meteor.userId();
    task.lastAuthor = Meteor.userId();
    task.status = "pending";
    if (Meteor.isServer)
      task.sorting = incrementCounter('countCollection','taskSorting');
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('tasks.insert: not-authorized');
    }

    console.log(task);

    return Tasks.insert(task);
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
 
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('tasks.remove: not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.update'(taskId,task) {
    check(taskId, String);
    check(task,{
      title:String,
      description:String,
      priority:Number,
      deadline:Date,
      clockodo:String
    });

    task.lastAuthor = Meteor.userId();

    const owner = Tasks.findOne(taskId).owner;

    if (owner !== Meteor.userId()) {
      throw new Meteor.Error('tasks.update: not-authorized');
    }

    Tasks.update(taskId,{$set:task});
  }
});