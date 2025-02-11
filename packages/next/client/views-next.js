import { hydrate, version } from './views-index'

window.next = {
  version,
  root: true,
}

// Override chunk URL mapping in the webpack runtime
// https://github.com/webpack/webpack/blob/2738eebc7880835d88c727d364ad37f3ec557593/lib/RuntimeGlobals.js#L204

// eslint-disable-next-line no-undef
const getChunkScriptFilename = __webpack_require__.u
const chunkFilenameMap = {}

// eslint-disable-next-line no-undef
__webpack_require__.u = (chunkId) => {
  return getChunkScriptFilename(chunkId) || chunkFilenameMap[chunkId]
}

// eslint-disable-next-line no-undef
globalThis.__next_chunk_load__ = (chunk) => {
  const [chunkId, chunkFileName] = chunk.split(':')
  chunkFilenameMap[chunkId] = `static/chunks/${chunkFileName}.js`

  // @ts-ignore
  // eslint-disable-next-line no-undef
  return __webpack_chunk_load__(chunkId)
}

hydrate()
