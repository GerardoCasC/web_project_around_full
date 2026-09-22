
import Popup from './Popup/Popup'
import type { PopupConfig, CardData } from '../../types/types'
import NewCard from './Popup/NewCard/NewCard'
import EditProfile from './Popup/EditProfile/EditProfile'
import EditAvatar from './Popup/EditAvatar/EditAvatar'
import Card from './Card/Card'
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

interface MainProps {
  cards: CardData[];
  handleOpenPopup: (popup: PopupConfig) => void;
  handleClosePopup: () => void;
  handleCardLike: (card: CardData) => void;
  handleCardDelete: (card: CardData) => void;
  popup: PopupConfig | null;
}

export default function Main(props: MainProps): React.JSX.Element {
  const { currentUser } = useContext(CurrentUserContext);
    const newCardPopup: PopupConfig = {
        title: "Nuevo lugar",
        children: <NewCard />
    };
    const editProfilePopup: PopupConfig = {
        title: "Editar perfil",
        children: <EditProfile />
    };
    const editAvatarPopup: PopupConfig = {
        title: "Editar avatar",
        children: <EditAvatar />
    };


    return (
        <main className="content">
        <section className="profile page__section">
          <div className="profile-avatar-container">
            <img 
          className='profile__image' 
          src={currentUser?.avatar} 
          alt={currentUser?.name} 
        />
            <button
              className="edit__image-button"
              aria-label="Cambiar foto de perfil"
              type="button"
              onClick={() => props.handleOpenPopup(editAvatarPopup)}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className='profile__title'>{currentUser?.name}</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={() => props.handleOpenPopup(editProfilePopup)}
            ></button>
            <p className='profile__description'>{currentUser?.about}</p>
          </div>
          <button
            aria-label="Agregar tarjeta"
            className="profile__add-button"
            type="button"
            onClick={() => props.handleOpenPopup(newCardPopup)}
          ></button>
        </section>
        <section className="cards page__section">
          <ul className="cards__list">
    {props.cards.map((card) => (
      <Card 
      key={card._id} 
      card={card} 
      onOpen={props.handleOpenPopup} 
      onClose={props.handleClosePopup}
      handleCardLike={props.handleCardLike}
      handleCardDelete={props.handleCardDelete}
      />
    ))}
  </ul>
        </section>
        {props.popup && (
        <Popup 
            onClose={props.handleClosePopup} 
            title={props.popup.title}
            isOpen={props.popup !== null}
        >
          {props.popup.children}
        </Popup>
      )}
      </main>
    )
}
