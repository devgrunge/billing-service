import { Body, Controller, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('stripe')
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

  @Post('portal-session')
  updatePlan(
    @Req() request,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.subscriptionService.getPortal(request.user.customerId);
  }
}
