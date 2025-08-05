# Video Predictor Frontend

A modern, AI-powered video analysis application built with React, TypeScript, and Tailwind CSS. This application provides an intuitive interface for uploading videos, running AI predictions, and viewing detailed analysis results with comprehensive dark mode support.

## 🚀 Features

- **Video Upload & Analysis**: Drag-and-drop interface for easy video file uploads
- **AI-Powered Predictions**: Real-time video analysis with confidence scores
- **Interactive Dashboard**: Comprehensive overview of prediction analytics and performance
- **Results Management**: View, filter, and manage prediction results with detailed insights
- **History Tracking**: Complete history of all video predictions with search functionality
- **User Profile Management**: Customizable user profiles with statistics
- **Dark Mode Support**: Full dark/light theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Notifications**: Toast notifications for user feedback
- **Progress Tracking**: Live upload and processing progress indicators

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: Single Page Application (SPA)

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdsajjadhossain25/video_predictor_frontend.git
   cd video_predictor_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Demo UI

### Dashboard Overview
The main dashboard provides a comprehensive view of your video prediction analytics:
- Real-time statistics cards (Total Predictions, Completed, Processing, Average Confidence)
- Recent predictions list with status indicators
- Performance metrics visualization
- Quick action buttons

### Upload & Predict Page
Intuitive video upload interface featuring:
- Drag-and-drop file upload area
- File format validation (MP4, AVI, MOV, WMV)
- Real-time upload progress tracking
- Processing status indicators
- Feature highlight cards

### Results Page
Comprehensive results management:
- Grid layout for prediction results
- Filtering options (All, Completed, Processing)
- Confidence score visualizations
- Detailed result modals
- Download and sharing capabilities
- Statistics summary cards

### History Page
Complete prediction history tracking:
- Search functionality by video name
- Status filtering options
- Sortable columns (Date, Name, Confidence)
- Detailed history records

### Profile Settings
User account management:
- Editable profile information
- User statistics overview
- Account preferences
- Profile customization options

### Dark Mode Support
- Seamless theme switching
- Consistent dark mode across all components
- Automatic theme persistence
- Optimized color schemes for both themes

## 🏗 Project Structure

```
src/
├── App.tsx                      # Main application component with routing logic
├── App.css                      # Application-specific styles
├── main.tsx                     # Application entry point
├── index.css                    # Global styles and Tailwind imports
├── vite-env.d.ts               # Vite type declarations
├── assets/                      # Static assets
│   └── react.svg
└── components/                  # Modular component architecture
    ├── AppContext.tsx           # Global state management with React Context
    ├── LoadingOverlay.tsx       # Loading spinner overlay component
    ├── Navbar.tsx               # Top navigation with user menu & theme toggle
    ├── Sidebar.tsx              # Left sidebar navigation with menu items
    ├── Toast.tsx                # Toast notification system
    └── pages/                   # Page-specific components
        ├── DashboardPage.tsx    # Main dashboard with analytics
        ├── UploadPage.tsx       # Video upload interface
        ├── ResultsPage.tsx      # Prediction results management
        ├── HistoryPage.tsx      # Prediction history browser
        └── ProfilePage.tsx      # User profile management
```

### 🎯 Modular Architecture Benefits

