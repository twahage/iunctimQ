import { Meteor } from 'meteor/meteor';

import "../layout/default.html";
import "../layout/login.html";
import "../ui/home.js";
import "../ui/menu.js";
import "../ui/atform.js";
import "../ui/useradmin.js";


FlowRouter.route('/', {
    action: function(params, queryParams) {
    	if(Meteor.userId())
    		FlowRouter.go('/home');
        else
        	FlowRouter.go('/signin');
    }
});

FlowRouter.route('/home', {
    action: function(params, queryParams) {
    	BlazeLayout.render('defaultLayout', { main: "home" , menu:"menu"});
    }
});
FlowRouter.route('/useradmin', {
    action: function(params, queryParams) {
    	BlazeLayout.render('defaultLayout', { main: "useradmin" , menu:"menu"});
    }
});
