import logo from "/images/logo.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, currentUser } =
    useContext(CurrentUserContext);
  const isLoginPage = location.pathname === "/login";
  const ButtonText = isLoginPage ? "Registrarse" : "Iniciar sesión";
  const newRoute = isLoginPage ? "/register" : "/login";
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />
      <div className="header__right-section">
        {isAuthenticated ? (
          <>
            <p className="header__user-email">{currentUser?.email}</p>
            <button className="header__button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button className="header__button" onClick={() => navigate(newRoute)}>
            {ButtonText}
          </button>
        )}
      </div>
    </header>
  );
}
export default Header;
