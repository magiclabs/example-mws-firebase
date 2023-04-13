import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Header from "./components/Header";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
