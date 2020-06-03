import React from 'react'
import PropTypes from 'prop-types'
import Movie from '../Movie'
import Script, { ScriptPropTypes } from '../Script'
import Navigation, { NavigationPropTypes } from '../Navigation'
import Notes, { NotesPropTypes } from '../Notes'
import styles from './Player.css'

const MoviePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  tokens: ScriptPropTypes.tokens.isRequired,
  tokenMarkers: ScriptPropTypes.markers.isRequired,
  notesMenu: NavigationPropTypes.menu.isRequired,
  notes: NotesPropTypes.notes.isRequired,
  noteMarkers: NotesPropTypes.markers.isRequired
})

class Player extends React.Component {
  static propTypes = {
    movie: MoviePropType.isRequired
  };
  static defaultProps = {};
  state = {
    currentTime: 0,
    activeMenuItem: null,
    syncScript: true
  };

  handleMovieProgress = newTime => this.setState({ currentTime: newTime });
  handleSetMarker = marker =>
    this.setState({
      currentTime: marker.start,
      syncScript: true
    });
  handleSelect = menuItem => {
    const activeMenuItem = this.state.activeMenuItem === menuItem.type
      ? null
      : menuItem
    this.setState({ activeMenuItem })
  };
  handleScriptTouch = () => this.setState({ syncScript: false });

  render () {
    const { currentTime, activeMenuItem } = this.state
    const { movie } = this.props
    return (
      <div className={styles.player}>
        <div className={styles.movieWrapper}>
          <Movie
            currentTime={currentTime}
            src={movie.src}
            onProgress={this.handleMovieProgress}
          />
          <Notes
            notes={movie.notes}
            currentTime={currentTime}
            activeMenuItem={activeMenuItem}
            markers={movie.noteMarkers}
          />
        </div>
        <div className={styles.movieHelpers}>
          <div
            className={styles.scriptWrapper}
            onTouchStart={this.handleScriptTouch}
          >
            <Script
              tokens={movie.tokens}
              markers={movie.tokenMarkers}
              currentTime={currentTime}
              onSetMarker={this.handleSetMarker}
            />
          </div>
          <div className={styles.navigationWrapper}>
            <Navigation
              menu={movie.notesMenu}
              activeMenuItem={activeMenuItem}
              onSelect={this.handleSelect}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Player
