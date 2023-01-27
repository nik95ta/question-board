import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./containers/Header"
import QuestionListing from './containers/QuestionListing';
import QuestionDetail from './containers/QuestionDetail';

function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={QuestionListing} />
            <Route path="/question/:questionId" exact component={QuestionDetail} />
            <Route>404 Not Found!</Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
