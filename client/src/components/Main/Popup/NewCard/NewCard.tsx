import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function NewCard(): React.JSX.Element {
  const { currentUser, handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const user_id = currentUser?._id;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleAddPlaceSubmit({ name, link, user_id });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      id="new-card-form"
      name="new-card-form"
      noValidate
    >
      <label className="popup__field">
        <input
          id="card-name"
          className="popup__input popup__input_type_card-name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Título"
          minLength={2}
          maxLength={30}
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          id="card-url"
          className="popup__input popup__input_type_url"
          name="link"
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enlace de la imagen"
          required
          type="url"
        />
        <span className="popup__error" id="card-url-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
