# Linear Search

## 📌 Overview

Linear Search is a simple searching algorithm used to find a specific element in an array by checking each element sequentially from the beginning to the end. It follows the **Brute Force** approach and does not require the array to be sorted.

## ⚙️ Algorithm

1. Start from the first element of the array.
2. Compare the current element with the target element.
3. If both elements match, return the index of the target element.
4. If they do not match, move to the next element.
5. Repeat the process until the element is found or the end of the array is reached.
6. If the target element is not found, return `-1`.

## 💻 Example

**Array:** `[10, 25, 30, 45, 50]`
**Target:** `45`

| Step | Index | Element | Comparison  |
| ---- | ----: | ------: | ----------- |
| 1    |     0 |      10 | Not Matched |
| 2    |     1 |      25 | Not Matched |
| 3    |     2 |      30 | Not Matched |
| 4    |     3 |      45 | Matched     |

**Result:** Element `45` found at index `3`.

## ⏱️ Time Complexity

| Case         | Complexity |
| ------------ | ---------- |
| Best Case    | O(1)       |
| Average Case | O(n)       |
| Worst Case   | O(n)       |

## 💾 Space Complexity

* **Auxiliary Space:** O(1)
* **Approach:** Brute Force
* **Array Requirement:** Sorted or Unsorted

## 🎯 Key Features

* Simple and easy-to-implement searching algorithm.
* Searches elements sequentially, one by one.
* Does not require a sorted array.
* Works with arrays of any size.
* Suitable for small datasets and unsorted collections.
* Stops searching as soon as the target element is found.

## ✅ Conclusion

Linear Search is a straightforward searching algorithm that checks each element sequentially until the target is found or the array ends. It is easy to implement and works on both sorted and unsorted arrays, but its O(n) average and worst-case time complexity can make it less efficient for large datasets.

---

**Algorithm:** Linear Search
**Approach:** Brute Force
**Best Time Complexity:** O(1)
**Average Time Complexity:** O(n)
**Worst Time Complexity:** O(n)
**Space Complexity:** O(1)
**Prerequisite:** No Sorting Required
