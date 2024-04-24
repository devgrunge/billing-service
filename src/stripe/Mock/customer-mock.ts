// Mock interface for the user object
interface User {
  customerId: string;
  name: string;
}

export class CustomerMock {
  public customerId: string;
  public name: string;
  stripe: any;

  public constructor(customerId: string, name: string) {
    this.customerId = 'cus_PyiGqH6K26YOMn';
    this.name = name;
  }
}
