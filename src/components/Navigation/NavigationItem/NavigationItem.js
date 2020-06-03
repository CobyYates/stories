import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './NavigationItem.css'

const MenuItemPropType = PropTypes.shape({
  type: PropTypes.string,
  label: PropTypes.string
})

class NavigationItem extends React.Component {
  static propTypes = {
    menuItem: MenuItemPropType.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func
  };
  static defaultProps = {
    active: false,
    onClick: () => {}
  };

  handleClick = e => {
    this.props.onClick(this.props.menuItem)
  };

  render () {
    const { menuItem, active } = this.props
    return (
      <li
        key={menuItem.id}
        className={cx({
          [styles.menuItem]: true,
          [styles.active]: active
        })}
        onClick={this.handleClick}
      >
        {menuItem.label}
      </li>
    )
  }
}

export default NavigationItem
export const NavigationItemPropTypes = {
  menuItem: MenuItemPropType
}
