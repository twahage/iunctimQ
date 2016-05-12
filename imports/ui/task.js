import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';

var taskHelpers = {
  isOwner() {
    return this.owner === Meteor.userId();
  },
  owner() {
    return Meteor.users.findOne({_id:this.owner}).username;
  },
  lastAuthor() {
    return Meteor.users.findOne({_id:this.lastAuthor}).username;
  },
  description() {
     return this.description?this.description.trim():"";
  },
  hasPriority(priority) {
    return priority == this.priority?"selected":"";
  },
};
 
Template.task.helpers(taskHelpers);
Template.task_edit.helpers(taskHelpers);


Template.task.events({
  'click .open-edit'() {
    Session.set("currentlyEditedTask",this);
    $("#task_edit").modal("show");
  },
  'click .delete'() {
    var taskId = this._id;
    bootbox.confirm("Are you sure?", function(yes) {
      if(yes) {
        Meteor.call('tasks.remove', taskId);
        Alerts.add('Task has been deleted!', 'success',{autoHide:3000});
      }
    }); 
  },
});

Template.task_edit.events({
  'click .save'() {

    $("#task_edit").modal("hide");

    var title = $("#task_title").val(),
        description = $("#task_description").val(),
        priority = $("#task_priority").val(),
        deadline = $("#task_deadline").val(),
        clockodo = $("#task_clockodo").val(),
        dateRegex = /^\d{4}([./-])\d{2}\1\d{2}$/;

    if(!dateRegex.test(deadline)) {
      Alerts.add("Not a valid Date for deadline!",'danger',{autoHide:3000});
    } else if(!title) {
      Alerts.add("Title is required",'danger',{autoHide:3000});
    } else if(!clockodo) {
      Alerts.add("Clockodo label is required",'danger',{autoHide:3000});
    } else {
      var task = {
        title:title,
        description:description,
        priority:parseInt(priority),
        deadline:new Date(deadline),
        clockodo:clockodo,
      };
      if(this._id) {
        Meteor.call('tasks.update',this._id,task);
        Alerts.add("Task has been updated successfully",
          'success',{autoHide:3000});
      } else {

        Meteor.call('tasks.insert', task,function(error,result) {
          if(!result) {
            Alerts.add("There has been an unknown error. Please try again",
              'danger',{autoHide:3000});
          } else {
            Alerts.add("Task has been added successfully",
              'success',{autoHide:3000});
          }
        });

      }

    }
  }
});