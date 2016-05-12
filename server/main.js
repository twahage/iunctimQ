import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';
import '../imports/api/users.js';

Meteor.startup(() => {
  // code to run on server at startup
  //Add default admin user
  var adminUser = Meteor.users.findOne({username:"admin"});
  if(adminUser) {
    //Admin already exists
  } else {
  	var adminUserId = Accounts.createUser({
        username: "admin",
        email : "admin@iunctim.com",
        password : "admin"
    });
    Roles.addUsersToRoles(adminUserId, ['admin']);
  }
});
