import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useVoting } from "../contexts/VotingContext.jsx";
import { fetchDishes } from "../services/api";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Trophy, Award, Medal } from "lucide-react";

const DishVoting = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { voteForDish, getUserVoteForDish } = useVoting();

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

  const handleVote = (dishId, rank) => {
    if (!currentUser) return;

    voteForDish(currentUser.id, dishId, rank);
  };

  const getRankButtonVariant = (dishId, rank) => {
    const currentRank = getUserVoteForDish(currentUser.id, dishId);
    if (currentRank === rank) return "default";
    return "outline";
  };

  const getRankButtonText = (dishId, rank) => {
    const currentRank = getUserVoteForDish(currentUser.id, dishId);
    if (currentRank === rank) return `Rank ${rank}`;
    return `Rank ${rank}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dishes...</p>
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
          <CardContent>
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vote for Your Favorite Dishes
        </h1>
        <p className="text-gray-600">Select your top 3 dishes and rank them</p>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Rank 1: 30 points</span>
          </div>
          <div className="flex items-center gap-1">
            <Medal className="w-4 h-4 text-gray-400" />
            <span>Rank 2: 20 points</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-orange-400" />
            <span>Rank 3: 10 points</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => {
          const currentRank = getUserVoteForDish(currentUser.id, dish.id);

          return (
            <Card
              key={dish.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.dishName}
                  className="w-full h-full object-cover"
                />
                {currentRank && (
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-bold ${
                      currentRank === 1
                        ? "bg-yellow-500"
                        : currentRank === 2
                          ? "bg-gray-500"
                          : "bg-orange-500"
                    }`}
                  >
                    Rank {currentRank}
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{dish.dishName}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {dish.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">Select rank:</p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((rank) => (
                      <Button
                        key={rank}
                        variant={getRankButtonVariant(dish.id, rank)}
                        size="sm"
                        onClick={() => handleVote(dish.id, rank)}
                        className="flex-1"
                      >
                        {getRankButtonText(dish.id, rank)}
                      </Button>
                    ))}
                  </div>
                  {currentRank && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(dish.id, null)}
                      className="w-full mt-2 text-red-600 hover:text-red-700"
                    >
                      Remove Vote
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DishVoting;
