# Description

Networth-tracker is a RESTful backend service built with Node.js, Express, and MongoDB that helps shopkeepers (kirana stores, tailors, hardware shops, etc.) manage credit sales, track repayments, and get alerts for overdue payments.

# Prerequisites

Node.js v16 or higher

npm (comes with Node.js)

MongoDB Atlas

## Setup & Run Locally

Clone the repository

`git clone https://github.com/mounikalingala/crediKhaata-networth-tracker
cd networth-tracker`

# Install dependencies

npm install

Create a .env file in the project root with:

`PORT=3005
MONGO_URI=mongodb+srv://mounika:mounika@cluster0.vufwwqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=SecretJWTKey`

### Start the server

nodemon index.js

The API will be running at `http://localhost:3005/api.`

# Dependencies

- express

- mongoose

- bcryptjs

- jsonwebtoken

- dotenv

- moment

# Environment Variables

| Key           | Description                                   |
| ------------- | --------------------------------------------- |
| `PORT`        | Port number for the server (default: 5000)    |
| `MONGO_URI`   | MongoDB connection string                     |
| `JWT_SECRET`  | Secret used to sign JSON Web Tokens (JWTs)    |

# API Endpoints

All protected routes require an `Authorization` header with the JWT token.

### Auth

- `POST /api/auth/register`

    - Register a new shopkeeper

    - **Body**: `{ "email": "user@shop.com", "password": "securePass" }`

    - Response: Confirmation message

- `POST /api/auth/login`

    - Login and receive JWT

    - **Body**: `{  "email":"user@gmail.com", "password":"user@123" }`

    - **Response**:` { "token": "JWT_TOKEN" }`

### Customers

- `POST /api/customers`

    - Add a new customer

    - **Body**:

    `{
  "name": "user",
  "phone": "9876543210",
  "address": "Hyderabad",
  "trustScore": 10,
  "creditLimit": 10000
    }
`
- `GET /api/customers`

    - Retrieve all customers for the logged-in shopkeeper

- `PUT /api/customers/:id`

    - Update customer data

    - **Body**: Partial or full customer object

- DELETE /api/customers/:id

    - Delete a customer

## Loans (Credit Sales)

- POST /api/loans

    - Create a new credit transaction

    - **Body**: `{
  "customerId": "<CUSTOMER_ID>",
  "description": "Groceries on credit",
  "amount": 1000,
  "issueDate": "2025-05-04",
  "dueDate": "2025-05-15",
  "frequency": "by-weekly",
  "interest": 2,
  "graceDays": 3
}`
- `GET /api/loans`
    - View all loans with status (`pending` / `paid` / `overdue`)

# Repayments

- `POST /api/repayments`

    - Record a repayment

    - **Body**:

`{
  "loanId": "<LOAN_ID>",
  "amount": 500,
  "date": "2025-05-05"
}`

# Summary & Overdue

- `GET /api/summary`

    - Returns:

        - totalLoaned: Sum of all amounts issued

        - totalCollected: Sum of all repayments

        - overdueAmount: Total outstanding on overdue loans

- `GET /api/overdue`

    - Lists loans past their due date (plus any grace days)

Notes & Instructions

Use the Authorization header: Authorization: <JWT_TOKEN> for protected routes.
