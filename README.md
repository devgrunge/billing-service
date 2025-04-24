# Billing Service

This project is a [NestJS](https://nestjs.com/) application that utilizes the [Stripe Node](https://github.com/stripe/stripe-node) library to provide a subscription service through a RESTful API.

## 🚀 Technologies Used

- [NestJS](https://nestjs.com/)
- [Stripe Node](https://github.com/stripe/stripe-node)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devgrunge/billing-service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd billing-service
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## ⚙️ Configuration

Create a `.env` file in the root of the project and add your Stripe credentials:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 🧪 Running the Application

To start the application in development mode:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`.
<!--
## 📄 API Documentation

The API documentation can be accessed via Swagger at:

```
http://localhost:3000/api
```
-->
## 🧪 Testing

To run the tests:

```bash
npm run test
```

## 📌 Features

- Create and manage customers in Stripe
- Create and manage subscription plans
- Subscribe customers to plans
- Cancel subscriptions
- Webhook for Stripe events

## 📁 Project Structure

```
billing-service/
├── src/
│   ├── modules/
│   │   ├── customers/
│   │   ├── subscriptions/
│   │   └── plans/
│   ├── common/
│   └── main.ts
├── test/
├── .env
├── package.json
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
