import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../../../hooks/useFormWithValidation";

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [description, setDescription] = useState(currentUser?.about || "");
  const { errors, isValid, handleChange } = useFormWithValidation();

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
        onChange={(e) => {
          setName(e.target.value);
          handleChange(e);
        }}
        name="name"
        placeholder="Nombre"
        type="text"
        minLength={2}
        maxLength={40}
        required
      />
      {<p className="form__error">{errors.name}</p>}
      <input
        className="popup__input popup__input_type_about"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          handleChange(e);
        }}
        name="about"
        placeholder="Acerca de mí"
        type="text"
        minLength={2}
        maxLength={200}
        required
      />
      {errors.about && <p className="form__error">{errors.about}</p>}
      <button
        className="button popup__button"
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </form>
  );
}
