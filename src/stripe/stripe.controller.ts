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
    return this.subscriptionService.createSubscriptionSession(
      request.user,
      priceId,
    );
  }

  @Post('portal-session')
  updatePlan(
    @Req() request,
    @Body()
    customerId: string /* Should be removed, the customer id must be taken from the request */,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    console.log('entrei aqui ==> ', customerId);
    return this.subscriptionService.getPortal(request.user.customerId);
  }
}
