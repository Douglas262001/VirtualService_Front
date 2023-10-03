import "./index.css";
import Router from "routes";

import { AppProvider } from "context";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
