const assert = require('assert');
const app = require('../../src/app');

describe('\'league-participants\' service', () => {
  it('registered the service', () => {
    const service = app.service('league-participants');

    assert.ok(service, 'Registered the service');
  });
});
