import keyBy from 'lodash/keyBy'
import tokens from './tokens'
import markers from './markers'
import notes from './notes'
import notesMenu from './notes-menu'
import src from './casablanca-clip.mp4'
import thumbnail from './thumbnail.png'

const noteMarkers = keyBy(markers, 'noteId')
const tokenMarkers = keyBy(markers, 'tokenId')

delete noteMarkers['undefined']
delete tokenMarkers['undefined']

export default {
  title: 'Casablanca',
  slug: 'casablanca-clip',
  thumbnail,
  src,
  tokens,
  notes,
  notesMenu,
  markers,
  noteMarkers,
  tokenMarkers
}
