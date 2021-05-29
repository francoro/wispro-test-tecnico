import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from './modules/views/pages/Login'
import  Dashboard from './modules/views/pages/Dashboard'
import { store } from '../src/modules/configureStore'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <Router> 
        <Switch>
          <Route exact={true} path="/">
            <Login />
          </Route>
          <Route exact={true} path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </Router>
    </Provider>
  );
}

export default App;
