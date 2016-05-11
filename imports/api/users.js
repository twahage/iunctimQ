import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find({"roles":{$not: { $in : [ 'admin' ] }}},{ fields:{username:1,emails:1,createdAt:1,roles:1} });
  });

  Accounts.onCreateUser(function(options, user) {
  	user.roles = [options.role];

  	return user;
  });
}

Meteor.methods({
  'users.remove'(userId) {
    check(userId, String);
 
   	if(!Roles.userIsInRole(Meteor.userId(),['admin'])) {
   		throw new Meteor.Error('Users.remove: not-authorized');
   	}

   	Meteor.users.remove(userId);
  },
  'users.insert'(user) {
  	check(user.username, String);
  	check(user.email, String);
  	check(user.role, String);
  	check(user.password, String);

  	// Make sure the user is logged in before inserting a task
  	if(!Roles.userIsInRole(Meteor.userId(),['admin'])) {
  		throw new Meteor.Error('Users.insert: not-authorized');
  	}

  	var userid = Accounts.createUser(user);

  	return userid;
  },
  'users.updateRole'(userId,role) {
  	check(userId, String);
  	check(role, String);

  	if(!Roles.userIsInRole(Meteor.userId(),['admin'])) {
  		throw new Meteor.Error('Users.updateRole: not-authorized');
  	}
  	Roles.setUserRoles(userId, [role]);
  }
});