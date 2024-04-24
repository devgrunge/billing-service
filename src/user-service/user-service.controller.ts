import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from 'src/user-service/user-service.service';
import Stripe from 'stripe';

@Controller('user')
export class StripeSubscriptionController {
  constructor(private UserService: UserService) {}
}
