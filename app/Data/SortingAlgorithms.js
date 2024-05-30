export const sorting_algorithms = [
  {
    title: "Bubble Sort",
    description:
      "Bubble sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    catchyShortDescription:
      "Compares adjacent elements and swaps if necessary.",
    text: "Bubble sort is straightforward to understand and implement, making it a popular choice for educational purposes. However, it is inefficient for large lists due to its quadratic time complexity. To perform a bubble sort, the algorithm iterates through the list multiple times, comparing adjacent elements and swapping them if they are in the wrong order. This process continues until the list is sorted. Bubble sort is stable and requires minimal additional memory, making it suitable for small datasets or partially sorted lists.",
    examples: [
      "Sorting an array of integers in ascending order.",
      "Arranging student scores from lowest to highest.",
      "Sorting a list of names alphabetically.",
    ],
    // bannerImage: "https://i.imgur.com/nLExTno.png",
    // imageURL: "https://i.imgur.com/Ap5pgcs.gif",
    bannerImage: require("../../assets/images/sorting/bubble sort banner.png"),
    imageURL: require("../../assets/images/sorting/bubble sort image.gif"),
    CodeSnippt: `// Function to perform Bubble Sort on an array
function bubbleSort(arr) {
  const n = arr.length; // Length of the array

  // Outer loop for controlling passes through the array
  for (let i = 0; i < n - 1; i++) {
    // Inner loop for comparing adjacent elements
    // The range decreases with each pass as the largest unsorted element bubbles up
    for (let j = 0; j < n - i - 1; j++) {
      // If the current element is greater than the next element, swap them
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap using destructuring assignment
      }
    }
  }

  return arr; // Return the sorted array
}
`,
    Approach: [
      "Iterate through the array from the beginning.",
      "Compare adjacent elements and swap if they are in the wrong order.",
      "Repeat this process until no more swaps are needed.",
    ],
    Complexity:
      "Bubble sort has a time complexity of O(n^2) due to its nested iteration over the array, and it operates in constant space as it sorts the elements in place without using additional memory.",
    TimeComplexity: ["O(n)", "O(n^2)", "O(n^2)"],
    SpaceComplexity: ["O(1)", "O(1)", "O(1)"],
  },
  {
    title: "Insertion Sort",
    description:
      "Insertion sort is a simple comparison-based sorting algorithm. It builds the final sorted list one element at a time by repeatedly taking the next element and inserting it into the correct position.",
    catchyShortDescription:
      "Builds the sorted list by inserting elements in order.",
    text: "Insertion sort is efficient for small datasets or nearly sorted lists but becomes inefficient for large lists due to its quadratic time complexity. To perform an insertion sort, the algorithm iterates through the list, taking one element at a time and inserting it into its correct position in the sorted part of the list. This process continues until all elements are in place. Insertion sort is stable, in-place, and adaptive, making it suitable for situations where the list is nearly sorted or contains a small number of elements.",
    examples: [
      "Sorting a deck of cards in a player's hand.",
      "Arranging students in a classroom based on their roll numbers.",
      "Sorting a list of dates in chronological order.",
    ],
    // bannerImage: "https://i.imgur.com/60PKRiw.jpeg",
    // imageURL: "https://i.imgur.com/rtA4YQk.gif",
    bannerImage: require("../../assets/images/sorting/insert sort banner.jpg"),
    imageURL: require("../../assets/images/sorting/insert sort image.gif"),
    CodeSnippt: `
function insertionSort(arr) {
  // Get the length of the array
  const n = arr.length;

  // Loop through the array starting from the second element
  for (let i = 1; i < n; i++) {
      // Store the current element to be inserted
      let key = arr[i];
      // Initialize a variable to traverse the sorted portion of the array
      let j = i - 1;

      // Move elements of arr[0..i-1], that are greater than key,
      // to one position ahead of their current position
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }

      // Insert the key into its correct position
      arr[j + 1] = key;
    }

  // Return the sorted array
  return arr;
}
  `,
    Approach: [
      "Start with the second element and compare it with the elements before it.",
      "Insert the element into its correct position among the sorted elements.",
      "Repeat this process for each element in the array.",
    ],
    Complexity:
      "Insertion sort has a quadratic time complexity of O(n^2) because it iterates over the array and shifts elements to insert each element into its proper position, and it operates in constant space as it sorts the elements in place.",
    TimeComplexity: ["O(n)", "O(n^2)", "O(n^2)"],
    SpaceComplexity: ["O(1)", "O(1)", "O(1)"],
  },
  {
    title: "Selection Sort",
    description:
      "Selection sort is a simple comparison-based sorting algorithm. It divides the input list into two parts: the sorted sublist and the unsorted sublist. It repeatedly selects the minimum (or maximum) element from the unsorted sublist and swaps it with the leftmost unsorted element.",
    catchyShortDescription:
      "Selects the minimum element and swaps it with the first unsorted element.",
    text: "Selection sort is straightforward to implement but inefficient for large datasets due to its quadratic time complexity. To perform a selection sort, the algorithm divides the input list into two parts: the sorted sublist and the unsorted sublist. Initially, the sorted sublist is empty, while the unsorted sublist contains all elements. The algorithm repeatedly selects the minimum element from the unsorted sublist and swaps it with the leftmost unsorted element, expanding the sorted sublist. This process continues until the entire list is sorted. Selection sort is not stable but requires minimal additional memory.",
    examples: [
      "Arranging a list of numbers in ascending order.",
      "Sorting a list of students based on their exam scores.",
      "Selecting the top K elements from a list.",
    ],
    // bannerImage: "https://i.imgur.com/sMnSioL.jpeg",
    // imageURL: "https://i.imgur.com/UQY5oZS.gif",
    bannerImage: require("../../assets/images/sorting/selection sort banner.jpg"),
    imageURL: require("../../assets/images/sorting/selection sort image.gif"),
    CodeSnippt: `
function selectionSort(arr) {
  // Get the length of the array
  const n = arr.length;

  // Iterate through the array from the first element to the second last element
  for (let i = 0; i < n - 1; i++) {
    // Assume the current index has the minimum value
    let minIndex = i;

    // Iterate through the unsorted portion of the array to find the index of the minimum element
    for (let j = i + 1; j < n; j++) {
      // If a smaller element is found, update minIndex
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the current element with the minimum element found
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  // Return the sorted array
  return arr;
}
  `,
    Approach: [
      "Divide the array into two subarrays: sorted and unsorted.",
      "Select the minimum element from the unsorted subarray and swap it with the leftmost element of the unsorted subarray.",
      "Expand the sorted subarray by one element and repeat the process until the entire array is sorted.",
    ],
    Complexity:
      "Selection sort has a time complexity of O(n^2) because it repeatedly selects the minimum element from the unsorted part of the array, and it operates in constant space as it sorts the elements in place.",
    TimeComplexity: ["O(n^2)", "O(n^2)", "O(n^2)"],
    SpaceComplexity: ["O(1)", "O(1)", "O(1)"],
  },
  {
    title: "Merge Sort",
    description:
      "Merge sort is a divide-and-conquer sorting algorithm. It divides the input list into smaller sublists, sorts each sublist recursively, and then merges them back together to produce the final sorted list.",
    catchyShortDescription:
      "Divides the list into sublists, sorts them, and merges them back together.",
    text: "Merge sort is efficient for large datasets due to its guaranteed O(n log n) time complexity. To perform a merge sort, the algorithm divides the input list into two halves, sorts each half recursively using merge sort, and then merges the sorted halves back together. The merging process combines two sorted sublists into a single sorted list. Merge sort is stable, predictable, and not affected by the initial order of elements, making it suitable for sorting linked lists and external sorting applications. However, it requires additional memory for the merge step.",
    examples: [
      "Sorting a list of names in alphabetical order.",
      "Merging two sorted arrays into a single sorted array.",
      "Sorting a list of timestamps in chronological order.",
    ],
    // bannerImage: "https://i.imgur.com/qd9yVxX.png",
    // imageURL: "https://i.imgur.com/EH9JIGo.gif",
    bannerImage: require("../../assets/images/sorting/merge sort banner.png"),
    imageURL: require("../../assets/images/sorting/merge sort image.gif"),
    CodeSnippt: `
// Merge Sort function
function mergeSort(arr) {
  // Base case: if the array has 0 or 1 elements, it's already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Find the middle index of the array
  const middle = Math.floor(arr.length / 2);

  // Recursively sort the left and right halves of the array
  const leftHalf = mergeSort(arr.slice(0, middle));
  const rightHalf = mergeSort(arr.slice(middle));

  // Merge the sorted halves
  return merge(leftHalf, rightHalf);
}

// Merge function to merge two sorted arrays
function merge(left, right) {
  let result = []; // Initialize an empty array to store the merged result
  let leftIndex = 0; // Initialize index for the left array
  let rightIndex = 0; // Initialize index for the right array

  // Iterate through both arrays until reaching the end of either array
  while (leftIndex < left.length && rightIndex < right.length) {
    // Compare elements from both arrays
    if (left[leftIndex] < right[rightIndex]) {
      // If the element from the left array is smaller, push it to the result
      result.push(left[leftIndex]);
      leftIndex++; // Move to the next element in the left array
    } else {
      // If the element from the right array is smaller, push it to the result
      result.push(right[rightIndex]);
      rightIndex++; // Move to the next element in the right array
    }
  }

  // Concatenate the remaining elements from the left and right arrays (if any)
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
    Approach: [
      "Divide the array into two halves.",
      "Recursively sort each half using merge sort.",
      "Merge the sorted halves back together.",
    ],
    Complexity:
      "Merge sort has a time complexity of O(n log n) due to its divide-and-conquer approach, and it requires additional space proportional to the size of the input list for merging.",
    TimeComplexity: ["O(n log n)", "O(n log n)", "O(n log n)"],
    SpaceComplexity: ["O(n)", "O(n)", "O(n)"],
  },
  {
    title: "Quick Sort",
    description:
      "Quick sort is a divide-and-conquer sorting algorithm. It divides the input list into two sublists, recursively sorts each sublist, and then combines them in sorted order.",
    catchyShortDescription:
      "Divides the list into sublists, sorts them recursively, and combines them.",
    text: "Quick sort is efficient for large datasets and has an average-case time complexity of O(n log n). To perform a quick sort, the algorithm selects a pivot element from the list, partitions the remaining elements into two sublists based on the pivot, and recursively sorts each sublist. The key operation in quick sort is the partitioning step, which rearranges the elements such that all elements less than the pivot are on its left, and all elements greater than the pivot are on its right. Quick sort is not stable but can be implemented in-place, requiring minimal additional memory.",
    examples: [
      "Sorting an array of integers in ascending order.",
      "Partitioning elements for quick selection algorithms.",
      "Sorting a list of employees based on their salaries.",
    ],
    // bannerImage: "https://i.imgur.com/Hr9y1nU.jpeg",
    // imageURL: "https://i.imgur.com/SookNcD.gif",
    bannerImage: require("../../assets/images/sorting/quick sort banner.jpg"),
    imageURL: require("../../assets/images/sorting/quick sort image.gif"),
    CodeSnippt: `
// Quick Sort function
function quickSort(arr, low = 0, high = arr.length - 1) {
  // Base case: if low is less than high, continue sorting
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the sub-arrays before and after the pivot
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  // Return the sorted array
  return arr;
}

// Partition function to rearrange the elements around the pivot
function partition(arr, low, high) {
  // Choose the pivot element (in this implementation, the last element)
  const pivot = arr[high];
  // Initialize the index of the smaller element
  let i = low - 1;

  // Iterate through the array from low to high-1
  for (let j = low; j < high; j++) {
    // If the current element is less than or equal to the pivot
    if (arr[j] <= pivot) {
      // Increment the index of the smaller element
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Swap arr[i+1] and arr[high] to place the pivot in its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  // Return the index of the pivot element
  return i + 1;
}
    `,
    Approach: [
      "Select a pivot element from the array.",
      "Partition the array into two subarrays: elements less than the pivot and elements greater than the pivot.",
      "Recursively apply quick sort to each subarray.",
    ],
    Complexity:
      "Quick sort has an average-case time complexity of O(n log n) due to its partitioning and recursive sorting, and it has a space complexity of O(log n) due to the recursive function calls.",
    TimeComplexity: ["O(n log n)", "O(n^2)", "O(n log n)"],
    SpaceComplexity: ["O(log n)", "O(log n)", "O(log n)"],
  },
  {
    title: "Heap Sort",
    description:
      "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It builds a max heap from the input list and repeatedly extracts the maximum element to generate the sorted output.",
    catchyShortDescription:
      "Builds a max heap and repeatedly extracts the maximum element.",
    text: "Heap sort is efficient for large datasets and has a time complexity of O(n log n). To perform a heap sort, the algorithm first builds a max heap from the input list, ensuring that the parent node is greater than or equal to its children. It then repeatedly extracts the maximum element from the heap and swaps it with the last element in the heap, reducing the heap size by one. After each extraction, the heap property is restored using a heapify operation. Heap sort is not stable but can be implemented in-place, requiring minimal additional memory.",
    examples: [
      "Sorting an array of integers in ascending order.",
      "Extracting the top K elements from a list.",
      "Sorting a list of students based on their exam scores.",
    ],
    // bannerImage: "https://i.imgur.com/7JBad4p.jpeg",
    // imageURL: "https://i.imgur.com/LgQFhpo.gif",
    bannerImage: require("../../assets/images/sorting/heap sort banner.jpg"),
    imageURL: require("../../assets/images/sorting/heap sort image.gif"),
    CodeSnippt: `
// Heap Sort function
function heapSort(arr) {
  const n = arr.length;

  // Build a max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }

  // Return the sorted array
  return arr;
}

// Heapify function to build a max heap
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    // Swap arr[i] and arr[largest]
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}
    `,
    Approach: [
      "Build a max heap from the input array.",
      "Repeatedly extract the maximum element from the heap and rebuild the heap.",
    ],
    Complexity:
      "Heap sort has a time complexity of O(n log n) because it builds a heap and repeatedly extracts the maximum element, and it operates in constant space as it sorts the elements in place.",
    TimeComplexity: ["O(n log n)", "O(n log n)", "O(n log n)"],
    SpaceComplexity: ["O(1)", "O(1)", "O(1)"],
  },
  {
    title: "Counting Sort",
    description:
      "Counting sort is a non-comparison-based sorting algorithm that works well for integers with a limited range of values. It counts the occurrences of each element and uses this information to place the elements in sorted order.",
    catchyShortDescription:
      "Counts occurrences of each element to sort the list.",
    text: "Counting sort is efficient for sorting integers with a small range but becomes impractical for larger ranges or non-integer data. To perform counting sort, the algorithm first determines the range of input values and creates an auxiliary array to store the count of each value. It then iterates through the input list, incrementing the count of each value encountered. After counting the occurrences, the algorithm reconstructs the sorted list by placing each element in its correct position based on the count array. Counting sort is stable and linear in time complexity but requires additional memory proportional to the range of input values.",
    examples: [
      "Sorting exam scores of students in a class.",
      "Sorting a list of ages for demographic analysis.",
      "Sorting the frequency of words in a text document.",
    ],
    // bannerImage: "https://i.imgur.com/5DGdLmt.jpeg",
    // imageURL: "https://i.imgur.com/XPVHPLx.gif",
    bannerImage: require("../../assets/images/sorting/counting sort banner.jpg"),
    imageURL: require("../../assets/images/sorting/count sort image.gif"),
    CodeSnippt: `
// Counting Sort function
function countingSort(arr, max) {
  // Create an array to store the count of each element
  const count = Array(max + 1).fill(0);

  // Create an empty array to store the sorted elements
  const sortedArray = [];

  // Count the occurrences of each element in the input array
  for (const num of arr) {
    count[num]++;
  }

  // Reconstruct the sorted array using the counts
  for (let i = 0; i < count.length; i++) {
    // Repeat the current element i count[i] times
    for (let j = 0; j < count[i]; j++) {
      sortedArray.push(i);
    }
  }

  // Return the sorted array
  return sortedArray;
}`,
    Approach: [
      "Count the occurrences of each element in the input array.",
      "Calculate the cumulative count of each element.",
      "Construct the sorted array based on the count information.",
    ],
    Complexity:
      "Counting sort has a linear time complexity of O(n + k) where n is the number of elements and k is the range of input values, and it requires additional space proportional to the range of input values and the size of the input list.",
    TimeComplexity: ["O(n + k)", "O(n + k)", "O(n + k)"],
    SpaceComplexity: ["O(n + k)", "O(n + k)", "O(n + k)"],
  },
  {
    title: "Radix Sort",
    description:
      "Radix sort is a non-comparison-based sorting algorithm that sorts integers by processing individual digits. It groups numbers by the value of a specific digit (e.g., units, tens, hundreds) and repeatedly sorts the numbers until all digits have been considered.",
    catchyShortDescription: "Sorts integers by processing individual digits.",
    text: "Radix sort is efficient for sorting integers with a fixed number of digits but may become impractical for large datasets or variable-length integers. To perform radix sort, the algorithm iterates through each digit of the input numbers, grouping them based on the value of that digit. It then sorts the numbers based on the current digit, maintaining the relative order of numbers with the same digit value. Radix sort can use either the most significant digit (MSD) or least significant digit (LSD) as the starting point for sorting. It is stable and linear in time complexity but requires additional memory proportional to the number of digits.",
    examples: [
      "Sorting student IDs based on their numeric value.",
      "Organizing phone numbers by area code.",
      "Sorting file names based on their numeric suffix.",
    ],
    // bannerImage: "https://i.imgur.com/MDVNPph.jpeg",
    // imageURL: "https://i.imgur.com/o5ellTS.gif",
    bannerImage: require("../../assets/images/sorting/radix banner.jpg"),
    imageURL: require("../../assets/images/sorting/radix sort image.gif"),
    CodeSnippt: `// Function to perform Radix Sort on an array
  function radixSort(arr) {
      // Helper function to get the maximum value in the array
      const getMax = (arr) => Math.max(...arr);
      // Get the maximum value in the array
      const max = getMax(arr);
      let exp = 1; // Initialize the exponent value
      // Loop until the maximum value divided by exponent is greater than zero
      while (Math.floor(max / exp) > 0) {
          // Call countingSortForRadix function to sort based on current digit position
          countingSortForRadix(arr, exp);
          // Multiply exponent by 10 to move to the next digit position
          exp *= 10;
      }
      return arr; // Return the sorted array
  }
  
  // Function to perform counting sort for Radix Sort
  function countingSortForRadix(arr, exp) {
      const n = arr.length; // Length of the array
      const output = Array(n); // Initialize an output array
      const count = Array(10).fill(0); // Initialize a count array with 10 elements, all set to 0
      // Count occurrences of each digit at the current digit position
      for (let i = 0; i < n; i++) {
          count[Math.floor(arr[i] / exp) % 10]++;
      }
      // Modify count array to store the actual position of the digit in output array
      for (let i = 1; i < 10; i++) {
          count[i] += count[i - 1];
      }
      // Build the output array by placing elements in their correct sorted positions
      for (let i = n - 1; i >= 0; i--) {
          output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
          count[Math.floor(arr[i] / exp) % 10]--;
      }
      // Copy the sorted elements from the output array to the original array
      for (let i = 0; i < n; i++) {
          arr[i] = output[i];
      }
  }
  `,
    Approach: [
      "Iteratively sort the array based on individual digits from the least significant digit (LSD) to the most significant digit (MSD).",
      "Use counting sort as a subroutine for each digit position.",
    ],
    Complexity:
      "Radix sort has a linear time complexity of O(n * k) where n is the number of elements and k is the number of digits, and it requires additional space proportional to the size of the input list and the number of digits.",
    TimeComplexity: ["O(n * k)", "O(n * k)", "O(n * k)"],
    SpaceComplexity: ["O(n + k)", "O(n + k)", "O(n + k)"],
  },
];
