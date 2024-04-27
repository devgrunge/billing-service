import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Controller('payment')
export class StripeSubscriptionController {
  constructor(private subscriptionService: StripeService) {}

  @Post('subscribe')
  createSubscription(
    @Req() request,
    @Body() priceId: { priceId: string },
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    return this.subscriptionService.createSubscription(
      request.user,
      priceId.priceId,
    );
  }

  @Post('portal-session')
  getPortal(
    @Body() customer: { customer: string },
  ): Promise<Stripe.Response<Stripe | unknown>> {
    return this.subscriptionService.getPortal(customer.customer);
  }

  @Post('edit-subscription')
  updateSubscription(
    @Body() subscription_id: string,
    order_id?: string,
  ): Promise<Stripe.Response<Stripe | unknown>> {
    return this.subscriptionService.updateSubscription(
      subscription_id,
      order_id,
    );
  }

  @Delete('cancel-subscription')
  deleteSubscription(
    @Body() subscription_id: string,
  ): Promise<Stripe.Response<Stripe | unknown>> {
    return this.deleteSubscription(subscription_id);
  }

  @Get('list')
  listSubscriptions(): Promise<any> {
    return this.subscriptionService.listSubscriptions();
  }
}
