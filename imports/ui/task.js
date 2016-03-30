import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import {Tasks} from '../api/tasks.js';

import './task.html';

Template.task.events({
    'click .toggle-checked'(event) {
        Meteor.call('tasks.update', this._id, !this.checked);
    },

    'click .delete'(event) {
        Meteor.call('tasks.remove', this._id);
    }
});
