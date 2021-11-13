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
            <Newsbox key="general" boxTitle="Top Headlines of the Day" newsCategory="General" />
          </Route>
          <Route exact path="/business">
            <Newsbox key="business" boxTitle="Business News of the Day" newsCategory="Business" />
          </Route>
          <Route exact path="/entertainment">
            <Newsbox key="entertainment" boxTitle="Entertainment News of the Day" newsCategory="Entertainment" />
          </Route>
          <Route exact path="/health">
            <Newsbox key="health" boxTitle="Health News of the Day" newsCategory="Health" />
          </Route>
          <Route exact path="/science">
            <Newsbox key="science" boxTitle="Science News of the Day" newsCategory="Science" />
          </Route>
          <Route exact path="/sports">
            <Newsbox key="sports" boxTitle="Sports News of the Day" newsCategory="Sports" />
          </Route>
          <Route exact path="/technology">
            <Newsbox key="technology" boxTitle="Technology News of the Day" newsCategory="Technology" />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}
export default App;
