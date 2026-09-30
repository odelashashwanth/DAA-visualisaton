# Selection Sort

## 📌 Overview

Selection Sort is a simple comparison-based sorting algorithm that arranges elements in ascending or descending order by repeatedly selecting the smallest or largest element from the unsorted portion of the array and placing it in its correct position. It follows the **Brute Force** approach.

## ⚙️ Algorithm

1. Start with an unsorted array.
2. Assume the first element of the unsorted portion is the minimum element.
3. Compare it with all the remaining elements in the unsorted portion.
4. Find the smallest element and store its index.
5. Swap the smallest element with the first element of the unsorted portion.
6. Move the boundary of the sorted portion one position to the right.
7. Repeat the process until the entire array is sorted.

## 💻 Example

**Array:** `[64, 25, 12, 22, 11]`

| Pass    | Minimum Element | Array After Pass   |
| ------- | --------------: | ------------------ |
| Initial |               — | 64, 25, 12, 22, 11 |
| Pass 1  |              11 | 11, 25, 12, 22, 64 |
| Pass 2  |              12 | 11, 12, 25, 22, 64 |
| Pass 3  |              22 | 11, 12, 22, 25, 64 |
| Pass 4  |              25 | 11, 12, 22, 25, 64 |

**Result:** `[11, 12, 22, 25, 64]`

## ⏱️ Time Complexity

| Case         | Complexity |
| ------------ | ---------- |
| Best Case    | O(n²)      |
| Average Case | O(n²)      |
| Worst Case   | O(n²)      |

## 💾 Space Complexity

* **Auxiliary Space:** O(1)
* **Sorting Type:** In-place
* **Stability:** Unstable (standard implementation)

## 🎯 Key Features

* Follows the Brute Force approach.
* Repeatedly selects the minimum element from the unsorted portion.
* Divides the array into sorted and unsorted portions.
* Performs at most `n - 1` swaps.
* Requires no additional array.
* Performs the same number of comparisons regardless of the initial order of elements.

## ✅ Conclusion

Selection Sort is a simple in-place sorting algorithm that repeatedly finds the minimum element and places it in its correct position. It requires O(n²) time complexity in the best, average and worst cases, but performs relatively few swaps, making it useful for learning sorting concepts and for small datasets.

---

**Algorithm:** Selection Sort
**Approach:** Brute Force
**Best Time Complexity:** O(n²)
**Average Time Complexity:** O(n²)
**Worst Time Complexity:** O(n²)
**Space Complexity:** O(1)
**Sorting Type:** In-place and Unstable
