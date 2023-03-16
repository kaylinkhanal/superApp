import ConditionalRoute from "./routes/ConditionalRoute"
import Snackbar from "./components/alerts/snackBar"
import "./App.css"
import { useState } from "react";
import { useSelector } from "react-redux";
function App() {
  const { userRole } = useSelector(state => state.user)

  return (
    <div className="App" data-theme={userRole === 'rider' ? 'blue' : 'pink'}>
      <ConditionalRoute />
      <Snackbar />
    </div>
  );
}

export default App;
