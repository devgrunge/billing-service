import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('payment')
export class StripeSubscriptionController {
  constructor(private subscriptionService: StripeService) {}

  @Post('subscribe')
  createSubscription(
    @Req() request,
    @Body() priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    return this.subscriptionService.createSubscription(request.user, priceId);
  }

  @Post('portal-session')
  getPortal(
    @Body() customer: string,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.subscriptionService.getPortal(customer);
  }

  @Post('edit-subscription')
  updateSubscription(
    @Body() subscription_id: string,
    order_id?: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    const subscription = this.updateSubscription(subscription_id, order_id);

    return subscription;
  }

  @Delete('cancel-subscription')
  deleteSubscription(
    @Body() subscription_id: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session | undefined>> {
    return this.deleteSubscription(subscription_id);
  }
}
