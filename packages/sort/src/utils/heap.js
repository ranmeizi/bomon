export class MinHeap {
  array = []

  // 创建一个新的实例
  static new() {
      return new MinHeap()
  }

  // 由array获取一个新的示例并排列成堆
  static from(array) {
      const instance = new MinHeap()
      instance.init(array)

      return instance
  }

  init(array) {
      for (let el of array) {
          this.push(el)
      }
  }

  size() {
      return this.array.length
  }

  push(el) {
      this.array.push(el)
      this.percikateUp(this.array.length - 1)
  }

  pop() {
      this.swap(0, this.array.length - 1)
      const res = this.array.pop()
      this.percikateDown(0)
      return res
  }

  left(index) {
      let res = 2 * index + 1
      return res < this.array.length
          ? res
          : null
  }

  right(index) {
      let res = 2 * index + 2
      return res < this.array.length
          ? res
          : null
  }

  parent(index) {
      return index === 0 ? null : Math.floor(index / 2)
  }

  swap(i1, i2) {
      let temp = this.array[i1]
      this.array[i1] = this.array[i2]
      this.array[i2] = temp
  }

  percikateUp(index) {
      let pIndex = this.parent(index)
      if (pIndex === null) {
          return
      }
      let p = this.array[pIndex]
      let curr = this.array[index]

      if (p > curr) {
          this.swap(pIndex, index)
          this.percikateUp(pIndex)
      }
  }

  percikateDown(index) {
      let leftIndex = this.left(index)
      let rightIndex = this.right(index)

      if (leftIndex === null && rightIndex === null) {
          return
      }

      let son
      let sonIndex

      if (leftIndex !== null && rightIndex !== null) {
          const left = this.array[leftIndex]
          const right = this.array[rightIndex];
          [son, sonIndex] = left > right
              ? [right, rightIndex]
              : [left, leftIndex]
      } else {
          [son, sonIndex] = leftIndex === null
              ? [this.array[rightIndex], rightIndex]
              : [this.array[leftIndex], leftIndex]
      }

      let curr = this.array[index]

      if (curr > son) {
          this.swap(index, sonIndex)
          this.percikateDown(sonIndex)
      }
  }
}