import { Meteor } from 'meteor/meteor';

import "../layout/default.html";
import "../ui/home.js";

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
    	BlazeLayout.render('defaultLayout', { main: "home" });
    }
});
