# Insertion Sort

## 📌 Overview

Insertion Sort is a simple comparison-based sorting algorithm that arranges elements in ascending or descending order by inserting each element into its correct position in the already sorted portion of the array. It follows the **Incremental Approach**, similar to arranging playing cards in your hand.

## ⚙️ Algorithm

1. Start from the second element of the array, considering the first element as already sorted.
2. Store the current element in a variable called `key`.
3. Compare the key with the elements in the sorted portion of the array.
4. Shift all elements greater than the key one position to the right.
5. Insert the key into its correct position.
6. Repeat the process for every remaining element until the entire array is sorted.

## 💻 Example

**Array:** `[50, 20, 40, 10, 30]`

| Pass    | Key | Array              |
| ------- | --: | ------------------ |
| Initial |   — | 50, 20, 40, 10, 30 |
| Pass 1  |  20 | 20, 50, 40, 10, 30 |
| Pass 2  |  40 | 20, 40, 50, 10, 30 |
| Pass 3  |  10 | 10, 20, 40, 50, 30 |
| Pass 4  |  30 | 10, 20, 30, 40, 50 |

**Result:** `[10, 20, 30, 40, 50]`

## ⏱️ Time Complexity

| Case         | Complexity |
| ------------ | ---------- |
| Best Case    | O(n)       |
| Average Case | O(n²)      |
| Worst Case   | O(n²)      |

## 💾 Space Complexity

* **Auxiliary Space:** O(1)
* **Sorting Type:** In-place
* **Stability:** Stable

## 🎯 Key Features

* Follows the Incremental Approach.
* Builds a sorted portion of the array one element at a time.
* Efficient for small or nearly sorted datasets.
* Uses shifting instead of repeatedly swapping adjacent elements.
* Requires no additional array.
* Maintains the relative order of equal elements.

## ✅ Conclusion

Insertion Sort is a simple and efficient sorting algorithm for small and nearly sorted datasets. It works by selecting one element at a time and inserting it into its correct position in the sorted portion of the array. Its O(n²) average and worst-case time complexity makes it less suitable for large, randomly ordered datasets.

---

**Algorithm:** Insertion Sort
**Approach:** Incremental Approach
**Best Time Complexity:** O(n)
**Average Time Complexity:** O(n²)
**Worst Time Complexity:** O(n²)
**Space Complexity:** O(1)
**Sorting Type:** In-place and Stable
