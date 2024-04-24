import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { CustomerMock } from './Mock/customer-mock';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public customerService: object;
  constructor(@InjectStripeClient() private stripe: Stripe) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  public async getPortal(
    customerId: string,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.stripe.billingPortal.sessions.create({
      customer: customerId,
    });
  }

  public async createSubscriptionSession(
    user: CustomerMock /* Create mock interface for the user object */,
    priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    console.log('user ==>', user);
    try {
      return this.stripe.checkout.sessions.create({
        // retrieve success link here: https://dashboard.stripe.com/test/settings/billing/portal
        success_url:
          'https://billing.stripe.com/p/login/test_4gw3cI3K0gAE6wo5kk',
        customer: 'cus_PyiGqH6K26YOMn' || user.customerId, // it should come from a real
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
      });
    } catch (error) {
      console.error('Error from stripe:', error);
    }
  }

  /* 
  Gets a unique subscription based on the id passed as param
  @Param subscription_id
  @Param metadata : Set of key-value pairs that you can attach to an object. 
  This can be useful for storing additional information about the object in a structured format. 
  Individual keys can be unset by posting an empty value to them. 
  All keys can be unset by posting an empty value to metadata.
  */
  public async updateSubscription(subscription_id: string, order_id?: string) {
    try {
      return this.stripe.subscriptions.update(subscription_id, {
        metadata: {
          order_id: order_id,
        },
      });
    } catch (error) {
      console.error('Error from stripe: ', error);
    }
  }

  /* 
  Gets a unique subscription based on the id passed as param
  @Param subscription_id
  */
  public async getSubscription(subscription_id: string) {
    try {
      return this.stripe.subscriptions.retrieve(subscription_id);
    } catch (error) {
      console.error('Error from stripe: ', error);
    }
  }

  public async deleteSubscription(subscription_id: string) {
    try {
      return this.stripe.subscriptions.cancel(subscription_id);
    } catch (error) {
      console.error('Error from stripe :', error);
    }
  }
}
