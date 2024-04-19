import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StripeService],
})
export class AppModule {}
