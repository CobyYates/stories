import React from 'react'
import PropTypes from 'prop-types'
import styles from './Marker.css'

const MarkerPropType = PropTypes.shape({
  tokenId: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired
})

class Marker extends React.Component {
  static propTypes = {
    marker: MarkerPropType,
    currentTime: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.func
  };
  static defaultProps = {
    marker: null,
    currentTime: -1,
    onClick: () => null,
    children: PropTypes.func
  };

  handleClick = e => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onClick(this.props.marker)
  };

  render () {
    const { marker, currentTime, children } = this.props
    if (!marker) return children({ active: false })
    const active = currentTime >= marker.start && currentTime <= marker.end
    return (
      <div className={styles.marker} onClick={this.handleClick}>
        {children({ active })}
      </div>
    )
  }
}

export default Marker

export const MarkerPropTypes = {
  marker: MarkerPropType
}
