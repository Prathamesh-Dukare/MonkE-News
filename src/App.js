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
            <Newsbox key="general"newsCategory="General" />
          </Route>
          <Route exact path="/business">
            <Newsbox key="business" newsCategory="Business" />
          </Route>
          <Route exact path="/entertainment">
            <Newsbox key="entertainment" newsCategory="Entertainment" />
          </Route>
          <Route exact path="/health">
            <Newsbox key="health" newsCategory="Health" />
          </Route>
          <Route exact path="/science">
            <Newsbox key="science" newsCategory="Science" />
          </Route>
          <Route exact path="/sports">
            <Newsbox key="sports" newsCategory="Sports" />
          </Route>
          <Route exact path="/technology">
            <Newsbox key="technology" newsCategory="Technology" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
