# Client Project Management Dashboard

A modern, responsive React TypeScript dashboard for managing clients and projects. Built with Tailwind CSS and featuring a clean, professional interface with mock authentication and data.


## 🚀 Features

### 🔐 Authentication
- Mock login system (accepts any email/password)
- JWT-based authentication simulation
- Automatic session persistence
- Secure logout functionality

### 📊 Dashboard Overview
- Key metrics and statistics
- Recent projects overview
- Revenue tracking
- Visual indicators and progress bars

### 👥 Client Management
- Client listing with search and filtering
- Detailed client profiles with project history
- Status tracking (Active/Inactive)
- Responsive client cards

### 📁 Project Management
- Project cards with comprehensive information
- Multi-level filtering (status, client, search)
- Timeline and budget tracking
- Status management (Pending, In-Progress, Completed)

### 📱 Responsive Design
- Mobile-first responsive layout
- Collapsible sidebar navigation
- Touch-friendly interface
- Professional desktop experience

## 🛠️ Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Authentication:** Mock JWT simulation
- **Data:** Mock data for demonstration

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone and Setup
```bash
# Create new React app
npx create-react-app client-project-dashboard --template typescript
cd client-project-dashboard

# Install dependencies
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind CSS
npx tailwindcss init -p
```

### 2. Configure Tailwind CSS

**Update `tailwind.config.js`:**
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Update `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Replace App Component
Replace the contents of `src/App.tsx` with the provided dashboard component.

### 4. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🎮 Usage Guide

### Login
- Navigate to the application
- Enter any email and password (e.g., `admin@test.com` / `password123`)
- Click "Sign in"

### Navigation
- **Dashboard:** Overview with key metrics and recent projects
- **Clients:** Manage client information and view details
- **Projects:** Track and manage project status and details

### Features Demo
1. **Dashboard Statistics:** View total clients, active projects, and revenue
2. **Client Management:** Search, filter, and view detailed client profiles
3. **Project Tracking:** Filter projects by status and client
4. **Responsive Design:** Test on different screen sizes

## 📁 Project Structure

```
src/
├── App.tsx          # Main dashboard component (monolithic)
├── App.css          # Component styles (optional)
├── index.tsx        # React app entry point
├── index.css        # Global styles with Tailwind
└── ...
```

## 🎯 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 📊 Mock Data

The application includes realistic mock data:
- **3 Clients:** TechCorp Inc., DesignCo, StartupX
- **3 Projects:** E-commerce Website, Brand Identity Design, Mobile App Development
- **Various statuses:** Active/Inactive clients, Pending/In-Progress/Completed projects

## 🔧 Customization

### Adding Real API Integration
To connect to a real backend:

1. Replace mock data with API calls
2. Update authentication logic
3. Add error handling and loading states
4. Implement proper JWT token management

### Extending Features
- Add form validation with React Hook Form
- Implement real-time updates
- Add export functionality
- Include file upload capabilities

## 🎨 Design System

### Colors
- **Primary:** Blue (#3B82F6)
- **Success:** Green (#10B981)
- **Warning:** Yellow (#F59E0B)
- **Error:** Red (#EF4444)
- **Gray Scale:** Various gray shades for text and backgrounds

### Typography
- **Headings:** Inter/System fonts, various weights
- **Body:** Clean, readable text with proper contrast
- **Sizes:** Responsive typography scale

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚨 Known Limitations

- Mock authentication (accepts any credentials)
- Static mock data (no persistence)
- No real-time updates
- No backend integration
- Single-page application (no routing)

## 🚀 Future Enhancements

- [ ] Real API integration
- [ ] React Router for proper navigation
- [ ] Form validation and error handling
- [ ] Real-time notifications
- [ ] Data export functionality
- [ ] Advanced filtering and sorting
- [ ] User role management
- [ ] Dark mode support

## 📝 Development Notes

This is a demonstration dashboard built for showcasing frontend development skills. The component uses a monolithic structure for simplicity and rapid development.

For production use, consider:
- Breaking down into modular components
- Adding proper testing
- Implementing real authentication
- Adding error boundaries
- Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**