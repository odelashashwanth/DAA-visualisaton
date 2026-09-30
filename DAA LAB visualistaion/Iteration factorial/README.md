# Iterative Factorial

## 📌 Overview

Iterative Factorial is a mathematical programming approach used to calculate the factorial of a non-negative integer using loops instead of recursion. The factorial of a number `n` is the product of all positive integers from `1` to `n`, represented as `n!`.

**Formula:**

`n! = n × (n-1) × (n-2) × ... × 1`

**Special Case:** `0! = 1`

## ⚙️ Algorithm

1. Start by taking a non-negative integer `n`.
2. Initialize a variable `factorial = 1`.
3. Use a loop starting from `1` up to `n`.
4. Multiply the factorial variable by the current loop value.
5. Repeat until the loop reaches `n`.
6. Display the final factorial value.

## 💻 Example

**Input:** `5`

| Iteration | Calculation | Factorial |
| --------- | ----------- | --------: |
| Initial   | —           |         1 |
| 1         | 1 × 1       |         1 |
| 2         | 1 × 2       |         2 |
| 3         | 2 × 3       |         6 |
| 4         | 6 × 4       |        24 |
| 5         | 24 × 5      |       120 |

**Output:** `5! = 120`

## ⏱️ Time Complexity

| Case         | Complexity |
| ------------ | ---------- |
| Best Case    | O(n)       |
| Average Case | O(n)       |
| Worst Case   | O(n)       |

## 💾 Space Complexity

* **Auxiliary Space:** O(1)
* **Approach:** Iterative
* **Recursion:** Not Used

## 🎯 Key Features

* Uses loops to calculate factorial.
* Simple and easy to implement.
* Avoids recursive function calls and their stack overhead.
* Uses constant auxiliary space.
* Works with non-negative integers.

## ✅ Conclusion

Iterative Factorial is a simple approach to calculating the factorial of a number using loops. It avoids recursion and provides O(n) time complexity with O(1) auxiliary space, making it memory-efficient for factorial calculations.

---

**Algorithm:** Iterative Factorial
**Approach:** Iteration
**Best Time Complexity:** O(n)
**Average Time Complexity:** O(n)
**Worst Time Complexity:** O(n)
**Space Complexity:** O(1)
**Technique:** Loop-based Calculation
