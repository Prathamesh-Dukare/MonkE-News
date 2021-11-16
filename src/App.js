import "./App.css";
import Navbar from "./components/Navbar";
import Newsbox from "./components/Newsbox";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

function App() {
  const [progress, setProgress] = useState(10)
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  return (
    <div className="App">
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Switch>
          <Route exact path="/">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="general" boxTitle="Top Headlines of the Day" newsCategory="General" />
          </Route>
          <Route exact path="/business">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="business" boxTitle="Business News of the Day" newsCategory="Business" />
          </Route>
          <Route exact path="/entertainment">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="entertainment" boxTitle="Entertainment News of the Day" newsCategory="Entertainment" />
          </Route>
          <Route exact path="/health">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="health" boxTitle="Health News of the Day" newsCategory="Health" />
          </Route>
          <Route exact path="/science">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="science" boxTitle="Science News of the Day" newsCategory="Science" />
          </Route>
          <Route exact path="/sports">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="sports" boxTitle="Sports News of the Day" newsCategory="Sports" />
          </Route>
          <Route exact path="/technology">
            <Newsbox setProgress = {setProgress} apiKey={apiKey}  key="technology" boxTitle="Technology News of the Day" newsCategory="Technology" />
          </Route>         
        </Switch>
      </Router>
    </div>
  );
}
export default App;
