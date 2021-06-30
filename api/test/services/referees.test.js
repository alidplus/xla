const assert = require('assert');
const app = require('../../src/app');

describe('\'referees\' service', () => {
  it('registered the service', () => {
    const service = app.service('referees');

    assert.ok(service, 'Registered the service');
  });
});
