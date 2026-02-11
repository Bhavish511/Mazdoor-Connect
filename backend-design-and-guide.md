# Backend System Design: Mazdoor Connect

This document outlines the architecture, database schema, and API requirements for the Mazdoor Connect backend system.

## 1. Technology Stack
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) with Phone/Email support
- **Real-time Updates:** Socket.io (for booking status and notifications)
- **File Storage:** AWS S3 or Cloudinary (for worker portfolio images and verification documents)

---

## 2. Database Schema (Draft)

### User Model
- `name`: String
- `phone`: String (Unique)
- `email`: String (Optional, Unique)
- `password`: String (Hashed)
- `role`: Enum ("customer", "worker", "admin")
- `avatar`: String (URL)
- `address`: String
- `isVerified`: Boolean (General phone verification)
- `createdAt`: Date

### Worker Profile Model (Linked to User)
- `userId`: ObjectId (Ref: User)
- `category`: String (Ref: Electrician, Plumber, etc.)
- `bio`: String
- `experience`: Number (Years)
- `priceRange`: { min: Number, max: Number }
- `specialties`: [String]
- `location`: String (City/Area)
- `verifiedStatus`: {
    - `cnic`: Boolean
    - `policeCheck`: Boolean
    - `skillTest`: Boolean
- }
- `portfolio`: [String] (Image URLs)
- `rating`: Number (Average)
- `reviewCount`: Number
- `jobsCompleted`: Number

### Booking Model
- `customerId`: ObjectId (Ref: User)
- `workerId`: ObjectId (Ref: User)
- `service`: String
- `description`: String
- `date`: Date
- `timeSlot`: String
- `address`: String
- `status`: Enum ("pending", "confirmed", "in-progress", "completed", "cancelled")
- `estimatedPrice`: { min: Number, max: Number }
- `finalPrice`: Number
- `paymentMethod`: Enum ("cash", "jazzcash", "easypaisa")
- `paymentStatus`: Enum ("unpaid", "paid")

### Review Model
- `bookingId`: ObjectId (Ref: Booking)
- `workerId`: ObjectId (Ref: User)
- `customerId`: ObjectId (Ref: User)
- `rating`: Number
- `text`: String
- `createdAt`: Date

---

## 3. API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register a new user (Customer or Worker)
- `POST /api/v1/auth/login` - Authenticate and return JWT
- `GET /api/v1/auth/me` - Get current logged-in user profile

### Workers & Marketplace
- `GET /api/v1/workers` - Get workers with filters (category, rating, location)
- `GET /api/v1/workers/:id` - Detailed worker profile
- `GET /api/v1/workers/featured` - Get top-rated workers

### Bookings
- `POST /api/v1/bookings` - Create a new booking (Customer only)
- `GET /api/v1/bookings/customer` - Get all bookings for a customer
- `GET /api/v1/bookings/worker` - Get all assignments for a worker
- `PATCH /api/v1/bookings/:id/status` - Update status (Confirmed/Completed)

### Reviews
- `POST /api/v1/reviews` - Post a review after job completion
- `GET /api/v1/reviews/worker/:id` - Get all reviews for a worker

### Admin
- `GET /api/v1/admin/stats` - Platform wide analytics
- `GET /api/v1/admin/verifications` - List of pending worker verifications
- `PATCH /api/v1/admin/verifications/:id` - Approve/Reject worker verification

---

## 4. Proposed Folder Structure
```text
backend/
├── src/
│   ├── config/         # Database and env config
│   ├── controllers/    # Route handler logic
│   ├── middleware/     # Auth, error handling, validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express route definitions
│   ├── utils/          # Helpers (SMS, File upload)
│   └── app.js          # Express app setup
├── tests/              # API tests
├── .env                # Secret environment variables
└── server.js           # Entry point
```

---

## 5. Next Steps for Implementation
1. Initialize a new Node.js project (`npm init -y`).
2. Install Core dependencies: `express mongoose dotenv jsonwebtoken cors bcryptjs`.
3. Set up MongoDB Connection.
4. Implement **Auth Middleware** to protect routes.
5. Create CRUD routes for **Workers** and **Bookings**.
6. Implement **Cloudinary/S3 integration** for identity document uploads.
