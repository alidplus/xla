/* eslint-disable require-atomic-updates */
const getByDot = require('lodash/get')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { params } = context;
    let token = null
    const referer = getByDot(params, `headers.referer`, null)
    const origin = getByDot(params, `headers.origin`, referer)
    if (origin) {
      const q = new URL(origin);
      token = q.hostname
    }
    if (token && params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: 'origin',
          origin: token
        }
      };
    }

    return context;
  };
};
