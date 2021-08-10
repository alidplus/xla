const { AuthenticationService, JWTStrategy, AuthenticationBaseStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const { NotAuthenticated } = require('@feathersjs/errors');

class OriginStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication) {
    const { origin = '' } = authentication;

    const config = this.authentication.configuration[this.name];
    const match = config.allowedOrigins.map(a => new RegExp(a)).reduce((acc, regex) => acc || regex.test(origin), false);

    if (!match) throw new NotAuthenticated('Incorrect Origin');

    return {
      origin
    }
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('origin', new OriginStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
