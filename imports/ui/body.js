import {Template} from 'meteor/templating';

import {Tasks} from '../api/tasks.js';

import './body.html';

Template.body.helpers({
    tasks: Tasks.find({}, {sort: {createdAt: -1}}
});

Template.body.events({
    'submit .new-task'(event) {
        event.preventDefault();

        var target = event.target;
        var text = target.text.value;

        Tasks.insert({
            text: text,
            createdAt: Date.now(),
        })

        target.text.value = '';
    }
});
