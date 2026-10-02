const test = require('node:test');
const assert = require('node:assert/strict');
const { isSameConversation } = require('../src/utils/conversationIdentity');

test('isSameConversation matches a selected conversation using either id or _id', () => {
  assert.equal(isSameConversation({ id: 'abc' }, { id: 'abc' }), true);
  assert.equal(isSameConversation({ _id: 'abc' }, { id: 'abc' }), true);
  assert.equal(isSameConversation({ id: 'abc' }, { _id: 'xyz' }), false);
});
