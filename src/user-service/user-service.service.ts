import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UserDto } from '../types';
import Stripe from 'stripe';
import { RequestOptions } from 'https';

@Injectable()
export class UserService {
  customerService: any;
  constructor(@InjectStripeClient() private stripe: Stripe) {}
  public async userCreate(createUserDto: CreateCustomerDto): Promise<UserDto> {
    // implement userCreate logic
    const customerId = await this.customerService.create({
      email: createUserDto.email,
    });
    return customerId;
  }

  // this method should create a customer in Stripe
  public async customerCreate(
    createCustomerDto: CreateCustomerDto,
  ): Promise<string> {
    // this will return a customer object
    const customer = await this.stripe.customers.create(
      createCustomerDto as RequestOptions,
    );

    return customer.id;
  }
}
