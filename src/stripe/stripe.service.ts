import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable, Logger } from '@nestjs/common';
import { CustomerMock } from './Mock/customer-mock';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public customerService: object;
  constructor(
    @InjectStripeClient() private stripe: Stripe,
    private readonly logger: Logger,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.logger = new Logger(StripeService.name);
  }

  /* 
  Creates a session of the customer portal.
  @Param customer: The ID of an existing customer 
  */
  public async getPortal(
    customer: string,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    try {
      return await this.stripe.billingPortal.sessions.create({
        customer,
      });
    } catch (error) {
      this.logger.error(`Error from stripe ${error}`);
    }
  }

  public async createSubscription(
    user: CustomerMock /* Create mock interface for the user object */,
    priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      return await this.stripe.checkout.sessions.create({
        // retrieve success link here: https://dashboard.stripe.com/test/settings/billing/portal
        success_url:
          'https://billing.stripe.com/p/login/test_4gw3cI3K0gAE6wo5kk',
        customer: 'cus_PyiGqH6K26YOMn', // || user.customerId, // it should come from a real customer ID
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
      });
    } catch (error) {
      this.logger.error(`Error from stripe ${error}`);
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
      return await this.stripe.subscriptions.update(subscription_id, {
        metadata: {
          order_id: order_id,
        },
      });
    } catch (error) {
      this.logger.error(`Error from stripe ${error}`);
    }
  }

  /* 
  Gets a unique subscription based on the id passed as param
  @Param subscription_id
  */
  public async getSubscription(subscription_id: string) {
    try {
      return await this.stripe.subscriptions.retrieve(subscription_id);
    } catch (error) {
      console.error('Error from stripe: ', error);
    }
  }

  public async deleteSubscription(subscription_id: string) {
    try {
      return await this.stripe.subscriptions.cancel(subscription_id);
    } catch (error) {
      this.logger.error(`Error from stripe ${error}`);
    }
  }

  /* 
  List all active subscriptions
  */
  public async listSubscriptions() {
    try {
      return await this.stripe.subscriptions.list();
    } catch (error) {
      this.logger.error(`Error from stripe ${error}`);
      throw error;
    }
  }

  public async listProducts() {
    try {
      return await this.stripe.products.list();
    } catch (error) {
      this.logger.error(`Error from stripe: ${error}`);
      throw error;
    }
  }
}
