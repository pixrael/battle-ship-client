import MainPage from './pages/MainPage'
import BattlePage from './pages/BattlePage';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

function App() {
  return (<>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route exact path="/battle-page/:id" render={(props) => <BattlePage battleId={props} />} />
      </Switch>
    </Router>

  </>);
}

export default App;
