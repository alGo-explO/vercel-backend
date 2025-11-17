# Auth Starter

React + Express + Prisma demo with MongoDB Atlas, bcrypt, and JWT auth.

## Quick Start
```bash
git clone <repo>
cd /Users/sambhavkumar/Desktop/CP
```

### Backend (`server`)
```bash
cd server
npm install
cp env.sample .env 
npx prisma db push
npm run dev
```

`.env` example:
```
DATABASE_URL="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/auth-db?retryWrites=true&w=majority"
JWT_SECRET="change-me"
```

### Frontend (`client`)
```bash
cd client
npm install
npm run dev
```

## Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`

## Notes
- Vite proxy forwards `/api` to the Express server on port 5000.
- Update Atlas IP allow list or use `0.0.0.0/0` during development.
- Re-run `npx prisma db push` after schema changes.




## Project Proposal

Project Title: Book Library / Reading List Application

Objective:
To build a full-stack web application that allows users to manage their personal reading lists.
Users can add, edit, delete, and view books they’ve read or plan to read, with additional options to
filter, search, and sort their book collections. The platform aims to encourage reading habits and
provide an organized digital library experience.

Key Features:
- User Authentication and Authorization (personal book lists)
- CRUD operations for books (title, author, rating, notes, genre, status)
- Filtering by genre or status (e.g., “Read”, “To Read”)
- Searching by title or author
- Sorting by rating or date added
- Pagination for large book lists

Tech Stack:
- Frontend: React.js
- Backend: Node.js with Express.js for RESTful APIs
- Database: MongoDB (hosted on MongoDB Atlas)
- Authentication: JSON Web Tokens (JWT)
- Hosting: Frontend on Vercel

System Design Overview:
The backend will handle user authentication, book management, and filtering logic.
The frontend will consume REST APIs dynamically to display and manage books.
Data will be stored in MongoDB with each user having their own book collection.
Pagination and search queries will be optimized using server-side filtering.

Deliverables:
- Responsive and user-friendly web application
- Hosted frontend, backend, and database
- API documentation
- Deployed demo link and GitHub repository



## Hosted frontend url

link : 