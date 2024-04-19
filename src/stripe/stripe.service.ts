import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeService {
  public helloStripe() {
    console.log('service injected');
  }
}
