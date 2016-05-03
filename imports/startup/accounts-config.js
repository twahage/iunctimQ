AccountsTemplates.configure({
	homeRoutePath:'/home',
	defaultLayout: 'defaultLayout',
  	defaultContentRegion: 'main',
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/signup'
});

AccountsTemplates._init();
