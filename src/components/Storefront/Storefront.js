import React from 'react'
import PropTypes from 'prop-types'
import MovieThumbnail, { MovieThumbnailPropTypes } from '../MovieThumbnail'
import styles from './Storefront.css'

class Storefront extends React.Component {
  static propTypes = {
    movies: PropTypes.arrayOf(MovieThumbnailPropTypes.movie).isRequired
  };
  static defaultProps = {};

  render () {
    const { movies } = this.props
    return (
      <div>
        <h1 className={styles.title}>
          <strong>Cinematic</strong> Storytelling
        </h1>
        <div className={styles.thumbnailGrid}>
          {movies.map((movie, i) => (
            <div className={styles.thumbnail} key={movie.slug + i}>
              <MovieThumbnail movie={movie} />
            </div>
          ))}
          {/* Hack to get the alignment to work right on the last row */}
          {/* See https://stackoverflow.com/questions/16377972/how-to-align-left-last-row-line-in-multiple-line-flexbox#26504823 */}
          {movies.map((_, i) => (
            <div
              className={styles.thumbnailAlignment}
              key={`alignment-placeholder[${i}]`}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Storefront
