import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('payment')
export class StripeSubscriptionController {
  constructor(private subscriptionService: StripeService) {}

  @Post('subscribe')
  createSubscriptionSession(
    @Req() request,
    @Body() priceId: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    const subscription = this.subscriptionService.createSubscriptionSession(
      request.user,
      priceId,
    ); // should save it on the db
    console.log(subscription.then((data) => data));
    return subscription;
  }

  @Post('edit-subscription')
  updateSubscription(
    @Body() subscription_id: string,
    order_id?: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    const subscription = this.updateSubscription(subscription_id, order_id);

    return subscription;
  }

  @Post('portal-session')
  updatePlan(
    @Req() request,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.subscriptionService.getPortal('cus_PyiGqH6K26YOMn');
  }

  @Delete('cancel-subscription')
  deleteSubscription(
    @Body() subscription_id: string,
  ): Promise<Stripe.Response<Stripe.Checkout.Session | undefined>> {
    return this.deleteSubscription(subscription_id);
  }
}