- **Maintainability**: Each component is isolated and easy to modify
- **Reusability**: Components can be imported and used across different parts of the app
- **Testability**: Individual components can be tested independently
- **Scalability**: New features can be added as separate components
- **Code Organization**: Clear separation of concerns and logical file structure
- **Team Collaboration**: Multiple developers can work on different components simultaneously
- **Debugging**: Issues can be quickly traced to specific component files

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_endpoint
VITE_APP_NAME=Video Predictor
```

### Tailwind CSS Configuration

The project uses Tailwind CSS v4.1 with custom configurations for:
- Dark mode support
- Custom color schemes
- Responsive breakpoints
- Component-specific styles

## 🌟 Key Components

### Architecture Overview
The application follows a modular component architecture with clear separation of concerns:

### Global State Management
- **AppContext.tsx**: Centralized state management using React Context API
  - User authentication state
  - Dark/light theme management with localStorage persistence
  - Toast notification system
  - Prediction data management
  - Loading state coordination

### Core UI Components
- **Navbar.tsx**: Top navigation bar with user dropdown, theme toggle, and notifications
- **Sidebar.tsx**: Responsive left sidebar with navigation menu and quick stats
- **Toast.tsx**: Notification system with different types (success, error, warning, info)
- **LoadingOverlay.tsx**: Global loading spinner with progress indication

### Page Components
- **DashboardPage.tsx**: Analytics dashboard with statistics cards and recent predictions
- **UploadPage.tsx**: Drag-and-drop video upload interface with progress tracking
- **ResultsPage.tsx**: Prediction results grid with filtering and detailed modal views
- **HistoryPage.tsx**: Complete prediction history with search and filter capabilities
- **ProfilePage.tsx**: User profile management with editable information and statistics

### Design Patterns
- **Component Composition**: Each component is self-contained and reusable
- **Props Interface**: TypeScript interfaces for type-safe component communication
- **Context Pattern**: Global state shared across components without prop drilling
- **Conditional Rendering**: Dynamic UI based on application state
- **Responsive Design**: Mobile-first approach with Tailwind CSS utilities

## 🎯 Usage

1. **Upload Videos**: Navigate to the Upload page and drag-drop your video files
2. **Monitor Progress**: Track upload and processing progress in real-time
3. **View Results**: Check the Results page for detailed analysis
4. **Manage History**: Browse all past predictions in the History section
5. **Customize Profile**: Update your profile information and preferences
6. **Toggle Theme**: Switch between light and dark modes

## 🛠 Development Workflow

### Working with the Modular Structure

1. **Adding New Components**: Create new components in the appropriate directory
   ```bash
   # For UI components
   src/components/YourComponent.tsx
   
   # For page components
   src/components/pages/YourPage.tsx
   ```

2. **Importing Components**: Use relative imports based on file location
   ```typescript
   // From pages to components
   import { Toast } from '../Toast';
   
   // From App.tsx to components
   import { DashboardPage } from './components/pages/DashboardPage';
   ```

3. **State Management**: Use the AppContext for global state
   ```typescript
   import { useApp } from './components/AppContext';
   const { user, darkMode, addNotification } = useApp();
   ```

4. **Component Guidelines**:
   - Each component should be self-contained
   - Use TypeScript interfaces for props
   - Follow the established naming conventions
   - Include proper JSDoc comments for complex components

## 🔮 Future Enhancements

### Backend Integration
- Real backend API integration
- Authentication and authorization system
- Database integration for persistent storage

### Feature Enhancements
- Video preview functionality with player controls
- Batch upload support for multiple files
- Advanced filtering and sorting options
- Export capabilities (CSV, JSON, PDF reports)
- Real-time collaboration features

### Technical Improvements
- Component library extraction for reusability
- Automated testing suite (unit, integration, e2e)
- Performance optimizations and code splitting
- Progressive Web App (PWA) capabilities
- Internationalization (i18n) support

### UI/UX Enhancements
- Advanced analytics dashboard with charts
- Customizable dashboard widgets
- Improved mobile experience
- Accessibility improvements (WCAG compliance)
- Animation and micro-interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MD Sajjad Hossain**
- GitHub: [@mdsajjadhossain25](https://github.com/mdsajjadhossain25)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- Vite for the fast build tool
- TypeScript for enhanced developer experience

## 📝 Recent Updates

**v2.0.0 - Modular Architecture Refactor**
- Broke down monolithic `App.tsx` (2000+ lines) into modular components
- Improved code organization and maintainability
- Enhanced developer experience with better file structure
- Maintained all existing functionality while improving code quality

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*
