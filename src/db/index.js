// db.js
import Dexie from 'dexie';

export const db = new Dexie('MeshTAK');
db.version(1).stores({
  nodes: '&nodeNum, snr, lastHeard, channel, longName, shortName, *teams, nickname, favorite',
  locations: '&nodeNum, lastSeen, lat, lon, alt',
  messages: '&id, rxTime, type, from, to, channel, data',
  settings: '&key',
  layers: "&id, name, display",
  layerData: '&id, geometry, name, layer'
})

export default db