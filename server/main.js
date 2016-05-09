import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
  //Add default admin user
  var adminUser = Meteor.users.findOne({username:"admin"});
  if(adminUser) {
  	console.log(adminUser);
  } else {
  	var adminUserId = Accounts.createUser({
        username: "admin",
        email : "admin@iunctim.com",
        password : "n3J,dw*!"
    });
    Roles.addUsersToRoles(adminUserId, ['admin']);
  }
});
