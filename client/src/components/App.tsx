import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import { useEffect, useState } from 'react';
import api from '../utils/Api.ts';
import CurrentUserContext from '../contexts/CurrentUserContext';
import type { UserData, CardData, PopupConfig, FormEditValues, FormUpdateAvatar, FormAddCardValues} from '../types/types.ts';



function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<PopupConfig | null>(null);

  useEffect(() => { 
    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards()
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  
  function handleOpenPopup(popup: PopupConfig) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
const handleCardLike = async (card: CardData) => {
  const isLiked = card.isLiked;
  try {
    const apiCall = isLiked ? api.deleteIsLiked(card._id) : api.putIsLiked(card._id);
    const newCard = await apiCall;
    // Usamos .map para reemplazar solo la tarjeta que cambió
    setCards((state) => state.map((c) => card._id === c._id ? newCard : c));
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
    setCurrentUser(updatedUser);
    handleClosePopup();
  } catch (error) {
    console.error(error);
  }
}
 const handleUpdateAvatar= async (avatarData: FormUpdateAvatar) => {
  try {
    const updatedUser = await api.updateAvatar(avatarData);
    setCurrentUser(updatedUser);
    handleClosePopup();
  } catch (error) {
    console.error(error);
  }
}
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

    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }}>
      <div className='page__content'>
        <Header />
        <Main
          cards={cards}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          popup={popup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App
