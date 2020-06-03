import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import styles from './Movie.css'

const SORRY_MSG = "Sorry, your browser doesn't support embedded videos"

class Movie extends React.Component {
  static propTypes = {
    currentTime: PropTypes.number,
    onProgress: PropTypes.func,
    src: PropTypes.string,
    progressFrequency: PropTypes.number
  };
  static defaultProps = {
    currentTime: 0,
    progressFrequency: 20,
    onUpdate: () => {}
  };
  state = {
    previousTime: 0
  };

  constructor (props) {
    super(props)
    this.updateListener = debounce(
      this.handleProgress,
      props.progressFrequency
    )
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentTime !== this.state.previousTime) {
      this.player.currentTime = nextProps.currentTime
    }
  }

  componentDidMount () {
    this.player.addEventListener('timeupdate', this.updateListener)
    this.player.controlsList = 'nodownload'
  }

  componentWillUnmount () {
    this.player.removeEventListener('timeupdate', this.updateListener)
  }

  setupRefPlayer = n => {
    this.player = n
  };

  handleProgress = ({ target }) => {
    const time = target.currentTime
    this.setState({ previousTime: time })
    this.props.onProgress(time)
  };

  render () {
    const { src } = this.props
    return (
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          src={src}
          ref={this.setupRefPlayer}
          controls
        >
          {SORRY_MSG}
        </video>
      </div>
    )
  }
}

export default Movie
