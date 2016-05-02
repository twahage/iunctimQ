import { Accounts } from 'meteor/accounts-base';

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});

AccountsTemplates._init();

/* 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
*/