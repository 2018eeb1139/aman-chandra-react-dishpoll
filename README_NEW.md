# React Dish Poll App

A responsive web application for ranking dishes built with React, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- **User Authentication**: Login with static user accounts
- **Dish Voting**: Rank your top 3 favorite dishes with point system (Rank 1: 30pts, Rank 2: 20pts, Rank 3: 10pts)
- **Live Poll Results**: View real-time rankings and see where your selections stand
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Local Storage**: Persistent user sessions and voting data

## Tech Stack

- **Frontend**: React 18 with JavaScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **State Management**: React Context API

## Demo Users

The application includes 5 demo user accounts:

| Username | Password  |
| -------- | --------- |
| amar     | amar123   |
| akbar    | akbar123  |
| antony   | antony123 |
| john     | john123   |
| paul     | paul123   |

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aman-chandra-react-dishpoll
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
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Button, Input, Card)
│   ├── Login.jsx       # Login screen component
│   ├── Dashboard.jsx   # Main dashboard with tabs
│   ├── DishVoting.jsx  # Voting interface component
│   └── PollResults.jsx # Results display component
├── contexts/           # React Context providers
│   ├── AuthContext.js  # Authentication state management
│   └── VotingContext.js # Voting state management
├── data/              # Static data files
│   ├── db.json        # Dishes data (copied from API)
│   └── users.json     # User credentials
├── services/          # API services
│   └── api.js         # Dish data fetching
├── lib/               # Utility functions
│   └── utils.js       # Tailwind utility function
├── App.jsx            # Main App component with routing
├── App.css            # Custom CSS utilities
└── index.css          # Tailwind CSS with custom theme
```

## Application Flow

1. **Login**: Users authenticate with username/password
2. **Dashboard**: After login, users see a tabbed interface
3. **Voting Tab**: Browse dishes and rank top 3 choices
4. **Results Tab**: View overall rankings and personal selections

## Key Features Explained

### Voting System

- Each user can select exactly 3 dishes
- Dishes are ranked 1st, 2nd, and 3rd
- Points are awarded: 1st = 30pts, 2nd = 20pts, 3rd = 10pts
- Users can change their votes at any time
- Votes are persisted in localStorage

### Results Display

- Real-time calculation of dish rankings
- Visual indicators for user's own selections
- Statistics showing voting participation
- Responsive grid layout for all screen sizes

### Error Handling

- Network error handling for API calls
- Form validation with user-friendly messages
- Loading states for better UX
- Toast notifications for user feedback

## Development Notes

- The app uses static user authentication (no backend)
- Dish data is fetched from the GitHub API endpoint
- All data is persisted in localStorage for demo purposes
- The application is fully responsive and mobile-friendly
- Code follows React best practices with proper component structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes only.
