import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../../../hooks/useFormWithValidation";

export default function NewCard(): React.JSX.Element {
  const { currentUser, handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const user_id = currentUser?._id;
  const { errors, isValid, handleChange } = useFormWithValidation();
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
      <input
        id="card-name"
        className="popup__input popup__input_type_card-name"
        name="name"
        onChange={(e) => {
          setName(e.target.value);
          handleChange(e);
        }}
        placeholder="Título"
        minLength={2}
        maxLength={30}
        required
        type="text"
      />

      {<p className="form__error">{errors.name}</p>}

      <input
        id="card-url"
        className="popup__input popup__input_type_url"
        name="link"
        onChange={(e) => {
          setLink(e.target.value);
          handleChange(e);
        }}
        placeholder="Enlace de la imagen"
        required
        type="url"
      />
      {<p className="form__error">{errors.link}</p>}

      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Crear
      </button>
    </form>
  );
}
