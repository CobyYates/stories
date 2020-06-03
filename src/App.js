import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import movies from './movies'
import Storefront from './components/Storefront'
import Player from './components/Player'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' render={() => <Storefront movies={movies} />} />
      <Route
        exact
        path='/movies/:slug'
        render={({ match }) => {
          const { slug } = match.params
          const movie = movies.find(
            possibleMovie => slug === possibleMovie.slug
          )
          return movie ? <Player movie={movie} /> : <Redirect to='/' />
        }}
      />
      <Redirect to='/' />
    </Switch>
  </Router>
)

export default App
