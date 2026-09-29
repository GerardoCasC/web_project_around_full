import { createContext } from "react";
import type { CurrentUserContextType } from "../types/types";

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  handleUpdateUser: async () => {},
  handleUpdateAvatar: async () => {},
  handleAddPlaceSubmit: async () => {},
  handleRegisterUser: async () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export default CurrentUserContext;
