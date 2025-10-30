// db.js
import Dexie from 'dexie';

export const db = new Dexie('MeshTAK');
db.version(1).stores({
  nodes: '&nodeNum, snr, lastHeard, channel, longName, shortName, *teams, nickname, favorite',
  locations: '&nodeNum, lastSeen, lat, lon, alt',
  messages: '&id, datetime, type, from, to, channel, data'
})

export default db