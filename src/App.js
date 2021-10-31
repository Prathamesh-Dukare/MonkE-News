import "./App.css";
import Navbar from "./components/Navbar";
import Newsbox from "./components/Newsbox";

function App() {
	
	return (
		<div className="App">
			<Navbar />
			<Newsbox boxTitle ="Top Headlines of the Day" />
		</div>
	);
}
export default App;
