/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  return add(l1,l2)
};

function add(la,lb,step=0){
  if(!la&&!lb&&!step) return null
  
  var val = (la?la.val:0)+(lb?lb.val:0)+step
  var newStep = val>=10?1:0
  var newVal = val>=10?val-10:val
  
  var node = new ListNode(newVal)
  node.next = add(la?la.next:null,lb?lb.next:null,newStep)
  return node
}