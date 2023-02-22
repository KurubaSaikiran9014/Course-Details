import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import CourseItemDetails from './components/CourseItemDetails'
import Home from './components/Home'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
