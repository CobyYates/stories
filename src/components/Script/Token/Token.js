import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './Token.css'

const TokenPropType = PropTypes.shape({
  type: PropTypes.oneOf([
    'action',
    'character',
    'dialogue',
    'dialogue_end',
    'dialogue_begin',
    'page_break',
    'parenthetical',
    'scene_heading',
    'transition'
  ]).isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string
})

class Token extends React.Component {
  static propTypes = {
    token: TokenPropType.isRequired,
    active: PropTypes.bool,
    onActivate: PropTypes.func
  };
  static defaultProps = {
    active: false,
    onActivate: () => {}
  };

  componentWillReceiveProps (nextProps) {
    if (!this.props.active && nextProps.active) {
      this.props.onActivate(this.elem)
    }
  }

  setTokenElemRef = n => {
    this.elem = n
  };

  render () {
    const { token, active } = this.props
    const wrapperClass = cx({
      [styles.token]: true,
      [styles.tokenType]: true,
      [styles[`tokenType--${token.type}`]]: true,
      [styles.active]: active
    })
    return (
      <div className={wrapperClass} ref={this.setTokenElemRef}>
        <div className={styles.content}>{token.text || ''}</div>
      </div>
    )
  }
}

export default Token

export const TokenPropTypes = {
  token: TokenPropType
}
