import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';
import { ConfigModule } from '@nestjs/config';
import configs from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, StripeService],
})
export class AppModule {}
