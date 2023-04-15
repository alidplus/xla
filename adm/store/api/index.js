import client from './feathersClient'
import AuthManagementClient from 'feathers-authentication-management/src/client';

export const Authenticate = client.authenticate
export const ReAuthenticate = client.reAuthenticate
export const Logout = client.logout
export const service = client.service
export const AuthManagement = new AuthManagementClient(client);


