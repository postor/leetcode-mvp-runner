const rewire = require('rewire')
const datas = require('../__data__/two-sum.data')
const app = rewire('../answers/two-sum.js')


twoSum = app.__get__('twoSum');

describe('tow-sum', function () {
  datas.forEach(({ params, result }, i) => {
    it(`Input ${params.map(JSON.stringify).join(',')} Expect ${JSON.stringify(result)}`, function () {
      let rtn = twoSum(...params)
      expect(result.sort()).toEqual(rtn.sort())
    })
  })
});