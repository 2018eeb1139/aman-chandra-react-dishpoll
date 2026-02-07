import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useVoting } from "../contexts/VotingContext.jsx";
import { fetchDishes } from "../services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Trophy, Medal, Award, User } from "lucide-react";

const PollResults = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { calculateDishPoints, getUserVoteForDish } = useVoting();

  useEffect(() => {
    const loadDishes = async () => {
      try {
        setIsLoading(true);
        const result = await fetchDishes();
        if (result.success) {
          setDishes(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError("Failed to load dishes");
        console.error("Error loading dishes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDishes();
  }, []);

  const getRankedDishes = () => {
    const points = calculateDishPoints();

    return dishes
      .map((dish) => ({
        ...dish,
        points: points[dish.id] || 0,
        userRank: getUserVoteForDish(currentUser.id, dish.id),
      }))
      .sort((a, b) => b.points - a.points);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">
            #{rank}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const rankedDishes = getRankedDishes();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Poll Results</h1>
        <p className="text-gray-600">See how dishes rank based on user votes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Current Rankings
          </h2>
          {rankedDishes.map((dish, index) => (
            <Card
              key={dish.id}
              className={`hover:shadow-md transition-shadow ${
                dish.userRank ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>

                  <div className="flex-shrink-0">
                    <img
                      src={dish.image}
                      alt={dish.dishName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">
                      {dish.dishName}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {dish.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {dish.points}
                    </div>
                    <div className="text-sm text-gray-500">points</div>
                  </div>
                </div>

                {dish.userRank && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <User className="w-4 h-4" />
                      <span>You ranked this #{dish.userRank}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Selections
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Votes</CardTitle>
              <CardDescription>
                See where your selected dishes stand in the overall rankings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rankedDishes.filter((dish) => dish.userRank).length > 0 ? (
                <div className="space-y-3">
                  {rankedDishes
                    .filter((dish) => dish.userRank)
                    .sort((a, b) => a.userRank - b.userRank)
                    .map((dish) => (
                      <div
                        key={dish.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            dish.userRank === 1
                              ? "bg-yellow-500"
                              : dish.userRank === 2
                                ? "bg-gray-500"
                                : "bg-orange-500"
                          }`}
                        >
                          {dish.userRank}
                        </div>
                        <img
                          src={dish.image}
                          alt={dish.dishName}
                          className="w-10 h-10 rounded object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/40x40?text=No+Image";
                          }}
                        />
                        <div className="flex-grow">
                          <div className="font-medium text-gray-900">
                            {dish.dishName}
                          </div>
                          <div className="text-sm text-gray-600">
                            Overall Rank: #{rankedDishes.indexOf(dish) + 1} (
                            {dish.points} points)
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You haven't voted for any dishes yet.</p>
                  <p className="text-sm mt-2">
                    Go to the voting tab to make your selections!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Dishes</span>
                  <span className="font-semibold">{dishes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dishes with Votes</span>
                  <span className="font-semibold">
                    {rankedDishes.filter((d) => d.points > 0).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Votes</span>
                  <span className="font-semibold">
                    {rankedDishes.filter((d) => d.userRank).length}/3
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Total Points Distributed
                  </span>
                  <span className="font-semibold">
                    {rankedDishes.reduce((sum, d) => sum + d.points, 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
