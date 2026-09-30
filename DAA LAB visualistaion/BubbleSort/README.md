# Bubble Sort

## 📌 Overview

Bubble Sort is a simple sorting algorithm that arranges elements in ascending or descending order by repeatedly comparing adjacent elements and swapping them if they are in the wrong order. It follows the **Brute Force** approach, and with an optimized implementation, it can stop early if the array is already sorted.

## ⚙️ Algorithm

1. Start from the first element of the array.
2. Compare each pair of adjacent elements.
3. If the current element is greater than the next element, swap them.
4. Continue comparing and swapping adjacent elements until the end of the array.
5. After each pass, the largest unsorted element moves to its correct position.
6. Repeat the process until the array is sorted.
7. If no swaps occur during a pass, stop the algorithm early.

## 💻 Example

**Array:** `[50, 20, 40, 10, 30]`

| Pass    | Array              |
| ------- | ------------------ |
| Initial | 50, 20, 40, 10, 30 |
| Pass 1  | 20, 40, 10, 30, 50 |
| Pass 2  | 20, 10, 30, 40, 50 |
| Pass 3  | 10, 20, 30, 40, 50 |
| Pass 4  | 10, 20, 30, 40, 50 |

**Result:** `[10, 20, 30, 40, 50]`

## ⏱️ Time Complexity

| Case                  | Complexity |
| --------------------- | ---------- |
| Best Case (Optimized) | O(n)       |
| Average Case          | O(n²)      |
| Worst Case            | O(n²)      |

## 💾 Space Complexity

* **Auxiliary Space:** O(1)
* **Sorting Type:** In-place
* **Stability:** Stable

## 🎯 Key Features

* Simple and easy-to-understand sorting algorithm.
* Uses adjacent element comparisons and swapping.
* Follows the Brute Force approach.
* Largest unsorted element moves to its correct position after each pass in ascending order.
* Requires no additional array.
* Optimized Bubble Sort can terminate early if no swaps occur.

## ✅ Conclusion

Bubble Sort is a basic comparison-based sorting algorithm that repeatedly swaps adjacent elements to arrange them in the correct order. Although it is easy to implement and understand, its O(n²) average and worst-case time complexity makes it less suitable for large datasets.

---

**Algorithm:** Bubble Sort
**Approach:** Brute Force
**Best Time Complexity (Optimized):** O(n)
**Average Time Complexity:** O(n²)
**Worst Time Complexity:** O(n²)
**Space Complexity:** O(1)
**Sorting Type:** In-place and Stable
