import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import Login from "./components/Login";
import useToken from "./components/useToken";

function App() {
  const { setToken, token } = useToken();

  if(token !== '0') {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <Router>
        <Routes/>
      </Router>
    </>
  );
}

export default App;
