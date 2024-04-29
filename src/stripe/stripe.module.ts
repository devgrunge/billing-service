import { Logger, Module } from '@nestjs/common';
import { StripeSubscriptionController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubscriptionWebhookService } from './stripe-webhook.service';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('STRIPE_CONFIG'),
      inject: [ConfigService],
    }),
  ],
  controllers: [StripeSubscriptionController],
  providers: [StripeService, SubscriptionWebhookService, Logger],
})
export class SubscriptionModule {}
