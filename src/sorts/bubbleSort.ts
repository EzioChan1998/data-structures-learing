import {defaultCompare, Compare, swap} from "../utils/index";

/**
 * 冒泡排序
 * */
function bubbleSort<T = number>(array: T[], compareFn = defaultCompare) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }
}

function modifiedBubbleSort<T = number>(array: T[], compareFn = defaultCompare) {
 const { length } = array;
 for (let i = 0; i < length; i++) {
   for (let j = 0; j < length - 1 - i; j++) {
     // 因为倒数第i个已经排序过了，一定是最大的，所以可以排除后面i个
     if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
       swap(array, j, j + 1);
     }
   }
 }
}
