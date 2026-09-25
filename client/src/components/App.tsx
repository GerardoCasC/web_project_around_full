import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login.tsx";
import Register from "./Register/Register.tsx";
import { Routes, Route } from "react-router-dom";
import {
  ProtectedRoute,
  PublicRoute,
} from "../components/ProtectedRoute/ProtectedRoute.tsx";
import { useEffect, useState } from "react";
import api from "../utils/Api.ts";
import auth from "../utils/Auth.ts";
0;
import CurrentUserContext from "../contexts/CurrentUserContext";
import type {
  UserData,
  CardData,
  PopupConfig,
  FormEditValues,
  FormUpdateAvatar,
  FormAddCardValues,
  FormSignValues,
} from "../types/types.ts";

function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const [user, fullProfile, initialCards] = await Promise.all([
          auth.getCurrentUser(token),
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        const updatedUser = {
          ...user.data,
          ...fullProfile,
        };
        setCurrentUser(updatedUser);
        setCards(initialCards);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("auth-token");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const handleRegisterUser = async (userData: FormSignValues) => {
    try {
      const updatedUser = await auth.registerUser(userData);
      setCurrentUser(updatedUser.data);
    } catch (error) {
      throw error;
    }
  };
  async function login(token: string, user: UserData) {
    localStorage.setItem("auth-token", token);
    const [userData, initialCards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...userData,
      ...user,
    }));
    setCards(initialCards);
    setIsAuthenticated(true);
  }
  function logout() {
    localStorage.removeItem("auth-token");
    setCurrentUser(null);
    setIsAuthenticated(false);
  }
  const handleOpenPopup = (popup: PopupConfig) => {
    setPopup(popup);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };
  const handleCardLike = async (card: CardData) => {
    const isLiked = card.isLiked;
    try {
      const apiCall = isLiked
        ? api.deleteIsLiked(card._id)
        : api.putIsLiked(card._id);
      const newCard = await apiCall;
      setCards((state) => state.map((c) => (card._id === c._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardDelete = async (card: CardData) => {
    try {
      await api.deleteCard({ _id: card._id });
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateUser = async (userData: FormEditValues) => {
    try {
      const updatedUser = await api.updateInfoUser(userData);
      setCurrentUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateAvatar = async (avatarData: FormUpdateAvatar) => {
    try {
      const updatedUser = await api.updateAvatar(avatarData);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddPlaceSubmit = async (cardData: FormAddCardValues) => {
    try {
      const newCard = await api.addCard(cardData);
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
        handleRegisterUser,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      <div className="page__content">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Header />
                  <Main
                    cards={cards}
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    popup={popup}
                  />
                  <Footer />{" "}
                </>
              }
            ></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route
              path="/login"
              element={
                <>
                  {" "}
                  <Header />
                  <Login
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    popup={popup}
                  />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  {" "}
                  <Header />
                  <Register
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    popup={popup}
                  />
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
