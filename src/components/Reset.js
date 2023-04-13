import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/auth-context";
import "./forms.css";

function Reset() {
  const { auth, sendPasswordReset } = useAuthContext();
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading, navigate]);

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
        <button
          className="btn"
          disabled={!email}
          onClick={() => sendPasswordReset(email)}
        >
          Send Reset Email
        </button>
        <button className="btn" onClick={() => navigate("/")}>
          &lArr; Back to Login
        </button>
      </div>
    </div>
  );
}
export default Reset;
