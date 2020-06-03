import React from 'react'
import PropTypes from 'prop-types'
import NavigationItem, { NavigationItemPropTypes } from './NavigationItem'
import styles from './Navigation.css'

const MenuPropType = PropTypes.arrayOf(NavigationItemPropTypes.menuItem)

class Navigation extends React.Component {
  static propTypes = {
    menu: MenuPropType,
    activeMenuItem: PropTypes.shape({
      type: PropTypes.string
    }),
    onSelect: PropTypes.func
  };
  static defaultProps = {
    menu: [],
    onSelect: () => {}
  };

  createMenuItemClickHandler = menuItem => {
    return () => this.props.onSelect(menuItem)
  };

  render () {
    const { menu, activeMenuItem } = this.props
    const activeType = activeMenuItem && activeMenuItem.type
    return (
      <div className={styles.menuWrapper}>
        <ul className={styles.menu}>
          {menu.map(menuItem => (
            <NavigationItem
              key={menuItem.type}
              active={menuItem.type === activeType}
              menuItem={menuItem}
              onClick={this.props.onSelect}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Navigation
export const NavigationPropTypes = {
  menu: MenuPropType
}
