# Binary Search

## 📌 Overview

Binary Search is an efficient searching algorithm used to find a specific element in a **sorted array**. It follows the **Divide and Conquer** approach by repeatedly dividing the search space into two halves and eliminating the half that cannot contain the target element.

## ⚙️ Algorithm

1. Initialize two pointers: `low = 0` and `high = n - 1`.
2. Calculate the middle index using `mid = low + (high - low) / 2`.
3. Compare the middle element with the target element.
4. If the middle element matches the target, return its index.
5. If the target is smaller, search the left half by updating `high = mid - 1`.
6. If the target is larger, search the right half by updating `low = mid + 1`.
7. Repeat until the element is found or `low > high`.

## 💻 Example

**Array:** `[10, 20, 30, 40, 50, 60, 70]`
**Target:** `50`

| Step | Low | High | Mid | Mid Element |
| ---- | --: | ---: | --: | ----------: |
| 1    |   0 |    6 |   3 |          40 |
| 2    |   4 |    6 |   5 |          60 |
| 3    |   4 |    4 |   4 |          50 |

**Result:** Element `50` found at index `4`.

## ⏱️ Time Complexity

| Case         | Complexity |
| ------------ | ---------- |
| Best Case    | O(1)       |
| Average Case | O(log n)   |
| Worst Case   | O(log n)   |

## 💾 Space Complexity

* **Iterative:** O(1)
* **Recursive:** O(log n), due to the recursion stack.

## 🎯 Key Features

* Uses the Divide and Conquer approach.
* Requires a sorted array.
* Reduces the search space by half in every iteration.
* More efficient than Linear Search for large, sorted datasets.

## ✅ Conclusion

Binary Search is a fast and efficient searching algorithm that finds elements in a sorted array by repeatedly dividing the search space into halves. Its logarithmic time complexity makes it suitable for searching large datasets.

---

**Algorithm:** Binary Search
**Approach:** Divide and Conquer
**Best Time Complexity:** O(1)
**Average & Worst Time Complexity:** O(log n)
**Space Complexity (Iterative):** O(1)
**Prerequisite:** Sorted Array
