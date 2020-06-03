import React from 'react'
import PropTypes from 'prop-types'
import styles from './SyncScroll.css'

function easeInOutQuad (t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

class SyncScroll extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
    easing: PropTypes.func,
    duration: PropTypes.number,
    sync: PropTypes.bool
  };
  static defaultProps = {
    interval: 16,
    easing: easeInOutQuad,
    duration: 300,
    sync: true
  };

  componentWillReceiveProps (nextProps) {
    if (!nextProps.sync) this.clearInterval()
  }

  clearInterval = () => {
    clearInterval(this._interval)
    delete this._interval
  };

  syncToElement = activeElem => {
    if (!this.props.sync) return
    if (this._interval) this.clearInterval()
    const startLocation = this.elem.scrollTop
    const elemOffset = activeElem.offsetTop - this.elem.offsetTop
    const scrollTop = Math.max(0, elemOffset - 30)
    const distance = scrollTop - startLocation
    /**
     * Reset position to fix weird iOS bug
     * @link https://github.com/cferdinandi/smooth-scroll/issues/45
     */
    if (this.elem.scrollTop === 0 || this.elem.pageYOffset === 0) {
      this.elem.scrollTop = 0
    }
    let timeLapsed = 0

    this._interval = setInterval(() => {
      timeLapsed += this.props.interval
      const percentage = Math.min(timeLapsed / this.props.duration, 1)
      const position = startLocation + distance * this.props.easing(percentage)
      this.elem.scrollTop = Math.floor(position)
      if (timeLapsed >= this.props.duration) {
        this.elem.scrollTop = scrollTop
        this.clearInterval()
      }
    }, this.props.interval)
  };

  setElemRef = n => {
    this.elem = n
  };

  render () {
    return (
      <div className={styles.syncScroll} ref={this.setElemRef}>
        {this.props.children(this.syncToElement)}
      </div>
    )
  }
}

export default SyncScroll
