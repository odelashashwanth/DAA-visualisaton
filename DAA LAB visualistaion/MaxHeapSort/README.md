# Heap Sort (Max Heap)

## 📌 Overview

Heap Sort is a comparison-based sorting algorithm that uses a **Binary Heap** data structure to arrange elements in ascending or descending order. In Max Heap Sort, the largest element is maintained at the root of the heap. The algorithm repeatedly swaps the root element with the last element in the unsorted portion and restores the Max Heap property until the array is sorted.

It follows the **Divide and Conquer-inspired heap-based approach**.

## ⚙️ Algorithm

1. Start with an unsorted array.
2. Build a Max Heap from the given array, ensuring that every parent node is greater than or equal to its children.
3. Swap the root element (maximum value) with the last element of the heap.
4. Reduce the size of the heap by one, excluding the sorted element.
5. Apply the `heapify` operation to restore the Max Heap property.
6. Repeat the swapping and heapifying process until only one element remains in the heap.
7. The array is now sorted in ascending order.

## 💻 Example

**Array:** `[40, 10, 30, 50, 20]`

**Step 1: Build Max Heap**

`[50, 40, 30, 10, 20]`

**Step 2: Extract the maximum and heapify**

| Pass    | Operation               | Array              |
| ------- | ----------------------- | ------------------ |
| Initial | Max Heap                | 50, 40, 30, 10, 20 |
| Pass 1  | Swap 50 and 20, heapify | 40, 20, 30, 10, 50 |
| Pass 2  | Swap 40 and 10, heapify | 30, 20, 10, 40, 50 |
| Pass 3  | Swap 30 and 10, heapify | 20, 10, 30, 40, 50 |
| Pass 4  | Swap 20 and 10          | 10, 20, 30, 40, 50 |

**Result:** `[10, 20, 30, 40, 50]`

## ⏱️ Time Complexity

| Operation      | Complexity |
| -------------- | ---------- |
| Build Max Heap | O(n)       |
| Heapify        | O(log n)   |
| Best Case      | O(n log n) |
| Average Case   | O(n log n) |
| Worst Case     | O(n log n) |

## 💾 Space Complexity

* **Auxiliary Space:** O(1) for iterative in-place heapify.
* **Sorting Type:** In-place
* **Stability:** Unstable

## 🎯 Key Features

* Uses a Binary Heap data structure.
* Follows a heap-based sorting approach.
* Maintains the largest element at the root of a Max Heap.
* Sorts elements in ascending order using a Max Heap.
* Provides O(n log n) time complexity in the best, average and worst cases.
* Requires no additional array when implemented in-place.

## ✅ Conclusion

Heap Sort using a Max Heap is an efficient comparison-based sorting algorithm that repeatedly extracts the largest element and places it at the end of the unsorted portion. It provides O(n log n) time complexity in all cases and O(1) auxiliary space with an in-place iterative implementation, making it useful for sorting large datasets.

---

**Algorithm:** Heap Sort (Max Heap)
**Approach:** Heap-Based Sorting
**Data Structure:** Binary Heap
**Best Time Complexity:** O(n log n)
**Average Time Complexity:** O(n log n)
**Worst Time Complexity:** O(n log n)
**Space Complexity:** O(1)
**Sorting Order:** Ascending
**Sorting Type:** In-place and Unstable
