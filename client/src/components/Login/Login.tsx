import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import type { PopupConfig } from "../../types/types";
import Popup from "../Main/Popup/Popup";
import InfoTooltip from "../../components/InfoTooltip/InfoTooltip";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
interface LoginProps {
  handleOpenPopup: (popup: PopupConfig) => void;
  handleClosePopup: () => void;
  popup: PopupConfig | null;
}
function Login(props: LoginProps) {
  const { login } = useContext(CurrentUserContext);
  const { errors, handleChange } = useFormWithValidation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const errorPopup: PopupConfig = {
    title: "",
    children: <InfoTooltip isValidated={false} />,
  };
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      console.error(error);
      props.handleOpenPopup(errorPopup);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="login__form"
        id="login-form"
        name="login-form"
        noValidate
      >
        <p className="login__form-title">Inicia sesión</p>
        <label className="form__field">
          <input
            id="email"
            className="form__input formp__input_type_email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange(e);
            }}
            placeholder="Correo electrónico"
            minLength={2}
            maxLength={30}
            required
            type="email"
          />
        </label>
        {<p className="form__error">{errors.email}</p>}
        <label className="form__field">
          <input
            id="password"
            className="form__input form__input_type_password form__input--last"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange(e);
            }}
            placeholder="Contraseña"
            minLength={2}
            maxLength={30}
            required
            type="password"
          />
        </label>
        {<p className="form__error">{errors.password}</p>}
        <button className="button form__button" type="submit">
          Iniciar sesión
        </button>
        <p
          className="form__register-here-button"
          onClick={() => {
            navigate("/signup");
          }}
        >
          ¿Aún no eres miembro? Regístrate aquí.
        </p>
      </form>
      {props.popup && (
        <Popup
          onClose={props.handleClosePopup}
          isOpen={props.popup !== null}
          title={props.popup.title}
        >
          {props.popup.children}
        </Popup>
      )}
    </>
  );
}
export default Login;
