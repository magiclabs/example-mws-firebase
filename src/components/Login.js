import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthContext } from "../store/auth-context";
import "./forms.css";

function Login() {
  const { auth, logInWithEmailAndPassword } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="outer">
        <div className="inner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <input
          type="text"
          className="textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="btn"
          disabled={!email || !password}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="btn" onClick={() => navigate("/reset")}>
          Reset Password &rArr;
        </button>
        <button className="btn" onClick={() => navigate("/register")}>
          Create Account &rArr;
        </button>
      </div>
    </div>
  );
}
export default Login;
