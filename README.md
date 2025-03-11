# Chatty - Real-time Chat Application

A modern real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## Features

-   🔐 User authentication (signup/login)
-   👤 User profiles with avatar support
-   💬 Real-time messaging
-   🌅 Image sharing in chats
-   🎨 Multiple theme options
-   👥 Online user status
-   📱 Responsive design

## Tech Stack

### Frontend

-   React with Vite
-   Tailwind CSS with DaisyUI
-   Socket.IO Client
-   Zustand for state management
-   React Router for navigation
-   Axios for API calls
-   Lucide React for icons

### Backend

-   Node.js with Express
-   MongoDB with Mongoose
-   Socket.IO for real-time communication
-   JWT for authentication
-   Cloudinary for image storage
-   bcrypt for password hashing

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── configurations/    # Database and other configs
│   │   ├── controllers/      # Request handlers
│   │   ├── lib/             # Utilities and services
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── seed/           # Database seeders
│   │   ├── app.js          # Express app setup
│   │   ├── constant.js     # Constants
│   │   └── index.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── layout/         # Layout components
│   │   ├── lib/           # Utilities
│   │   ├── pages/         # Route pages
│   │   ├── protected/     # Protected routes
│   │   ├── store/        # Zustand stores
│   │   ├── App.jsx       # Root component
│   │   └── main.jsx      # Entry point
│   └── package.json
```

## Setup Instructions

1. Clone the repository

```bash
git clone <repository-url>
cd chat_app
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables

Backend (.env):

```env
PORT=4000
DATABASE_URL=mongodb://localhost:27017
JWT_SECRET_KEY=your_jwt_secret
CROSS_ORIGIN=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start development servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## API Endpoints

### Authentication

-   `POST /api/auth/signup` - Register new user
-   `POST /api/auth/login` - Login user
-   `POST /api/auth/logout` - Logout user
-   `GET /api/auth/check-auth` - Check authentication status
-   `PUT /api/auth/update-profile` - Update user profile

### Messages

-   `GET /api/messages/users` - Get all users for sidebar
-   `GET /api/messages/:id` - Get chat messages with specific user
-   `POST /api/messages/send/:id` - Send message to specific user

## Features in Detail

### Authentication

-   JWT-based authentication
-   Protected routes
-   Persistent login state

### Real-time Communication

-   Socket.IO for instant messaging
-   Online/offline status updates
-   Real-time message delivery

### UI/UX

-   Multiple theme options using DaisyUI
-   Responsive design for all screen sizes
-   Loading states and animations
-   Toast notifications for feedback

### Chat Features

-   Text messages
-   Image sharing
-   Message timestamps
-   Online status indicators
-   Avatar support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details
