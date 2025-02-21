
# Mophone Product Engineer Role Interview

This repository contains a Solution for the Mophone Product Engineer interview task. The task involves implementing a **"Reassign Payment"** feature in the backend using **NestJS** and the Database using  **MongoDB**.And testing with ** Jest** (for testing the backend service) 

## Overview

For this live coding session, the focus was on implementing a feature to reassign a payment from one customer to another within a NestJS backend and a Next.js frontend. The backend needs to handle the validation of IDs for payments and customers, and ensure the successful reassignment of payments. During the process, I also focused on writing clean, modular code, ensuring proper error handling, and maintaining solid testing practices.

## Features Implemented

### Backend
1. **Authentication:**
   - Sign up and login endpoints using JWT strategy.
   
2. **Customer Management:**
   - CRUD operations to manage customers (Add, List, Edit, Delete).

3. **Payment Management:**
   - List all payments.
   - Add new payments.
   - Reassign a payment from one customer to another (implemented during the live coding session).

4. **Reassign Payment Feature:**
   - Reassigns a payment from one customer to another.
   - Validates the request (Payment ID, Source and Target Customer IDs must exist).
   - Updates the payment record in the database with the new customer ID.
   - Returns the updated payment details in the response.

## API Endpoints

### Authentication
- `POST /auth/signup` – Sign up a new user.
- `POST /auth/login` – Log in an existing user.

### Customers
- `GET /customers` – List all customers.
- `POST /customers` – Add a new customer.

### Payments
- `GET /payments` – List all payments.
- `POST /payments` – Add a new payment.
- `PUT /payments/reassign` – Reassign a payment from one customer to another.

## Testing

The backend includes tests for the **Reassign Payment** feature, covering the following scenarios:
1. Successful reassignment.
2. Handling non-existent payment IDs.
3. Handling invalid customer IDs (source and target).

Tests are written using **Jest** and can be run with:
```bash
npm run test
```
## Results
[![Product Image](https://github.com/kibomamoses/product-engineer-interview/blob/main/home.JPG)](https://github.com/kibomamoses/product-engineer-interview)

## Thought Process and Implementation

### Key Implementation Details:
- **Validation:** The reassign payment feature validates that the payment, source customer, and target customer exist before performing any update.
- **Database Updates:** If all validations pass, the payment record is updated atomically with the target customer ID.
- **Error Handling:** Proper error handling is implemented using NestJS's built-in exceptions like `NotFoundException` for non-existent resources.
- **Testing:** Unit tests were written to ensure that the feature works as expected under different scenarios (successful reassignment, invalid payment or customer IDs).

## Installation

Follow the steps below to get the backend running on your local machine.

### 1. **Clone the Repository**

Clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/mophones/product-engineer-interview.git
cd backend
```

### 2. **Install Dependencies**

Install the required dependencies using npm:

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root of the backend project with the following content:

```env
MONGO_URI=mongodb://localhost:27017/mophone
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600
```

Make sure MongoDB is running locally or you have a cloud MongoDB service.

### 4. **Run the Backend**

Start the NestJS application:

```bash
npm run start
```

The application will be available at `http://localhost:3000`.

### 5. **Run the Tests**

To run the test suite and ensure everything is working correctly, use:

```bash
npm run test
```

---

## Testing with Postman

Once the backend server is running, you can test the endpoints using Postman.

### 1. **Authentication**
   - **Sign Up**: `POST /auth/signup`
     - Body (JSON):
       ```json
       {
         "email": "user@example.com",
         "password": "yourpassword"
       }
       ```
   - **Login**: `POST /auth/login`
     - Body (JSON):
       ```json
       {
         "email": "user@example.com",
         "password": "yourpassword"
       }
       ```
     - Response will include a JWT token which will be used for authentication in subsequent requests.

### 2. **Customer Management**
   - **Add Customer**: `POST /customers`
     - Body (JSON):
       ```json
       {
         "name": "Customer Name",
         "email": "customer@example.com"
       }
       ```
   - **Get All Customers**: `GET /customers`

### 3. **Payment Management**
   - **Add Payment**: `POST /payments`
     - Body (JSON):
       ```json
       {
         "amount": 100,
         "customer": "sourceCustomerId"
       }
       ```
   - **Get All Payments**: `GET /payments`

### 4. **Reassign Payment**
   - **Reassign Payment**: `PUT /payments/reassign`
     - Body (JSON):
       ```json
       {
         "paymentId": "paymentId",
         "sourceCustomerId": "sourceCustomerId",
         "targetCustomerId": "targetCustomerId"
       }
       ```
   - **Success**: The payment will be reassigned, and the updated payment object will be returned.
   - **Failure**: If any entity (payment or customer) is invalid, appropriate error messages are returned (e.g., `Payment not found`, `Source customer not found`).

### Concurrency and Database Atomicity:
- Ensured atomicity during payment reassignment by handling potential errors and rolling back changes if needed.
- **Concurrency** was addressed by ensuring stateless operations, which reduces the risk of race conditions.

## License

This project is licensed under the MIT License.
