Here's a **README.md** file for your GitHub repository based on the details provided:

```markdown
# Mophone Product Engineer Role Interview

This repository contains a Solution for the Mophone Product Engineer interview task. The task involves implementing a **"Reassign Payment"** feature in the backend using **NestJS** and the frontend using **Next.js** with **Tailwind CSS** and **TypeScript**. 

## Overview

The interview task includes the implementation of a backend feature to reassign payments from one customer to another. This includes handling various cases such as non-existent payments or invalid customer IDs. The task also includes writing unit tests for the implemented functionality.

### Technologies Used
- **Backend:** NestJS
- **Frontend:** Next.js with Tailwind CSS and TypeScript
- **Database:** MongoDB (used via repositories for customer and payment management)
- **Testing:** Jest (for testing the backend service)

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

### Frontend
1. **Customer Management:**
   - Displays a list of customers.
   - Provides a form to add new customers.

2. **Payment Management:**
   - Displays a list of payments.
   - Provides a form to add new payments.

3. **Reassign Payment:**
   - Interface to select source and target customers for payment reassignment.
   - Calls the backend API to perform the reassignment and updates the UI with the result.

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mophones/product-engineer-interview.git
   ```

2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm run start
   ```

   The backend will be available at [http://localhost:3000](http://localhost:3000).

5. Run the test suite:
   ```bash
   npm run test
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm run dev
   ```

   The frontend will be available at [http://localhost:3000](http://localhost:3000).

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

## Thought Process and Implementation

### Key Implementation Details:
- **Validation:** The reassign payment feature validates that the payment, source customer, and target customer exist before performing any update.
- **Database Updates:** If all validations pass, the payment record is updated atomically with the target customer ID.
- **Error Handling:** Proper error handling is implemented using NestJS's built-in exceptions like `NotFoundException` for non-existent resources.
- **Testing:** Unit tests were written to ensure that the feature works as expected under different scenarios (successful reassignment, invalid payment or customer IDs).

### Concurrency and Database Atomicity:
- Ensured atomicity during payment reassignment by handling potential errors and rolling back changes if needed.
- **Concurrency** was addressed by ensuring stateless operations, which reduces the risk of race conditions.

## License

This project is licensed under the MIT License.
```

### Notes:
- You may adjust the URL in the clone command to reflect the correct repository link.
- Ensure that the file and folder names match those in your actual repository structure.
