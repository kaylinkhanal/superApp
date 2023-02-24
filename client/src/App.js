import ConditionalRoute from "./routes/ConditionalRoute"
import Snackbar from "./components/alerts/snackBar"
import "./App.css"
function App() {
  return (
    <div className="App">
    <ConditionalRoute/>
    <Snackbar/>
    </div>
  );
}

export default App;
