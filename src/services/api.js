import toast from "react-hot-toast";

const API_BASE_URL =
  "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json";

export const fetchDishes = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching dishes:", error);
    toast.error("Failed to load dishes. Please try again later.");
    return { success: false, error: error.message };
  }
};

export const getDishById = (dishes, id) => {
  return dishes.find((dish) => dish.id === parseInt(id));
};
