# Portfolio Backend API

RESTful API for managing portfolio content built with Node.js, Express, TypeScript, and MongoDB.

## Base URL
```
http://localhost:5000/api/v1
```

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Environment Variables
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

## API Endpoints

### Services
```
GET    /api/v1/services          # Get all services
GET    /api/v1/services/:id      # Get service by ID
POST   /api/v1/services          # Create service
PUT    /api/v1/services/:id      # Update service
DELETE /api/v1/services/:id      # Delete service
```

**POST/PUT Payload:**
```json
{
  "title": "Web Development",
  "description": "Full-stack web development services using modern technologies",
  "icon": "code",
  "order": 1
}
```

### Projects
```
GET    /api/v1/projects          # Get all projects
GET    /api/v1/projects/:id      # Get project by ID
POST   /api/v1/projects          # Create project
PUT    /api/v1/projects/:id      # Update project
DELETE /api/v1/projects/:id      # Delete project
```

**POST/PUT Payload:**
```json
{
  "title": "E-Commerce Platform",
  "shortDescription": "A full-featured online shopping platform",
  "longDescription": "Built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
  "techStack": ["React", "Node.js", "MongoDB", "Express", "Stripe"],
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "liveUrl": "https://example.com",
  "githubUrl": "https://github.com/username/project",
  "isFeatured": true,
  "order": 1
}
```

### Resume - Experience
```
GET    /api/v1/resume/experience           # Get all experience
POST   /api/v1/resume/experience           # Create experience
PUT    /api/v1/resume/experience/:id       # Update experience
DELETE /api/v1/resume/experience/:id       # Delete experience
```

**POST/PUT Payload:**
```json
{
  "company": "Tech Solutions Inc.",
  "position": "Senior Full Stack Developer",
  "location": "New York, NY",
  "startDate": "2022-01-15",
  "endDate": "2024-03-20",
  "isCurrent": false,
  "description": "Led development of enterprise-level web applications",
  "responsibilities": [
    "Architected and implemented scalable microservices",
    "Mentored junior developers",
    "Conducted code reviews and improved team practices"
  ],
  "technologies": ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
  "order": 1
}
```

### Resume - Education
```
GET    /api/v1/resume/education            # Get all education
POST   /api/v1/resume/education            # Create education
PUT    /api/v1/resume/education/:id        # Update education
DELETE /api/v1/resume/education/:id        # Delete education
```

**POST/PUT Payload:**
```json
{
  "institution": "Massachusetts Institute of Technology",
  "degree": "Bachelor of Science",
  "fieldOfStudy": "Computer Science",
  "location": "Cambridge, MA",
  "startDate": "2016-09-01",
  "endDate": "2020-05-15",
  "isCurrent": false,
  "grade": "3.8 GPA",
  "description": "Focus on software engineering and artificial intelligence",
  "order": 1
}
```

### Resume - Skills
```
GET    /api/v1/resume/skills               # Get all skills
POST   /api/v1/resume/skills               # Create skill
PUT    /api/v1/resume/skills/:id           # Update skill
DELETE /api/v1/resume/skills/:id           # Delete skill
```

**POST/PUT Payload:**
```json
{
  "name": "React",
  "category": "Frontend",
  "proficiency": 90,
  "icon": "react-icon",
  "order": 1
}
```

### Resume - Certifications
```
GET    /api/v1/resume/certifications       # Get all certifications
POST   /api/v1/resume/certifications       # Create certification
PUT    /api/v1/resume/certifications/:id   # Update certification
DELETE /api/v1/resume/certifications/:id   # Delete certification
```

**POST/PUT Payload:**
```json
{
  "name": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "issueDate": "2023-06-15",
  "expiryDate": "2026-06-15",
  "credentialId": "AWS-SA-123456",
  "credentialUrl": "https://aws.amazon.com/verification/123456",
  "description": "Professional-level certification for AWS architecture",
  "order": 1
}
```

### Resume - Profile
```
GET    /api/v1/resume/about                # Get profile
PUT    /api/v1/resume/about                # Update profile (upsert)
```

**PUT Payload:**
```json
{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "email": "john.doe@example.com",
  "phone": "+1-234-567-8900",
  "bio": "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
  "profileImage": "https://example.com/profile.jpg",
  "address": {
    "street": "123 Main Street",
    "city": "San Francisco",
    "state": "California",
    "country": "USA",
    "zipCode": "94102"
  },
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "instagram": "https://instagram.com/johndoe",
    "portfolio": "https://johndoe.dev"
  },
  "resume": "https://example.com/resume.pdf"
}
```

### Contact
```
POST   /api/v1/contact                     # Submit contact form
```

**POST Payload:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a potential project opportunity..."
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": { ...service }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Failed to create service"
}
```

## Status Codes
- `200` OK
- `201` Created
- `400` Bad Request
- `404` Not Found
- `500` Internal Server Error

## Data Models

### Service
- title (required)
- description (required)
- icon (optional)
- order (default: 0)

### Project
- title (required)
- shortDescription (required)
- longDescription (optional)
- techStack (required, array)
- images (required, array)
- liveUrl, githubUrl (optional, valid URLs)
- isFeatured (default: false)
- order (default: 0)

### Experience
- company, position (required)
- location (optional)
- startDate (required)
- endDate (optional)
- isCurrent (default: false)
- description (required)
- responsibilities, technologies (optional, arrays)
- order (default: 0)

### Education
- institution, degree, fieldOfStudy (required)
- location (optional)
- startDate (required)
- endDate (optional)
- isCurrent (default: false)
- grade, description (optional)
- order (default: 0)

### Certification
- name, issuer, issueDate (required)
- expiryDate (optional)
- credentialId, credentialUrl (optional)
- description (optional)
- order (default: 0)

### Profile
- name, title, email, phone, bio (required)
- profileImage (optional)
- address (optional object)
- socialLinks (optional object)
- resume (optional)

## Features
- TypeScript for type safety
- MongoDB with Mongoose ODM
- Input validation
- CORS enabled
- Sorted responses (by order field)
- Timestamp tracking (createdAt, updatedAt)

## Scripts
```bash
npm run dev        # Development with nodemon
npm run build      # Build TypeScript
npm start          # Production server
```

## Tech Stack
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- CORS

## Notes
- All IDs are MongoDB ObjectIds
- Dates are in ISO 8601 format
- All text fields are automatically trimmed
- URLs are validated with regex patterns
