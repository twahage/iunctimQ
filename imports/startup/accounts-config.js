

AccountsTemplates.configure({
	homeRoutePath:'/home',
	defaultLayout: 'loginLayout',
  	defaultContentRegion: 'main',
  	forbidClientAccountCreation: true,
  	onLogoutHook:function(error,state) {
  		FlowRouter.go('/signin');
  	}
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);

AccountsTemplates._init();
