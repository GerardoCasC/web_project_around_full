import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      id="edit-profile-form"
      noValidate
    >
      <input
        className="popup__input popup__input_type_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        placeholder="Nombre"
        type="text"
        minLength={2}
        maxLength={40}
        required
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="about"
        placeholder="Acerca de mí"
        type="text"
        minLength={2}
        maxLength={200}
        required
      />
      <span className="about-input-error popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
