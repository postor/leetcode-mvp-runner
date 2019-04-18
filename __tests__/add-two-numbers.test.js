const rewire = require('rewire')
const arr2linked = require('../__common__/array2linkedlist')
const linked2arr = require('../__common__/linkedlist2array')
const datas = require('../__data__/add-two-numbers.data')
const ListNode = require('../__common__/ListNode')

const app = rewire('../answers/add-two-numbers.js')
app.__set__('ListNode', ListNode)
addTwoNumbers = app.__get__('addTwoNumbers')

describe('add-two-numbers', function () {
  datas.forEach(({ params, result }, i) => {
    it(`case ${i}`, function () {
      let rtn = addTwoNumbers(...params.map(x => arr2linked(x)))
      expect(linked2arr(rtn)).toEqual(result)
    })
  })
});