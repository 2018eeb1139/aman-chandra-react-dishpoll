import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import { VotingProvider } from "./contexts/VotingContext.jsx";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

const AppRoutes = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={currentUser ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={
          <Navigate to={currentUser ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <VotingProvider>
          <div className="App">
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#4aed88",
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: "#ff6b6b",
                  },
                },
              }}
            />
          </div>
        </VotingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
