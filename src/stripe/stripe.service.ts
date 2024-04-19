import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  public appSecret: string;
  public apiKey: string;
  constructor() {
    this.apiKey = process.env.STRIPE_PUBLIC_KEY;
    this.appSecret = process.env.STRIPE_SECRET_KEY;
  }
  public helloStripe(): string {
    console.log(this.apiKey);
    return 'service injected';
  }
}
