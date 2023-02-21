import ConditionalRoute from "./routes/ConditionalRoute"
import "./App.css"
import CustomSnackbar from "./components/alerts/snackBar";
function App() {
  return (
    <div className="App">
      <ConditionalRoute />
      <CustomSnackbar />
    </div>
  );
}

export default App;
