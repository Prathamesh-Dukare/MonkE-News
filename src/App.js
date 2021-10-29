import "./App.css";
import Navbar from "./components/Navbar";
import Newsbox from "./components/Newsbox";
import Newsitem from "./components/Newsitem";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Newsbox />
      <Newsitem />
    </div>
  );
}

export default App;
