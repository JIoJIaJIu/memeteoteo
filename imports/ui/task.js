import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import {Tasks} from '../api/tasks.js';

import './task.html';

Template.task.helpers({
    isOwner() {
        return this.owner === Meteor.userId()
    }
});

Template.task.events({
    'click .toggle-checked'(event) {
        Meteor.call('tasks.setChecked', this._id, !this.checked);
    },

    'click .toggle-private'(event) {
        Meteor.call('tasks.setPrivate', this._id, !this.private);
    },

    'click .delete'(event) {
        Meteor.call('tasks.remove', this._id);
    },
});
