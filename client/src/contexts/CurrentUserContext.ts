import { createContext } from "react";
import type { CurrentUserContextType } from "../types/types";

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  handleUpdateUser: async (userData) => {},
  handleUpdateAvatar: async (avatarData) => {},
  handleAddPlaceSubmit: async (cardData) => {},
  handleRegisterUser: async (userData) => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export default CurrentUserContext;
