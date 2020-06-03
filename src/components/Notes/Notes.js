import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './Notes.css'

const NotesPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })
)
const MarkersPropType = PropTypes.objectOf(
  PropTypes.shape({
    noteId: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
  })
)

class Notes extends React.Component {
  static propTypes = {
    notes: NotesPropType,
    currentTime: PropTypes.number,
    activeMenuItem: PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string
    }),
    markers: MarkersPropType.isRequired
  };
  static defaultProps = {
    notes: [],
    currentTime: -1
  };

  get filteredNotes () {
    const { activeMenuItem, currentTime, notes, markers } = this.props
    if (!activeMenuItem) return []
    return notes.filter(note => {
      if (note.type !== activeMenuItem.type) return false
      const marker = markers[note.id]
      if (!marker) return false
      return currentTime >= marker.start && currentTime <= marker.end
    })
  }

  renderTitle = notes => {
    if (!notes.length) return null
    return (
      <p className={styles.notesLabel}>{this.props.activeMenuItem.label}</p>
    )
  };

  render () {
    const notes = this.filteredNotes
    const notesClasses = cx({
      [styles.notes]: true,
      [styles.active]: Boolean(this.props.activeMenuItem)
    })
    return (
      <div className={styles.notesWrapper}>
        <div className={notesClasses}>
          {this.renderTitle(notes)}
          {notes.map(note => (
            <div key={note.id} className={styles.note}>{note.text}</div>
          ))}
        </div>
      </div>
    )
  }
}

export default Notes
export const NotesPropTypes = {
  notes: NotesPropType,
  markers: MarkersPropType
}
