import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { CustomerMock } from './Mock/customer-mock';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public customerService: object;
  constructor(@InjectStripeClient() private stripe: Stripe) {}

  public async createSubscriptionSession(
    user: CustomerMock /* Create mock interface for the user object */,
    priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      return this.stripe.checkout.sessions.create({
        // retrieve success link here: https://dashboard.stripe.com/test/settings/billing/portal
        success_url:
          'https://billing.stripe.com/p/login/test_4gw3cI3K0gAE6wo5kk',
        customer: user.customerId, // it should come from a real
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

  public async customerCreate(
    createCustomerDto: CustomerMock,
  ): Promise<string> {
    const customer = await this.stripe.customers.create(createCustomerDto);

    return customer.id;
  }

  public async getPortal(
    customerId: string,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.stripe.billingPortal.sessions.create({
      customer: customerId,
    });
  }
}
