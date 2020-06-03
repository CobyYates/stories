import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './MovieThumbnail.css'

const MoviePropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
})

class MovieThumbnail extends React.Component {
  static propTypes = {
    movie: MoviePropType.isRequired
  };
  static defaultProps = {};

  render () {
    const { movie } = this.props
    return (
      <div className={styles.wrapper}>
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className={styles.thumbnail}
        />
        <div className={styles.description}>
          <h4 className={styles.title}>{movie.title}</h4>
          <Link className={styles.link} to={`/movies/${movie.slug}`}>
            View
          </Link>
        </div>
      </div>
    )
  }
}

export default MovieThumbnail
export const MovieThumbnailPropTypes = {
  movie: MoviePropType
}
