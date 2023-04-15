export default function (root) {
  const pops = []
  function extractPopulatedFields (data, kk) {
    if (Array.isArray(data)) return data.map(extractPopulatedFields)
    else if (data && typeof data === 'object') {
      Object.keys(data).forEach(k => {
        if (typeof data[k] === 'object')
          data[k] = extractPopulatedFields(data[k], k)
      })
      if (data !== root && data.hasOwnProperty('_id') && data.hasOwnProperty('__model')) {
        pops.push(data)
        return data._id
      }
    }
    return data
  }
  const raw = extractPopulatedFields(root)
  return { raw, pops, rootId: raw._id }
}
