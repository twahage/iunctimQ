import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Users } from '../api/users.js';
 
import './user.html';

var helpers = {
  email() {
    if(this.emails && this.emails[0])
      return this.emails[0].address || "";
    else 
      return "";
  },
  role() {
    if(this.roles)
      return this.roles[0] || "";
    else 
      return "";
  },
}
 
Template.user.helpers(helpers);
Template.user_edit.helpers($.extend(helpers, {
  hasRole(role) {
    if(this.roles && this.roles[0] && this.roles[0] === role)
      return "selected";
    else 
      return "";
  },
  disabledDuringEdit() {
    return this._id?"disabled":"";
  }
}));

Template.user.events({
  'click .open-edit'() {
    Session.set("currentlyEditedUser",this);
    $("#user_edit").modal("show");
  },
  'click .delete'() {
    var userId = this._id;
    bootbox.confirm("Are you sure?", function(yes) {
      if(yes) {
        Meteor.call('users.remove', userId);
        Alerts.add('User has been deleted!', 'success',{autoHide:3000});
      }
    }); 
  },
});

Template.user_edit.events({
  'click .save'() {

    $("#user_edit").modal("hide");

    var username = $("#user_username").val(),
        email = $("#user_email").val(),
        role = $("#user_role").val(),
        password = $("#user_password").val(),
        confirmpassword = $("#user_confirmpassword").val(),
        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regex.test(email)) {
      Alerts.add("Not a valid EMail address!",'danger',{autoHide:3000});
    } else if(!username) {
      Alerts.add("Username is required",'danger',{autoHide:3000});
    } else {

      if(this._id) {
        Meteor.call('users.updateRole',this._id,role);
        Alerts.add("User has been updated successfully",
          'success',{autoHide:3000});
      } else {

        if(!password) {
          Alerts.add("Password is required!",'danger',{autoHide:3000});
        } else if(password !== confirmpassword) {
          Alerts.add("Passwords must match!",'danger',{autoHide:3000});
        }

        Meteor.call('users.insert', {
          username:username,
          email:email,
          role:role,
          password:password,
        },function(error,result) {
          if(!result) {
            Alerts.add("There has been an unknown error. Please try again",
              'danger',{autoHide:3000});
          } else {
            Alerts.add("User has been added successfully",
              'success',{autoHide:3000});
          }
        });

      }

    }
  }
})