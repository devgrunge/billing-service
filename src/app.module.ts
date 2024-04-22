import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubscriptionWebhookService } from './stripe/stripe-webhook.service';
import { StripeSubscriptionController } from './stripe/stripe.controller';
import { SubscriptionModule } from './stripe/stripe.module';
import configs from './config';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { UserService } from './user-service/user-service.service';
@Module({
  imports: [
    SubscriptionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('STRIPE_CONFIG'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, StripeSubscriptionController],
  providers: [AppService, StripeService, SubscriptionWebhookService, UserService],
})
export class AppModule {}
