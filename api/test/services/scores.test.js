const assert = require('assert');
const app = require('../../src/app');

describe('\'scores\' service', () => {
  it('registered the service', () => {
    const service = app.service('scores');

    assert.ok(service, 'Registered the service');
  });
});
