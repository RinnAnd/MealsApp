import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMeals = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesLocalStorage = () => {
  let favorites = localStorage.getItem("favorites");
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesLocalStorage);

  const fetchD = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const fetchRandom = () => {
    fetchD(randomMeal);
  };

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelected(meal);
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFav = favorites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFav) return;
    const updatedFav = [...favorites, meal];
    setFavorites(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
  };

  const removeFavorites = (idMeal) => {
    const updatedFav = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
  };

  useEffect(() => {
    fetchD(`${allMeals}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandom,
        showModal,
        selectMeal,
        selected,
        closeModal,
        addToFavorites,
        removeFavorites,
        favorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
