# QuickGPT Chat 🚀

A modern, full-stack AI chat application with image generation capabilities, built with React and Node.js.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://quickgpt-chat.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/TheHiddenLoop/quickgpt-chat)

## ✨ Features

- 💬 **Real-time Chat Interface** - Seamless conversation with AI
- 🎨 **Image Generation** - Create images using AI models
- 🔐 **User Authentication** - Secure login and signup system
- 💳 **Pricing Plans** - Multiple subscription tiers
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎯 **Modern UI/UX** - Clean and intuitive interface
- ⚡ **Fast & Efficient** - Optimized performance

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Custom Hooks** - Reusable logic (debounce, etc.)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Cloudinary** - Image storage and management
- **Stripe** - Payment processing

## 📁 Project Structure

```
quickgpt-chat/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/           # App component
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable components
│   │   │   ├── skeleton/
│   │   │   └── Ui/
│   │   ├── features/
│   │   │   ├── authentication/
│   │   │   └── chat/
│   │   ├── hooks/         # Custom React hooks
│   │   ├── libs/          # Utility libraries
│   │   └── pages/         # Page components
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── libs/          # Utility functions
│   │   ├── middleware/    # Express middleware
│   │   ├── model/         # Database models
│   │   └── routes/        # API routes
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Cloudinary account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TheHiddenLoop/quickgpt-chat.git
   cd quickgpt-chat
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Gemini AI API (for messaging)
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # or for development
   npm run dev
   ```

2. **Start the Frontend**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 🎨 Key Features Breakdown

### Chat System
- Real-time message processing
- Conversation history
- Message threading
- User-friendly chat interface

### Image Generation
- AI-powered image creation
- Multiple style options
- High-quality output
- Gallery view

### Authentication
- Secure user registration
- JWT-based authentication
- Protected routes
- Session management

### Payment Integration
- Multiple pricing tiers
- Secure Stripe checkout
- Webhook handling for payment events
- Subscription management

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**TheHiddenLoop**

- GitHub: [@TheHiddenLoop](https://github.com/TheHiddenLoop)
- Live Demo: [quickgpt-chat.vercel.app](https://quickgpt-chat.vercel.app/)

---

Made with ❤️ by TheHiddenLoop
