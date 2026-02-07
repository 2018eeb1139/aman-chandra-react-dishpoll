import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import DishVoting from "./DishVoting";
import PollResults from "./PollResults";
import { Button } from "./ui/Button";
import { LogOut, Vote, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("voting");
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const tabs = [
    {
      id: "voting",
      label: "Vote for Dishes",
      icon: Vote,
      component: DishVoting,
    },
    {
      id: "results",
      label: "Poll Results",
      icon: BarChart3,
      component: PollResults,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dish Poll</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome,{" "}
                <span className="font-semibold">{currentUser?.username}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default Dashboard;
