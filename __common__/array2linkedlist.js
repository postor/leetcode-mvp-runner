module.exports = (arr = [], valueKey = 'val', nextKey = 'next') => {
  if (!arr.length) return null
  let h = {
    [valueKey]: arr[0]
  }
  let t = h
  for (let i = 1; i < arr.length; i++) {
    t[nextKey] = {
      [valueKey]: arr[i]
    }
    t = t[nextKey]
  }
  return h
}