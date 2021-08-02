const { AuthenticationService, JWTStrategy, AuthenticationBaseStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const { NotAuthenticated } = require('@feathersjs/errors');

class ApiKeyStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication) {
    const { token = '' } = authentication;

    const config = this.authentication.configuration[this.name];

    const match = config.allowedKeys.includes(token);
    if (!match) throw new NotAuthenticated('Incorrect API Key');

    return {
      apiKey: true
    }
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('apiKey', new ApiKeyStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
