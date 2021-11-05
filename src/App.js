import "./App.css";
import Navbar from "./components/Navbar";
import Newsbox from "./components/Newsbox";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Newsbox key="general" boxTitle="Top Headlines of the Day" newsCategory="general" />
          </Route>
          <Route exact path="/business">
            <Newsbox key="business" boxTitle="Business News of the Day" newsCategory="business" />
          </Route>
          <Route exact path="/entertainment">
            <Newsbox key="entertainment" boxTitle="Entertainment News of the Day" newsCategory="entertainment" />
          </Route>
          <Route exact path="/health">
            <Newsbox key="health" boxTitle="Health News of the Day" newsCategory="health" />
          </Route>
          <Route exact path="/science">
            <Newsbox key="science" boxTitle="Science News of the Day" newsCategory="science" />
          </Route>
          <Route exact path="/sports">
            <Newsbox key="sports" boxTitle="Sports News of the Day" newsCategory="sports" />
          </Route>
          <Route exact path="/technology">
            <Newsbox key="technology" boxTitle="Technology News of the Day" newsCategory="technology" />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}
export default App;
