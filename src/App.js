import './App.scss';
import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom'
import Menu from './Menu.js'
import Page1 from './pages/p_1'
import Page2 from './pages/p_2'
import Page3 from './pages/p_3';
import Page4 from './pages/p_4';
import Page5 from './pages/p_5';

function App() {
  return (
    <Router>
      
        <>
          <Menu />
          <Switch>
            <Route path="/p_1">
              <Page1 />
            </Route>
            <Route path="/p_2">
              <Page2 />
            </Route>
            <Route path="/p_3">
              <Page3 />
            </Route>
            <Route path="/p_4">
              <Page4 />
            </Route>
            <Route path="/p_5">
              <Page5 />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </>
      
    </Router>
  )
}

function Home() {
  return (
    <div className="center">
      <h1>Cannon</h1>
      <hr></hr>
      <h2>For fast React and Three.js development</h2>
      <p>Blank project with react, react-router, react-three-fiber and @react-three/drei</p>
    </div>
  )
}

export default App;
