const assert = require('assert');
const app = require('../../src/app');

describe('\'matches\' service', () => {
  it('registered the service', () => {
    const service = app.service('matches');

    assert.ok(service, 'Registered the service');
  });
});
