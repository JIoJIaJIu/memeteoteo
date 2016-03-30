import {assert} from 'meteor/practicalmeteor:chai';
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';

import {Tasks} from './tasks.js';

if (Meteor.isServer) {
    describe('Task', function () {
        const userId = Random.id();
        let id;

        beforeEach(function () {
            Tasks.remove({});
            id = Tasks.insert({
                text: 'Empty text',
                createdAt: Date.now(),
                owner: userId,
                username: 'username',
            });
        });

        describe('Methods', function () {
            it('can remove task', function () {
                const deleteMethod = Meteor.server.method_handlers['tasks.remove'];
                const invocation = {userId};

                deleteMethod.apply(invocation, [id]);
                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}
