let urls = {}
const req = require.context('./url', false, /\.js$/)

const requireAll = requireContext => requireContext.keys().map(i => {
  let url = requireContext(i)
  Object.assign(urls, url.default)
})
requireAll(req)

export default urls
