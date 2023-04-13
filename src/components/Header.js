import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/auth-context";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const { auth, logout } = useAuthContext();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="nav-bar">
      <a href="https://magic.link/" target="_blank" rel="noreferrer">
        <img src="/magic.png" alt="magic logo" width="50px" height="50px" />
      </a>
      <div className="nav-links">
        <NavLink className="nav-link" to="/dashboard">
          Home
        </NavLink>
        <NavLink
          className="nav-link"
          to="https://magic.link/docs/home/welcome"
          target="_blank"
        >
          Docs
        </NavLink>
        {user && (
          <div className="nav-link logout" onClick={handleLogout}>
            Logout
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
