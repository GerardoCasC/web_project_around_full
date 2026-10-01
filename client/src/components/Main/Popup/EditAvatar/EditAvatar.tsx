import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../../../hooks/useFormWithValidation";

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);
  const { errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (avatarRef.current) {
      handleUpdateAvatar({ avatar: avatarRef.current.value });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      id="new-card-form"
      noValidate
    >
      <input
        className="popup__input popup__input_type_url"
        name="avatar"
        placeholder="Enlace a la imagen"
        type="url"
        ref={avatarRef}
        onChange={handleChange}
        required
      />
      {<p className="form__error">{errors.avatar}</p>}
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
