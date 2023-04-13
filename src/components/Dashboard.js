import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/auth-context";
import { AgeInstance } from "../ethereum/age";
import useEthBalance from "../utils/useEthBalance";
import useContractData from "../utils/useContractData";
import "./dashboard.css";

function Dashboard() {
  const { auth, getMagic, getToken, magic } = useAuthContext();
  const [user, loading] = useAuthState(auth);
  const [number, setNumber] = useState("");
  const [isNum, setIsNum] = useState(true);
  const [metadata, setMetadata] = useState()
  const { caller, age } = useContractData();
  const balance = useEthBalance();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/", { replace: true });
    getMagic();
    getMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getMetadata = async () => {
    const isUserLoggedIn = await magic.user.isLoggedIn();
    if (isUserLoggedIn) {
      const metadata = await magic.user.getMetadata();
      setMetadata(metadata)
    }
  }

  const updateNewAge = async () => {
    if (isNaN(number) || !number) {
      setNumber("");
      setIsNum(false);
      return;
    }
    try {
      await AgeInstance.updateAge(+number, { });
      setNumber("");
      setIsNum(true);
    } catch (err) {
      console.log(err);
    }
  };

  const redirectUser = async () => {
    const jwt = await getToken();
    window.open(
      `https://reveal.magic.link/mws-firebase-demo/?token=${jwt}`,
      "_blank",
      "noreferrer"
    );
  };

  if (loading) {
    return (
      <div className="outerContainer">
        <div className="innerContainer">Loading</div>
      </div>
    );
  }

  return (
    <div className="dashboardOuterContainer">
      <div className="dashboardInnerContainer">
        <h2>{user.email}</h2>
        {!metadata || !balance ? (
          <h4>Loading...</h4>
        ) : (
          <>
            <h4>{metadata.publicAddress}</h4>
            <h4>{balance} ETH</h4>
          </>
        )}
        <div className="buttons">
          <a
            href="https://goerli.etherscan.io/address/0x04968C47eAF1D8c29e47954A68c2A6D4E4Ba0834"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn">View Smart Contract</button>
          </a>
          <button className="btn" onClick={redirectUser}>
            Reveal Private Key
          </button>
          <a
            href="https://goerli-faucet.pk910.de/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn">Goerli Faucet</button>
          </a>
        </div>
      </div>

      <div className="dashboardInnerContainer">
        <h2>What's My Age Again?</h2>
        {!caller || !age ? (
          <h4>Loading...</h4>
        ) : (
          <h4>
            {caller} is {age} years old
          </h4>
        )}
        <div>
          <input
            type="text"
            placeholder={isNum ? "Numbers only" : "NUMBERS ONLY!"}
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button onClick={updateNewAge} className="btn">
            Tell the World!
          </button>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
