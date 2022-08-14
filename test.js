/**
 * @description:
 * @author: qi-you
 * @param {Array} ary
 * @return {*}
 */
function mySort(ary) {
  for (let i = 0; i < ary.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < ary.length; j++) {
      if (ary[j] < ary[minIndex]) {
        minIndex = j
      }
    }
    let tmp = ary[i]
    ary[i] = ary[minIndex]
    ary[minIndex] = tmp
  }
  return ary
}
// 随机的数的数组
let ary = [3, 23, 1, 323, 2, 43, 35, 24]
console.log(mySort(ary))
