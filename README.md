
# FurryNest

FurryNest is a full-stack pet adoption and pet-care marketplace app.
It includes public pet browsing, adoption workflow, admin moderation, blog management, donations, volunteer signup, contact forms, and a simple shop/cart/order system.

## Features

- Pet listing and filtering (dog/cat) with details page
- Pet request submission with image upload
- Admin dashboard for pet moderation and status updates
- JWT-based user and admin authentication
- Donations, volunteers, and contact form handling
- Shop products, cart, orders, and order status tracking
- Blog create/read/update/delete flows
- Responsive React UI

## Tech Stack

- Frontend: React, React Router, Vite, Axios, React Icons
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, multer
- Database: MongoDB

## Project Structure

```text
FurryNest/
|- src/
|  |- assets/
|  |- components/
|  |- context/
|  |- pages/
|  |- services/
|  `- utils/
|- server/
|  |- controllers/
|  |- db/
|  |- middleware/
|  |- models/
|  |- routes/
|  |- uploads/
|  |- seedAdmins.js
|  |- seedProducts.js
|  `- server.js
|- index.html
|- vite.config.js
`- README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string (Atlas or local)

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/shakhawat-hossain-shoaib/FurryNest.git
cd FurryNest/FurryNest
```

### 2. Install dependencies

```bash
npm install
cd server
npm install
cd ..
```

### 3. Create environment file

Create `server/.env` with the following values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret

# Optional (needed for npm run seed:admin)
ADMIN_NAME=FurryNest Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PHONE=0000000000
ADMIN_PASSWORD=StrongPassword123
```

The backend explicitly loads environment variables from `server/.env`.

### 4. Run development servers

Terminal 1 (backend):

```bash
cd server
npm run dev
```

Terminal 2 (frontend):

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.
Vite proxies `/api` and `/uploads` requests to `http://localhost:5000`.

## Scripts

Root (`/`):

- `npm run dev` - start Vite dev server
- `npm run build` - create production frontend build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

Server (`/server`):

- `npm run dev` - start API server with nodemon
- `npm run start` - start API server with node
- `npm run seed` - seed sample products
- `npm run seed:admin` - seed admin account from env values

## API Summary

Base path: `/api`

Auth:

- `POST /users` - register user
- `POST /users/login` - user login
- `GET /users/verify` - verify user token
- `POST /admin/login` - admin login
- `GET /admin/verify` - verify admin token

Pets:

- `GET /pets` - approved pets
- `GET /pets/count` - pet counters
- `GET /pets/:id` - pet details
- `POST /pets/request` - submit pet request (multipart image)
- `POST /pets` - create pet (admin)
- `GET /pets/manage` - admin pet list
- `GET /pets/pending` - pending pets (admin)
- `PUT /pets/:id` - update pet (admin)
- `PATCH /pets/:id/status` - update pet status (admin)
- `PUT /pets/:id/approve` - approve pet (admin)
- `DELETE /pets/:id/reject` - reject pet (admin)
- `DELETE /pets/:id` - delete pet (admin)

Shop:

- `GET /products`, `GET /products/:id`
- `POST /products`, `PUT /products/:id`, `DELETE /products/:id` (admin)
- `PUT /products/:id/stock` (admin)
- `POST /products/:id/reviews`

Cart and Orders:

- `GET /cart`, `POST /cart`, `PATCH /cart/:id`, `DELETE /cart/:id`, `DELETE /cart`
- `POST /orders`, `GET /orders`
- `GET /orders/stats`, `PATCH /orders/:id/status`, `DELETE /orders/:id` (admin)

Other:

- `GET/POST /volunteers`
- `GET/POST /donations`
- `POST /contact`
- `GET /blogs`, `GET /blogs/:id`
- `POST /blogs`, `PUT /blogs/:id`, `DELETE /blogs/:id` (admin)

## Screenshots

![FurryNest Home](src/assets/images/FurryNest_1.png)

![FurryNest Brand](src/assets/images/FurryNest.png)

## Troubleshooting

- MongoDB connection issues (`ENOTFOUND`, `NXDOMAIN`, auth failed): verify `MONGO_URI` and network access.
- 401/403 on admin actions: confirm valid login and token is being sent.
- Image not loading: ensure backend is running and `/uploads` is reachable.
- Frontend API calls failing: confirm backend is listening on port `5000`.

## License

ISC
