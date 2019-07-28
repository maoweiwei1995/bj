function Node(val) {
    this.val = val
    this.next = null
}
function reverse(head, start, end) {
    if (!head) {
        return null
    }
    let cur1 = head
    let cur2 = head
    while (start-- && cur1.next) {
        cur1 = cur1.next
    }
    while (end-- && cur2.next) {
        cur2 = cur2.next
    }
    while (cur1 !== cur2) {
        [cur1.val, cur2.val] = [cur2.val, cur1.val]
        cur1 = cur1.next
        cur2 = cur2.
    }
}