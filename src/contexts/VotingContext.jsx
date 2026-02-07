import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const VotingContext = createContext();

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
};

export const VotingProvider = ({ children }) => {
  const [userVotes, setUserVotes] = useState({});
  const [allVotes, setAllVotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedVotes = localStorage.getItem("allVotes");
    if (savedVotes) {
      setAllVotes(JSON.parse(savedVotes));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("allVotes", JSON.stringify(allVotes));
    }
  }, [allVotes, isLoading]);

  const updateUserVotes = (userId, votes) => {
    try {
      setUserVotes(votes);
      setAllVotes((prev) => ({
        ...prev,
        [userId]: votes,
      }));
      toast.success("Your votes have been saved!");
    } catch (error) {
      console.error("Error saving votes:", error);
      toast.error("Failed to save votes");
    }
  };

  const voteForDish = (userId, dishId, rank) => {
    try {
      const currentVotes = allVotes[userId] || {};

      // Remove the rank
      const newVotes = { ...currentVotes };
      Object.keys(newVotes).forEach((r) => {
        if (newVotes[r] === dishId) {
          console.log("remove the rank");
          delete newVotes[r];
        }
      });

      // same rank, remove it
      if (rank && newVotes[rank]) {
        console.log("I am here already");
        const oldDishId = newVotes[rank];
        delete newVotes[rank];
      }

      // Add the new vote
      if (rank) {
        console.log("new Added");
        newVotes[rank] = dishId;
      }

      updateUserVotes(userId, newVotes);
      return { success: true };
    } catch (error) {
      console.error("Error voting for dish:", error);
      toast.error("Failed to vote for dish");
      return { success: false, error: "Voting failed" };
    }
  };

  const calculateDishPoints = () => {
    const points = {};

    Object.values(allVotes).forEach((userVoteMap) => {
      Object.entries(userVoteMap).forEach(([rank, dishId]) => {
        if (!points[dishId]) {
          points[dishId] = 0;
        }

        switch (rank) {
          case "1":
            points[dishId] += 30;
            break;
          case "2":
            points[dishId] += 20;
            break;
          case "3":
            points[dishId] += 10;
            break;
        }
      });
    });

    return points;
  };

  const getUserVoteForDish = (userId, dishId) => {
    const userVotes = allVotes[userId] || {};
    for (const [rank, votedDishId] of Object.entries(userVotes)) {
      if (votedDishId === dishId) {
        return parseInt(rank);
      }
    }
    return null;
  };

  const value = {
    userVotes: allVotes,
    voteForDish,
    calculateDishPoints,
    getUserVoteForDish,
    isLoading,
  };

  return (
    <VotingContext.Provider value={value}>{children}</VotingContext.Provider>
  );
};
