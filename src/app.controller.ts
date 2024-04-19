import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StripeService } from './stripe/stripe.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    public stripeService: StripeService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/payment')
  helloStripe(): { apiKey: string; secretKey: string } {
    console.log('stripe fn ==> ', this.stripeService.helloStripe());
    return {
      apiKey: this.stripeService.apiKey,
      secretKey: this.stripeService.appSecret,
    };
  }
}
