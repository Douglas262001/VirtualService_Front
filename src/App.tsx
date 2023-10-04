import "./index.css";
import Router from "routes";

import { AppProvider } from "context";

function App() {
  localStorage.setItem("theme", "dark");

  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
