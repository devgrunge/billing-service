export interface CreateCustomerDto {
  readonly email: string;
  readonly name: string;
  readonly address: string | null;
  readonly balance: number;
  readonly currency: string | null;
  readonly default_source: string | null;
  readonly delinquent: boolean;
  readonly description: string | null;
  readonly discount: any;
  readonly invoice_prefix: string;
  readonly invoice_settings: {
    readonly custom_fields: any;
    readonly default_payment_method: string | null;
    readonly footer: string | null;
    readonly rendering_options: any;
  };
  readonly livemode: boolean;
  readonly metadata: { [key: string]: string };
  readonly phone: string | null;
  readonly preferred_locales: string[];
  readonly shipping: any;
  readonly tax_exempt: string;
  readonly test_clock: any;
}

export interface UserDto {
  id: string | unknown;
  email: string | unknown;
}
