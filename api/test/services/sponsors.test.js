const assert = require('assert');
const app = require('../../src/app');

describe('\'sponsors\' service', () => {
  it('registered the service', () => {
    const service = app.service('sponsors');

    assert.ok(service, 'Registered the service');
  });
});
