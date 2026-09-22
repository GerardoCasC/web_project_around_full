import { useRef, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext'; 


export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (avatarRef.current) {
      handleUpdateAvatar({ avatar: avatarRef.current.value });
    }
  };

    return(
        <form onSubmit={handleSubmit} className="popup__form" id="new-card-form" noValidate>
            <input
              
              className="popup__input popup__input_type_url"
              name="avatar"
              placeholder="Enlace a la imagen"
              type="url"
              ref={avatarRef}
              required
            />
            <span className="avatar-input-error popup__input-error"></span>
            <button className="button popup__button" type="submit">Guardar</button>
          </form>
    )
}