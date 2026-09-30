# Merge Sort

## 📌 Overview

Merge Sort is an efficient comparison-based sorting algorithm that follows the **Divide and Conquer** approach. It divides an unsorted array into smaller subarrays, sorts them recursively, and then merges the sorted subarrays to produce a fully sorted array.

## ⚙️ Algorithm

1. Start with an unsorted array.
2. Divide the array into two halves.
3. Recursively divide each half until every subarray contains only one element.
4. Compare the elements of the smaller subarrays.
5. Merge the subarrays in sorted order.
6. Repeat the merging process until all subarrays are combined into one sorted array.
7. Display the final sorted array.

## 💻 Example

**Array:** `[40, 10, 30, 20, 50, 60, 15, 5]`

**Step 1: Divide**

```text
           [40, 10, 30, 20, 50, 60, 15, 5]
                  /                \
        [40, 10, 30, 20]       [50, 60, 15, 5]
           /       \              /       \
       [40, 10]  [30, 20]      [50, 60]  [15, 5]
        /   \      /   \        /   \      /   \
      [40] [10]  [30] [20]    [50] [60]  [15] [5]
```

**Step 2: Merge**

```text
       [10, 40]  [20, 30]    [50, 60]  [5, 15]
             \     /              \     /
          [10, 20, 30, 40]    [5, 15, 50, 60]
                   \              /
          [5, 10, 15, 20, 30, 40, 50, 60]
```

**Result:** `[5, 10, 15, 20, 30, 40, 50, 60]`

## ⏱️ Time Complexity

| Case         | Complexity |
| ------------ | ---------- |
| Best Case    | O(n log n) |
| Average Case | O(n log n) |
| Worst Case   | O(n log n) |

## 💾 Space Complexity

* **Auxiliary Space:** O(n) for the temporary arrays used during merging.
* **Recursion Stack:** O(log n)
* **Sorting Type:** Out-of-place
* **Stability:** Stable

## 🎯 Key Features

* Follows the Divide and Conquer approach.
* Divides the array into smaller subarrays.
* Recursively sorts and merges subarrays.
* Provides O(n log n) time complexity in all cases.
* Maintains the relative order of equal elements.
* Requires additional memory for merging.
* Suitable for sorting large datasets.

## ✅ Conclusion

Merge Sort is an efficient and stable sorting algorithm that uses the Divide and Conquer technique to divide an array into smaller parts, sort them, and merge them into a final sorted array. Its O(n log n) time complexity makes it suitable for large datasets, although it requires O(n) additional space for merging.

---

**Algorithm:** Merge Sort
**Approach:** Divide and Conquer
**Best Time Complexity:** O(n log n)
**Average Time Complexity:** O(n log n)
**Worst Time Complexity:** O(n log n)
**Space Complexity:** O(n)
**Sorting Type:** Stable and Out-of-place
