# Mazdoor Connect 🛠️

**Mazdoor Connect** is a full-stack digital marketplace designed to bridge the gap between skilled laborers (workers) and customers. It provides a robust, professional platform for booking essential services while ensuring trust through a rigorous multi-layered verification system.

---

## 🚀 Core Functionality

Mazdoor Connect is built to handle the entire lifecycle of a service request, from discovery to completion and feedback.

### 👤 User Roles & Workflows

#### 1. Customer
- **Discovery**: Search and filter workers by category, location, and rating.
- **Booking**: Request services with specific details, dates, and time slots.
- **Dashboard**: Track active bookings, view history, and manage favorites.
- **Feedback**: Rate and review workers after a job is completed.

#### 2. Worker
- **Profile Management**: Create a professional portfolio including bio, experience, and price ranges.
- **Verification**: Submit documents for CNIC, police checks, and skill tests.
- **Job Management**: Accept or update the status of service assignments.
- **Analytics**: Track earnings and performance metrics.

#### 3. Administrator
- **Governance**: Manage the verification queue for new workers.
- **Analytics**: Platform-wide statistics on bookings and growth.
- **Moderation**: Approve or reject worker profiles and monitor platform health.

---

## 💻 Tech Stack

### Frontend
- **Runtime/Build**: [Vite](https://vitejs.dev/) + [React 19](https://reactjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Routing**: [React Router Dom v7](https://reactrouter.com/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

### Backend
- **Framework**: [Express.js](https://expressjs.com/) (Node.js)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Sequelize ORM](https://sequelize.org/)
- **Security**: [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) for hashing & [JWT](https://jwt.io/) for session management.

---

## 📂 Project Structure

### Frontend Screens (23+ Pages)
- **Auth**: Login, Register, Profile Management.
- **Customer Pages**: Home, Categories, Category Detail, Worker Detail, Dashboard, My Bookings, Favorites.
- **Worker Pages**: Dashboard, Profile Setup, Settings, Analytics.
- **Admin Pages**: Dashboard, Verification Queue, Settings.
- **General**: About, Contact, How It Works, Terms, Privacy.

### Backend API Surface
| Module | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/v1/auth/signup` | POST | Register new account |
| | `/api/v1/auth/login` | POST | Authenticate user |
| | `/api/v1/auth/me` | GET | Get current user session |
| **Worker** | `/api/v1/workers` | GET | List workers with filters |
| | `/api/v1/workers/:id` | GET | Detailed worker profile |
| | `/api/v1/workers/profile` | POST | Create worker profile |
| | `/api/v1/workers/profile/:id` | PATCH | Update profile/verification |
| **Booking** | `/api/v1/bookings` | POST | Create new service request |
| | `/api/v1/bookings/customer` | GET | View user's bookings |
| | `/api/v1/bookings/worker` | GET | View worker's assignments |
| | `/api/v1/bookings/:id/status` | PATCH | Update job progress |
| **Review** | `/api/v1/reviews` | POST | Leave feedback for worker |
| | `/api/v1/reviews/worker/:id` | GET | View worker reviews |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### Quick Start
1. **Clone & Install**:
   ```bash
   # Install backend dependencies
   cd backend && npm install
   # Install frontend dependencies
   cd ../Frontend && npm install
   ```
2. **Setup Environment**: Add `.env` files to both `backend/` and `Frontend/` directories with your database and session keys.
3. **Run Services**:
   - Backend: `npm run dev` in `backend/`
   - Frontend: `npm run dev` in `Frontend/`

---

## 📄 References
- [Detailed Backend Design](./backend-design-and-guide.md)
- [Strategic Blueprint](./Mazdoor%20Connect%20-%20Strategic%20Blueprint%20V3%20(Complete).pdf)

---

## 🤝 License
Distributed under the MIT License.
