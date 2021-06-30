import client from './feathersClient'
import AuthManagementClient from 'feathers-authentication-management/src/client';

export const Authenticate = client.authenticate
export const ReAuthenticate = client.reAuthenticate
export const Logout = client.logout
export const service = client.service
export const AuthManagement = new AuthManagementClient(client);
export const Users = client.service('users')
export const Actions = client.service('actions')
export const Demos = client.service('demos')
export const Contacts = client.service('contacts')
export const Outlets = client.service('outlets')
export const Merchants = client.service('merchants')
export const MerchantsSubscriptions = client.service('merchants/subscriptions')
export const MerchantsSubscriptionPlans = client.service('merchants/subscription/plans')
export const Brands = client.service('brands')
export const Locations = client.service('locations')
export const MenuCategories = client.service('menu-categories')
export const Menus = client.service('menus')
export const MenuSorts = client.service('menu/sort')
export const MenuIO = client.service('menu/io')
export const Orders = client.service('orders')
export const UberOrders = client.service('uber-orders')
export const UberWebhooks = client.service('uber-webhooks')
export const GloveOrders = client.service('glove-orders')
export const Coupons = client.service('coupons')
export const Subroles = client.service('subroles')
export const DeliveryZones = client.service('delivery-zones')
export const EmailSubscriptions = client.service('email-subscriptions')
export const SmsCampaign = client.service('sms-campaign');
export const SmsCampaignActions = client.service('sms-campaign/actions');
export const SmsBalances = client.service('sms-balance');
export const SmsBalancePlans = client.service('sms-balance-plans');
export const SmsContactsDbs = client.service('sms-contacts-dbs');


