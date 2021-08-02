/* eslint-disable require-atomic-updates */
const getByDot = require('lodash/get')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { params, app } = context;
    const configuration = app.get('authentication')

    const headerTokenKey = getByDot(configuration, 'apiKey.header', '____')
    const headerToken = getByDot(params, `headers.${headerTokenKey}`, null)
    const paramsTokenKey = getByDot(configuration, 'apiKey.urlParam', '____')
    const paramsToken = getByDot(params, `query.${paramsTokenKey}`, null)
      const token = paramsToken || headerToken || null

    if (token && params.provider && !params.authentication) {
      delete params.query[configuration.apiKey.urlParam]
      context.params = {
        ...params,
        authentication: {
          strategy: 'apiKey',
          token
        }
      };
    }

    return context;
  };
};
