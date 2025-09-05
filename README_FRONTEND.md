# EventFlow - Beautiful Event Management Platform

A stunning, modern event booking platform with liquid glass effects, matte design elements, and 3D animations built with React and Go.

## 🎨 Design Features

- **Liquid Glass Effects**: Beautiful frosted glass components with backdrop blur
- **Matte Design Elements**: Modern matte surfaces with subtle shadows
- **3D Animations**: Interactive 3D background with Three.js
- **Gradient Animations**: Smooth color transitions and morphing effects
- **Responsive Design**: Mobile-first approach with perfect scaling
- **Neon Glow Effects**: Elegant glowing elements for emphasis

## 🚀 Features

### Frontend (React + TypeScript)
- **Authentication**: Beautiful login/signup with form validation
- **Event Discovery**: Browse and search events with elegant cards
- **Event Management**: Create, edit, and delete events
- **Responsive Navigation**: Smooth mobile and desktop navigation
- **3D Background**: Animated spheres and particles
- **Liquid UI Components**: Glass-morphism design throughout

### Backend (Go + Gin)
- **RESTful API**: Complete CRUD operations for events
- **JWT Authentication**: Secure user authentication
- **Event Registration**: Register/unregister for events
- **Search Functionality**: Search events by name, description, location
- **CORS Support**: Proper cross-origin resource sharing
- **SQLite Database**: Lightweight, embedded database

## 🛠️ Tech Stack

### Frontend
- React 19 with TypeScript
- Framer Motion for animations
- Three.js for 3D effects
- React Router for navigation
- Axios for API calls
- Tailwind-like utility classes

### Backend
- Go with Gin framework
- SQLite database
- JWT for authentication
- bcrypt for password hashing
- CORS middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Go (v1.19+)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Run the server:
   ```bash
   go run main.go
   ```
   Server runs on `http://localhost:8081`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   App runs on `http://localhost:3001`

## 🎯 API Endpoints

### Public Endpoints
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /events/search/:string` - Search events

### Authenticated Endpoints
- `POST /events` - Create event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /events/:id/register` - Register for event
- `DELETE /events/:id/register` - Cancel registration

## 🎨 UI Components

### Glass Components
- Buttons with liquid ripple effects
- Input fields with frosted glass styling
- Cards with backdrop blur
- Modals with glass morphism

### Animation Features
- Floating elements with subtle movement
- Morphing shapes that change over time
- Gradient text animations
- Hover effects with scale and glow
- Loading spinners with rotation

### 3D Elements
- Animated background spheres
- Floating particle systems
- Interactive hover states
- Smooth camera movements

## 🌟 Usage

1. **Sign Up**: Create a new account with email and password
2. **Browse Events**: Explore available events on the Events page
3. **Search**: Use the search functionality to find specific events
4. **Create Events**: Authenticated users can create new events
5. **Manage Events**: Edit or delete your own events
6. **Register**: Sign up for events you're interested in

## 🎭 Design Philosophy

This project demonstrates modern web design principles:

- **Glass Morphism**: Translucent elements with blur effects
- **Neumorphism**: Soft shadows and subtle depth
- **Micro-interactions**: Smooth animations on user actions
- **Responsive Design**: Beautiful on all screen sizes
- **Accessibility**: Proper contrast and keyboard navigation

## 🚀 Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Animations**: Hardware-accelerated CSS transitions
- **Efficient Rendering**: React optimization patterns
- **Compressed Assets**: Optimized images and fonts
- **Caching Strategy**: Smart API response caching

## 📱 Mobile Experience

- Touch-friendly interface
- Swipe gestures for navigation
- Optimized performance on mobile devices
- Progressive Web App features
- Responsive breakpoints

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- SQL injection prevention

## 🎨 Color Palette

- **Primary**: Purple to Pink gradient (#667eea → #764ba2)
- **Secondary**: Blue to Cyan gradient (#4facfe → #00f2fe)
- **Accent**: Gradient animations
- **Glass**: Transparent white with blur
- **Text**: White with various opacities

---

*Built with ❤️ using modern web technologies and beautiful design principles*
