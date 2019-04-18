module.exports = (l, valueKey = 'val', nextKey = 'next') => {
  let t = l, rtn = []
  while (t) {
    rtn.push(t[valueKey])
    t = t[nextKey]
  }
  return rtn
}