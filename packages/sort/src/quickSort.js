import swap from "./utils/swap"

export function sort(nums) {
    quickSort(nums, 0, nums.length - 1)
    return nums
}

function quickSort(nums, l, r) {
    if (l < r) {
        // 开始分割
        const pos = randomizedPartition(nums, l, r)

        quickSort(nums, l, pos - 1)
        quickSort(nums, pos + 1, r)
    }
}

function partition(nums, l, r) {
    const pivot = nums[r]

    let i = l - 1

    for (let j = l; j <= r - 1; j++) {
        if (nums[j] <= pivot) {
            // 如果 j 搜索到小数了，那么 +1 换
            i++
            swap(nums, i, j)
        }
    }
    // 最后把末尾 r 的 pivot 和 i+1 的大数换
    swap(nums, i + 1, r)

    return i + 1
}

function randomizedPartition(nums, l, r) {

    // 随机选择一个位置
    const i = Math.floor(Math.random() * (r - l) + l)

    // 放到最后
    swap(nums, i, r)

    // 用i位分割数组
    return partition(nums, l, r)
}
