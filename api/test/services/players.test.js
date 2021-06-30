const assert = require('assert');
const app = require('../../src/app');

describe('\'players\' service', () => {
  it('registered the service', () => {
    const service = app.service('players');

    assert.ok(service, 'Registered the service');
  });
});
