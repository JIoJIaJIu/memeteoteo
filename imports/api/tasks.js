import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish('tasks', function () {
        return Tasks.find({
            $or: [{
                private: {$ne: true}
            }, {
                owner: this.userId
            }]
        });
    })
}

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

    'tasks.setChecked'(id, checked) {
        check(id, String);
        check(checked, Boolean);

        const task = Task.findOne(id);

        if (taks.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(id, {
            $set: {
                checked: checked
            }
        })
    },

    'tasks.setPrivate'(id, private) {
        check(id, String);
        check(private, Boolean);

        const task = Tasks.findOne(id);

        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-autorized');
        }

        Tasks.update(id, {
            $set: {
                private: private
            }
        })
    },

    'tasks.remove'(id) {
        check(id, String);

        const task = Tasks.findOne(id);

        if (task.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(id);
    }
});
