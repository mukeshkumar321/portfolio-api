# Portfolio Website Backend

Backend API for portfolio website built with Express.js and MongoDB.

## Features

- RESTful API architecture
- MongoDB database integration
- Project management endpoints
- Contact form handling
- CORS enabled
- Environment variable configuration

## Project Structure

```
backend/
├── config/          # Configuration files
│   └── db.js        # Database connection
├── controllers/     # Route controllers
│   ├── projectController.js
│   └── contactController.js
├── models/          # Mongoose models
│   ├── Project.js
│   └── Contact.js
├── routes/          # API routes
│   ├── projectRoutes.js
│   └── contactRoutes.js
├── .env             # Environment variables
├── .gitignore       # Git ignore file
├── package.json     # Dependencies
└── server.js        # Entry point
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   NODE_ENV=development
   ```

3. Make sure MongoDB is running locally or update MONGODB_URI with your MongoDB connection string

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `GET /api/contact` - Get all contact messages
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete contact message

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
