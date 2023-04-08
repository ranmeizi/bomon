import { MinHeap } from "./utils/heap";

export function sort(nums) {
  heapSort(nums);
  return nums;
}

function heapSort(nums) {
  const heap = MinHeap.from(nums);
  const sortArr = [];
  while (heap.size() > 0) {
    sortArr.push(heap.pop());
  }
  return sortArr;
}
