const assert = require('assert');
const app = require('../../src/app');

describe('\'leagues\' service', () => {
  it('registered the service', () => {
    const service = app.service('leagues');

    assert.ok(service, 'Registered the service');
  });
});
