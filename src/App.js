import "./App.css";
import Navbar from "./components/Navbar";
import Newsbox from "./components/Newsbox";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <div className="App">
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
        shadow={true}
        height={1.75}
      />
        <Switch>
          <Route exact path="/">
            <Newsbox setProgress = {setProgress}  key="general" newsCategory="General" />
          </Route>
          <Route exact path="/business">
            <Newsbox setProgress = {setProgress}  key="business" newsCategory="Business" />
          </Route>
          <Route exact path="/entertainment">
            <Newsbox setProgress = {setProgress}  key="entertainment" newsCategory="Entertainment" />
          </Route>
          <Route exact path="/health">
            <Newsbox setProgress = {setProgress}  key="health" newsCategory="Health" />
          </Route>
          <Route exact path="/science">
            <Newsbox setProgress = {setProgress}  key="science" newsCategory="Science" />
          </Route>
          <Route exact path="/sports">
            <Newsbox setProgress = {setProgress}  key="sports" newsCategory="Sports" />
          </Route>
          <Route exact path="/technology">
            <Newsbox setProgress = {setProgress}  key="technology" newsCategory="Technology" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
