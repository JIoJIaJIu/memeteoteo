import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
            text: text,
            createdAt: Date.now(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        })
    },

    'tasks.update'(id, checked) {
        check(id, String);
        check(checked, Boolean);

        Tasks.update(id, {
            $set: {
                checked: checked
            }
        })
    },

    'tasks.remove'(id) {
        check(id, String);

        Tasks.remove(id);
    }
});
