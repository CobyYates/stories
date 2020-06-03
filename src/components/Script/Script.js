import React from 'react'
import PropTypes from 'prop-types'
import Token, { TokenPropTypes } from './Token'
import Marker, { MarkerPropTypes } from './Marker'
import SyncScroll from './SyncScroll'
import style from './Script.css'

const TokensPropType = PropTypes.arrayOf(TokenPropTypes.token)
const MarkersPropType = PropTypes.objectOf(MarkerPropTypes.marker)

class Script extends React.Component {
  static propTypes = {
    tokens: TokensPropType,
    markers: MarkersPropType,
    currentTime: PropTypes.number,
    onSetMarker: PropTypes.func,
    sync: PropTypes.bool
  };
  static defaultProps = {
    tokens: [],
    markers: {},
    currentTime: -1,
    onSetMarker: () => {},
    sync: true
  };

  handleMarkerClick = marker => this.props.onSetMarker(marker);

  render () {
    const { tokens, markers, currentTime, sync } = this.props
    return (
      <SyncScroll sync={sync}>
        {syncToElem => (
          <div className={style.script}>
            {tokens.map(token => (
              <Marker
                key={token.id}
                currentTime={currentTime}
                marker={markers[token.id]}
                onClick={this.handleMarkerClick}
              >
                {({ active }) => (
                  <Token
                    key={token.id}
                    token={token}
                    active={active}
                    onActivate={syncToElem}
                  />
                )}
              </Marker>
            ))}
          </div>
        )}
      </SyncScroll>
    )
  }
}

export default Script

export const ScriptPropTypes = {
  tokens: TokensPropType,
  markers: MarkersPropType
}
