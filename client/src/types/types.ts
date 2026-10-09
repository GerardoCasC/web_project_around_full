export type PopupConfig = {
  title?: string;
  children: React.ReactNode;
};
export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface UserData {
  about: string;
  avatar: string;
  name: string;
  _id: string;
  email: string;
}
export interface FormEditValues {
  name: string;
  about: string;
}
export interface FormSignValues {
  password: string;
  email: string;
}
export interface FormUpdateAvatar {
  avatar: string;
}
export interface FormAddCardValues {
  name: string;
  link: string;
  user_id: string | undefined;
}
export interface CardId {
  _id: string;
}
export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (userData: FormEditValues) => Promise<void>;
  handleUpdateAvatar: (avatarData: FormUpdateAvatar) => Promise<void>;
  handleAddPlaceSubmit: (cardData: FormAddCardValues) => Promise<void>;
  handleRegisterUser: (userData: FormSignValues) => Promise<void>;
  isAuthenticated: boolean;
  login: (user: FormSignValues) => void;
  logout: () => void;
  isLoading: boolean;
}
