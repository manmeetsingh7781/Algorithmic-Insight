export const datastructures = [
  {
    title: "Array",
    Type: "linear",
    description:
      "An array is a fundamental data structure that stores a collection of elements in contiguous memory locations. Each element is identified by its index.",
    catchyShortDescription:
      "Stores a collection of elements in contiguous memory.",
    text: "Arrays are versatile and widely used in programming for storing and accessing data efficiently. They can hold elements of the same data type and provide constant-time access to individual elements using their indices. Arrays have a fixed size determined at the time of declaration, which can be resized dynamically in some programming languages. Elements in an array are stored sequentially in memory, allowing efficient traversal and random access. However, resizing an array or inserting/deleting elements in the middle can be inefficient due to memory reallocation and copying overhead. Despite these limitations, arrays are essential for implementing various algorithms and data structures.",
    examples: [
      "Storing a list of student grades.",
      "Representing RGB values of pixels in an image.",
      "Maintaining a sequence of commands in a history buffer.",
    ],

    bannerImage: require("../../assets/images/datastructures/array banner.png"),
    imageURL: require("../../assets/images/datastructures/array image.png"),
    CodeSnippt: `
  // Declaration and initialization of an array in JavaScript
let arr = [1, 2, 3, 4, 5];
`,
    Approach: [
      "Determine the type of elements to be stored in the array.",
      "Decide on the initial size of the array based on the expected number of elements and memory constraints.",
      "Consider the frequency and type of operations (insertion, search, removal, etc.) to optimize performance.",
      "Implement resize strategies if dynamic resizing is required.",
    ],
    Complexity:
      "Arrays have constant-time (O(1)) access to elements by index. Insertion and deletion at the end of the array are also constant-time on average (O(1)), but insertion or deletion in the middle requires shifting elements and takes linear time (O(n)). Searching for an element in an unsorted array takes linear time (O(n)), while in a sorted array, it can be reduced to logarithmic time (O(log n)) using binary search. Overall, arrays offer efficient access and manipulation of elements but may incur overhead for resizing and maintaining order.",
    TimeComplexity: {
      Insert: "O(n)",
      Search: "O(n)",
      Remove: "O(n)",
      Find: "O(n)",
    },
  },
  {
    title: "Dynamic Array",
    Type: "linear",
    description:
      "A dynamic array is a flexible data structure that stores a collection of elements in contiguous memory locations. It automatically resizes itself to accommodate additional elements beyond its initial capacity.",
    catchyShortDescription:
      "Stores a collection of elements with automatic resizing.",
    text: "Dynamic arrays offer versatility and efficiency in storing and accessing data. They can hold elements of the same data type and provide constant-time access to individual elements using their indices. Unlike static arrays, dynamic arrays can resize themselves dynamically to accommodate additional elements when the capacity is exceeded, thus mitigating the need for manual memory management. This flexibility comes at the cost of occasional resizing overhead, particularly when the array grows beyond its current capacity. Despite this, dynamic arrays are widely used in various applications where the size of the data is unpredictable or subject to change.",
    examples: [
      "Managing a list of tasks in a to-do list application.",
      "Storing dynamic datasets in scientific simulations.",
      "Implementing resizable containers in programming libraries.",
    ],
    // bannerImage:
    //   "https://www.xelplus.com/wp-content/uploads/2018/10/Dynamic-Array-Logo.png",
    // imageURL:
    //   "https://media.geeksforgeeks.org/wp-content/uploads/ResizeArray.png",
    bannerImage: require("../../assets/images/datastructures/dynamic array banner.png"),
    imageURL: require("../../assets/images/datastructures/dynamic array image.png"),
    CodeSnippt: `
// Implementation of a dynamic array data structure
class DynamicArray {
  constructor() {
    this.capacity = 10; // Initial capacity of the array
    this.length = 0; // Length of the array (number of elements)
    this.data = new Array(this.capacity); // Array to store elements
  }

  // Method to append an element to the end of the array
  append(element) {
    if (this.length === this.capacity) {
      this.resize(); // Resize the array if it reaches its capacity
    }
    this.data[this.length] = element; // Append the element to the end of the array
    this.length++; // Increment the length of the array
  }

  // Method to insert an element at a specific index in the array
  insert(index, element) {
    if (index < 0 || index > this.length) {
      return false; // Return false if the index is out of bounds
    }
    if (this.length === this.capacity) {
      this.resize(); // Resize the array if it reaches its capacity
    }
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1]; // Shift elements to the right to make space for the new element
    }
    this.data[index] = element; // Insert the element at the specified index
    this.length++; // Increment the length of the array
    return true;
  }

  // Method to delete the element at a specific index from the array
  delete(index) {
    if (index < 0 || index >= this.length) {
      return false; // Return false if the index is out of bounds
    }
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1]; // Shift elements to the left to fill the gap
    }
    this.data[this.length - 1] = undefined; // Set the last element to undefined
    this.length--; // Decrement the length of the array
    return true;
  }

  // Method to search for an element in the array
  search(element) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === element) {
        return i; // Return the index of the element if found
      }
    }
    return -1; // Return -1 if the element is not found
  }

  // Method to get the size (number of elements) of the array
  size() {
    return this.length; // Return the length of the array
  }

  // Method to resize the array when it reaches its capacity
  resize() {
    this.capacity *= 2; // Double the capacity of the array
    const newData = new Array(this.capacity); // Create a new array with the updated capacity
    for (let i = 0; i < this.length; i++) {
      newData[i] = this.data[i]; // Copy elements from the old array to the new array
    }
    this.data = newData; // Update the array reference to the new array
  }
}

// Example usage:
const dynamicArray = new DynamicArray();
dynamicArray.append(1);
dynamicArray.append(2);
dynamicArray.append(3);
console.log("Array:", dynamicArray.data); // Output: [1, 2, 3]
console.log("Size:", dynamicArray.size()); // Output: 3
console.log("Search for 2:", dynamicArray.search(2)); // Output: 1 (index)
console.log("Search for 4:", dynamicArray.search(4)); // Output: -1 (not found)
dynamicArray.insert(1, 5);
console.log("Array after insertion:", dynamicArray.data); // Output: [1, 5, 2, 3]
dynamicArray.delete(2);
console.log("Array after deletion:", dynamicArray.data); // Output: [1, 5, 3]

`,
    Approach: [
      "Determine the type of elements to be stored in the dynamic array.",
      "Decide on the initial capacity of the array based on the expected number of elements and memory constraints.",
      "Consider the automatic resizing mechanism to handle capacity constraints efficiently.",
      "Implement methods for appending, inserting, deleting, searching, and resizing as required.",
    ],
    Complexity:
      "Dynamic arrays offer constant-time (O(1)) access to elements by index. Appending an element to the end of the array is also constant-time on average (O(1)), but may trigger resizing, resulting in occasional linear-time (O(n)) overhead. Insertion, deletion, and searching operations may incur linear time (O(n)) in the worst case, depending on the position and size of the array. Despite occasional resizing overhead, dynamic arrays provide efficient storage and access for varying data sizes.",
    TimeComplexity: {
      Insert: "O(n)",
      Search: "O(n)",
      Remove: "O(n)",
      Find: "O(n)",
    },
  },
  {
    title: "Linked List",
    Type: "linear",
    description:
      "A linked list is a linear data structure where elements are stored in nodes. Each node contains a data field and a reference (pointer) to the next node in the sequence.",
    catchyShortDescription:
      "Linear data structure with elements stored in nodes.",
    text: "Linked lists provide dynamic memory allocation and efficient insertion/deletion of elements compared to arrays. They do not require contiguous memory allocation and can easily grow or shrink in size. However, accessing elements in a linked list requires traversing the list sequentially from the beginning, leading to slower access times compared to arrays. Linked lists come in various forms such as singly linked lists, doubly linked lists, and circular linked lists, each with its advantages and disadvantages. They are commonly used in implementations of stacks, queues, and hash tables.",
    examples: [
      "Implementing a stack using a singly linked list.",
      "Representing a playlist of songs in a music player.",
      "Managing memory allocation in dynamic memory systems.",
    ],
    // bannerImage:
    //   "https://www.simplilearn.com/ice9/free_resources_article_thumb/Linked-List-Soni/representation-of-linked-list.png",
    // imageURL:
    //   "https://i1.wp.com/www.learnsteps.com/wp-content/uploads/2017/04/LLdefs.gif?fit=658%2C242&ssl=1",
    bannerImage: require("../../assets/images/datastructures/linked list banner.avif"),
    imageURL: require("../../assets/images/datastructures/linked list image.gif"),
    CodeSnippt: `
// Node class for a singly linked list in JavaScript
class Node {
  constructor(data) {
    this.data = data; // Data of the node
    this.next = null; // Pointer to the next node
  }
}

// Implementation of a singly linked list data structure
class LinkedList {
  constructor() {
    this.head = null; // Pointer to the head of the list
    this.tail = null; // Pointer to the tail of the list
    this.size = 0; // Size of the list
  }

  // Method to insert a new node at the beginning of the list
  insertFirst(data) {
    const newNode = new Node(data); // Create a new node with the given data
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode; // If the list is empty, set both head and tail to the new node
    } else {
      newNode.next = this.head; // Set the next pointer of the new node to the current head
      this.head = newNode; // Update the head pointer to the new node
    }
    this.size++; // Increment the size of the list
  }

  // Method to insert a new node at the end of the list
  insertLast(data) {
    const newNode = new Node(data); // Create a new node with the given data
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode; // If the list is empty, set both head and tail to the new node
    } else {
      this.tail.next = newNode; // Set the next pointer of the current tail to the new node
      this.tail = newNode; // Update the tail pointer to the new node
    }
    this.size++; // Increment the size of the list
  }

  // Method to remove and return the node at the beginning of the list
  removeFirst() {
    if (this.isEmpty()) {
      return null; // If the list is empty, return null
    }
    const removedNode = this.head; // Store the node to be removed (head of the list)
    this.head = this.head.next; // Move the head pointer to the next node
    if (this.size === 1) {
      this.tail = null; // If the list becomes empty after removing the node, update the tail pointer
    }
    this.size--; // Decrement the size of the list
    return removedNode.data; // Return the data of the removed node
  }

  // Method to remove and return the node at the end of the list
  removeLast() {
    if (this.isEmpty()) {
      return null; // If the list is empty, return null
    }
    let removedNode = null;
    if (this.size === 1) {
      removedNode = this.head;
      this.head = null;
      this.tail = null; // If the list has only one node, remove it and update head and tail pointers
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next; // Traverse the list until the second last node
      }
      removedNode = current.next; // Store the node to be removed (current tail)
      current.next = null; // Set the next pointer of the second last node to null
      this.tail = current; // Update the tail pointer to the second last node
    }
    this.size--; // Decrement the size of the list
    return removedNode.data; // Return the data of the removed node
  }

  // Method to search for a node with the given data in the list
  search(data) {
    let current = this.head;
    while (current !== null) {
      if (current.data === data) {
        return true; // If the data is found, return true
      }
      current = current.next; // Move to the next node
    }
    return false; // If the data is not found, return false
  }

  // Method to check if the list is empty
  isEmpty() {
    return this.size === 0; // Return true if the size of the list is 0
  }

  // Method to return the size of the list
  getSize() {
    return this.size; // Return the size of the list
  }

  // Method to display the elements of the list
  display() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data); // Print the data of the current node
      current = current.next; // Move to the next node
    }
  }
}

// Example usage:
const linkedList = new LinkedList();
linkedList.insertFirst(1);
linkedList.insertLast(2);
linkedList.insertLast(3);
linkedList.display(); // Output: 1, 2, 3
console.log("Size:", linkedList.getSize()); // Output: 3
console.log("Search for 2:", linkedList.search(2)); // Output: true
console.log("Search for 4:", linkedList.search(4)); // Output: false
console.log("Removing last node:", linkedList.removeLast()); // Output: 3
linkedList.display(); // Output: 1, 2
`,
    Approach: [
      "Choose the appropriate type of linked list (singly, doubly, or circular) based on the requirements.",
      "Implement node structure to hold data and references to other nodes.",
      "Consider the operations needed (insertion, deletion, traversal) and implement them accordingly.",
      "Handle edge cases such as empty lists, insertion/deletion at the beginning or end, etc.",
    ],
    Complexity:
      "Linked lists offer constant-time (O(1)) insertion and deletion at the head or tail. However, accessing or removing elements in the middle requires traversing the list, resulting in linear time (O(n)) complexity. Searching for an element also requires linear time (O(n)) since there is no direct indexing. Overall, linked lists are efficient for dynamic insertion and deletion but may have slower access times compared to arrays due to sequential traversal.",

    TimeComplexity: {
      Insert: "O(1)",
      Search: "O(n)",
      Remove: "O(n)",
      Find: "O(n)",
    },
  },
  {
    title: "Stack",
    Type: "linear",
    description:
      "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. Elements are added and removed from the top of the stack.",
    catchyShortDescription:
      "Follows Last In, First Out principle for adding and removing elements.",
    text: "Stacks are commonly used in programming for managing function calls, undo operations, and expression evaluation. They provide constant-time insertion and deletion of elements at one end, known as the top of the stack. Operations on a stack include push (addition), pop (removal), and peek (accessing the top element without removal). Stacks can be implemented using arrays or linked lists, with each offering different trade-offs in terms of memory efficiency and performance. The simplicity and efficiency of stacks make them valuable in various algorithms and applications.",
    examples: [
      "Managing function calls in recursion.",
      "Undo functionality in text editors.",
      "Expression evaluation in arithmetic operations.",
    ],
    // bannerImage:
    //   "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230726165552/Stack-Data-Structure.png",
    // imageURL:
    //   "https://miro.medium.com/v2/resize:fit:473/1*r4Bfo3rrFprzFM2zbgzZXA.jpeg",
    bannerImage: require("../../assets/images/datastructures/stack banner.png"),
    imageURL: require("../../assets/images/datastructures/stack image.jpg"),
    CodeSnippt: `
// Implementation of a stack using an array in JavaScript
class Stack {
  // Constructor to initialize an empty stack
  constructor() {
    this.items = []; // Array to store elements of the stack
  }

  // Method to add an element to the top of the stack
  push(element) {
    this.items.push(element); // Add the element to the end of the array
  }

  // Method to remove and return the element at the top of the stack
  pop() {
    return this.items.pop(); // Remove and return the last element of the array
  }

  // Method to return the element at the top of the stack without removing it
  peek() {
    return this.items[this.items.length - 1]; // Return the last element of the array
  }

  // Method to check if the stack is empty
  isEmpty() {
    return this.items.length === 0; // Return true if the array is empty
  }

  // Method to return the size of the stack
  size() {
    return this.items.length; // Return the number of elements in the array
  }
}
`,
    Approach: [
      "Decide on the underlying data structure (array or linked list) based on the specific requirements and performance considerations.",
      "Implement the necessary operations such as push, pop, and peek according to the chosen data structure.",
      "Handle boundary cases such as stack underflow and overflow.",
      "Consider optimizations such as dynamic resizing for arrays or memory management for linked lists.",
    ],
    Complexity:
      "Stack operations such as push, pop, and peek have constant-time (O(1)) complexity since they involve adding or removing elements from the top of the stack. The size operation also runs in constant time. Overall, stacks provide efficient insertion and deletion at one end but do not support random access to elements like arrays.",

    TimeComplexity: {
      Insert: "O(1)",
      Search: "O(n)",
      Remove: "O(1)",
      Find: "O(n)",
    },
  },
  {
    title: "Queue",
    Type: "linear",
    description:
      "A queue is a linear data structure that follows the First In, First Out (FIFO) principle. Elements are added at the rear (enqueue) and removed from the front (dequeue) of the queue.",
    catchyShortDescription:
      "Follows First In, First Out principle for adding and removing elements.",
    text: "Queues are commonly used in programming for task scheduling, message passing, and breadth-first search algorithms. They provide constant-time insertion and deletion of elements at both ends of the queue. Operations on a queue include enqueue (addition) and dequeue (removal), with additional operations like peek (accessing the front element without removal) and isEmpty (checking if the queue is empty). Queues can be implemented using arrays or linked lists, with each offering different performance characteristics depending on the application requirements.",
    examples: [
      "Managing job scheduling in operating systems.",
      "Handling requests in network protocols.",
      "Implementing breadth-first search in graph traversal.",
    ],
    // bannerImage:
    //   "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230726165642/Queue-Data-structure1.png",
    // imageURL:
    //   "https://simplesnippets.tech/wp-content/uploads/2019/04/queue-data-structure-diagram.jpg",
    bannerImage: require("../../assets/images/datastructures/queue banner.png"),
    imageURL: require("../../assets/images/datastructures/queue image.jpg"),
    CodeSnippt: `
// Class definition for a Queue data structure
class Queue {
  // Constructor to initialize an empty queue
  constructor() {
    this.head = null; // Pointer to the head of the queue
    this.tail = null; // Pointer to the tail of the queue
    this.size = 0; // Size of the queue
  }

  // Method to add an element to the end of the queue
  enqueue(element) {
    let newNode = new Node(element); // Create a new node with the given element
    if (this.isEmpty()) {
      // If the queue is empty, set both head and tail to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, append the new node to the tail of the queue
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++; // Increment the size of the queue
  }

  // Method to remove and return the element at the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      return null; // If the queue is empty, return null
    }
    let removedNode = this.head; // Store the node to be removed (head of the queue)
    this.head = this.head.next; // Move the head pointer to the next node
    if (this.head === null) {
      this.tail = null; // If the queue becomes empty after dequeueing, update the tail pointer
    }
    this.size--; // Decrement the size of the queue
    return removedNode.data; // Return the data of the removed node
  }

  // Method to return the element at the front of the queue without removing it
  peek() {
    return this.isEmpty() ? null : this.head.data; // If the queue is not empty, return the data of the head node; otherwise, return null
  }

  // Method to check if the queue is empty
  isEmpty() {
    return this.size === 0; // Return true if the size of the queue is 0, indicating it is empty
  }

  // Method to return the size of the queue
  getSize() {
    return this.size; // Return the size of the queue
  }
}
    
`,
    Approach: [
      "Choose the appropriate underlying data structure (array or linked list) based on performance requirements and application needs.",
      "Implement necessary operations such as enqueue, dequeue, peek, and isEmpty.",
      "Handle boundary cases such as queue underflow and overflow.",
      "Optimize for performance by considering resizing strategies or memory management techniques.",
    ],
    Complexity:
      "Queue operations such as enqueue, dequeue, peek, and isEmpty have constant-time (O(1)) complexity since they involve adding or removing elements at the ends of the queue. The size operation also runs in constant time. Overall, queues provide efficient insertion and deletion at both ends but do not support random access to elements like arrays.",

    TimeComplexity: {
      Insert: "O(1)",
      Search: "O(n)",
      Remove: "O(1)",
      Find: "O(n)",
    },
  },
  {
    title: "Binary Tree",
    Type: "Non linear",
    description:
      "A tree is a hierarchical data structure consisting of nodes connected by edges. It has a root node at the top and each node has zero or more child nodes.",
    catchyShortDescription:
      "Hierarchical structure with a root node and child nodes.",
    text: "Trees are widely used in computer science for representing hierarchical relationships and organizing data efficiently. They provide fast search, insertion, and deletion operations compared to other data structures. Trees come in various forms such as binary trees, binary search trees, and balanced trees, each optimized for specific use cases         and applications. Trees are used in many applications such as organizing file systems, representing hierarchical data in databases, and implementing search algorithms like binary search. A binary tree is a special type of tree where each node has at most two children, known as the left child and the right child. Binary search trees (BSTs) are binary trees that follow a specific ordering property: for every node, all nodes in its left subtree have values less than the node's value, and all nodes in its right subtree have values greater than the node's value. This property enables efficient searching, insertion, and deletion operations in BSTs. Balanced trees such as AVL trees and red-black trees ensure that the height of the tree remains balanced, maintaining optimal performance for operations even with dynamic data. Trees play a crucial role in many algorithms and data structures, making them essential knowledge for any programmer.",
    examples: [
      "Organizing files and directories in a file system.",
      "Representing organizational hierarchies in a company.",
      "Implementing symbol tables in compilers.",
    ],
    // bannerImage:
    //   "https://miro.medium.com/v2/resize:fit:16000/1*CMGFtehu01ZEBgzHG71sMg.png",
    // imageURL:
    //   "https://miro.medium.com/v2/resize:fit:1400/1*tUBYCHi32Zj0B2UCw0qmlA.png",
    bannerImage: require("../../assets/images/datastructures/binary tree banner.png"),
    imageURL: require("../../assets/images/datastructures/binary tree image.png"),
    CodeSnippt: `
// Implementation of a binary tree node in JavaScript
class TreeNode {
  constructor(value) {
    this.value = value; // Value of the node
    this.left = null; // Pointer to the left child node
    this.right = null; // Pointer to the right child node
  }
}

// Implementation of a binary search tree (BST) using TreeNode
class BinarySearchTree {
  constructor() {
    this.root = null; // Root node of the BST
  }

  // Method to insert a new value into the BST
  insert(value) {
    const newNode = new TreeNode(value); // Create a new node with the given value
    if (this.root === null) {
      this.root = newNode; // If the tree is empty, set the new node as the root
    } else {
      this.insertNode(this.root, newNode); // Otherwise, insert the new node recursively
    }
  }

  // Helper method to recursively insert a new node into the BST
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode; // If the left child is null, insert the new node here
      } else {
        this.insertNode(node.left, newNode); // Otherwise, continue searching recursively in the left subtree
      }
    } else {
      if (node.right === null) {
        node.right = newNode; // If the right child is null, insert the new node here
      } else {
        this.insertNode(node.right, newNode); // Otherwise, continue searching recursively in the right subtree
      }
    }
  }

  // Method to search for a value in the BST
  search(value) {
    return this.searchNode(this.root, value); // Start searching from the root node
  }

  // Helper method to recursively search for a value in the BST
  searchNode(node, value) {
    if (node === null) {
      return false; // If the node is null, the value is not found
    }
    if (value === node.value) {
      return true; // If the value matches the node's value, it is found
    } else if (value < node.value) {
      return this.searchNode(node.left, value); // Search in the left subtree if the value is less than the node's value
    } else {
      return this.searchNode(node.right, value); // Search in the right subtree if the value is greater than the node's value
    }
  }

  // Method to perform an in-order traversal of the BST
  inOrderTraversal(node = this.root) {
    if (node !== null) {
      // Recursively traverse the left subtree
      this.inOrderTraversal(node.left);
      // Visit the current node
      console.log(node.value);
      // Recursively traverse the right subtree
      this.inOrderTraversal(node.right);
    }
  }

  // Method to perform a pre-order traversal of the BST
  preOrderTraversal(node = this.root) {
    if (node !== null) {
      // Visit the current node
      console.log(node.value);
      // Recursively traverse the left subtree
      this.preOrderTraversal(node.left);
      // Recursively traverse the right subtree
      this.preOrderTraversal(node.right);
    }
  }

  // Method to perform a post-order traversal of the BST
  postOrderTraversal(node = this.root) {
    if (node !== null) {
      // Recursively traverse the left subtree
      this.postOrderTraversal(node.left);
      // Recursively traverse the right subtree
      this.postOrderTraversal(node.right);
      // Visit the current node
      console.log(node.value);
    }
  }
}

// Example usage:
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

console.log("In-order traversal:");
bst.inOrderTraversal(); // Output: 3, 5, 7, 10, 15

console.log("Pre-order traversal:");
bst.preOrderTraversal(); // Output: 10, 5, 3, 7, 15

console.log("Post-order traversal:");
bst.postOrderTraversal(); // Output: 3, 7, 5, 15, 10

console.log("Searching for value 5:", bst.search(5)); // Output: true
console.log("Searching for value 20:", bst.search(20)); // Output: false
`,
    Approach: [
      "Choose the appropriate type of tree (binary, binary search, balanced, etc.) based on the application requirements.",
      "Implement tree node structure to hold data and references to child nodes.",
      "Decide on the traversal methods (in-order, pre-order, post-order) based on the operations to be performed.",
      "Handle operations such as insertion, deletion, and search efficiently according to the chosen tree type.",
    ],
    Complexity:
      "Tree operations like search, insertion, and deletion have logarithmic time (O(log n)) complexity on average in balanced binary search trees (BSTs). However, unbalanced trees or certain operations in other types of trees may have linear time (O(n)) complexity. Traversal operations usually have linear time complexity since they visit each node once. The space complexity of trees depends on the number of nodes and the tree structure, typically ranging from O(n) to O(log n) for balanced trees. Overall, trees offer efficient search, insertion, and deletion operations compared to linear data structures like arrays and linked lists.",

    TimeComplexity: {
      Insert: "O(log n)",
      Search: "O(log n)",
      Remove: "O(log n)",
      Find: "O(log n)",
    },
  },
  {
    title: "Graph",
    Type: "Non linear",
    description:
      "A graph is a non-linear data structure consisting of nodes (vertices) and edges that connect these nodes. Graphs can be either directed or undirected, and edges may have weights.",
    catchyShortDescription:
      "Non-linear structure with nodes and edges connecting them.",
    text: "Graphs are versatile data structures used to model relationships between entities. They are widely applicable in various domains such as social networks, transportation systems, and computer networks. Graphs consist of nodes (vertices) and edges that connect these nodes. Edges can be directed (one-way) or undirected (two-way), and they may have associated weights that represent the cost or distance between nodes. Common graph representations include adjacency matrix and adjacency list, each with its advantages depending on the application requirements. Graph traversal algorithms like depth-first search (DFS) and breadth-first search (BFS) are essential for analyzing and manipulating graph data.",
    examples: [
      "Modeling social networks like Facebook or Twitter.",
      "Representing road networks in navigation systems.",
      "Analyzing dependencies between tasks in project management.",
    ],
    // bannerImage:
    //   "https://miro.medium.com/v2/resize:fit:2000/1*IBtDZq0_4yWpXt0mhda0jw.png",
    // imageURL:
    //   "https://miro.medium.com/v2/resize:fit:1228/1*OUqMXd2jmLprCqWULLll8w.gif",
    bannerImage: require("../../assets/images/datastructures/graph banner.png"),
    imageURL: require("../../assets/images/datastructures/graph image.gif"),
    CodeSnippt: `
    // Implementation of a graph using an adjacency list in JavaScript
class Graph {
  // Constructor to initialize an empty graph with no vertices
  constructor() {
    this.vertices = {}; // Object to store vertices and their adjacent vertices
  }

  // Method to add a new vertex to the graph
  addVertex(vertex) {
    if (!this.vertices[vertex]) {
        this.vertices[vertex] = []; // Initialize an empty array for the vertex's adjacent vertices
    }
  }

  // Method to add an undirected edge between two vertices
  addEdge(vertex1, vertex2) {
    // Add vertex2 to the adjacency list of vertex1
    this.vertices[vertex1].push(vertex2);
    // Add vertex1 to the adjacency list of vertex2 (since the graph is undirected)
    this.vertices[vertex2].push(vertex1);
  }
}

// Create a new instance of the Graph class
const graph = new Graph();

// Add vertices to the graph
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

// Add edges between vertices
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
graph.addEdge('C', 'A');

`,
    Approach: [
      "Choose the appropriate representation (adjacency matrix or adjacency list) based on the size and density of the graph.",
      "Implement necessary operations for adding vertices, adding edges, and performing graph traversal.",
      "Consider optimization techniques such as memoization or pruning for improving performance.",
      "Select appropriate graph traversal algorithms (DFS, BFS) based on the specific requirements of the application.",
    ],
    Complexity:
      "Graph operations depend on the chosen representation and the specific algorithms used. In general, adding or removing vertices and edges in a graph has constant-time (O(1)) complexity. Traversal operations like DFS and BFS typically have linear time (O(V + E)) complexity, where V is the number of vertices and E is the number of edges. However, in dense graphs, adjacency matrix-based operations may have higher space complexity (O(V^2)) compared to adjacency list-based operations (O(V + E)). Overall, graph algorithms offer efficient exploration and manipulation of complex relationships between entities.",

    TimeComplexity: {
      Insert: "O(1)",
      Search: "O(V + E)",
      Remove: "O(V + E)",
      Find: "O(V)",
    },
  },
  {
    title: "Heap",
    Type: "Non linear",
    description:
      "A heap is a specialized tree-based data structure that satisfies the heap property. In a heap, the parent node's value is either greater than or less than (depending on the heap type) the values of its children.",
    catchyShortDescription:
      "Tree-based structure satisfying the heap property.",
    text: "Heaps are often used in priority queue implementations and heap-based sorting algorithms such as heap sort. A heap is typically represented as a binary tree with two main variations: max heap and min heap. In a max heap, the value of each parent node is greater than or equal to the values of its children, whereas in a min heap, the value of each parent node is less than or equal to the values of its children. Heaps support efficient insertion and removal of elements while maintaining the heap property through heapify operations. The heap data structure is essential for optimizing algorithms that require efficient prioritization of elements.",
    examples: [
      "Implementing priority queues for task scheduling.",
      "Heap-based sorting algorithms like heap sort.",
      "Optimizing Dijkstra's algorithm for finding shortest paths.",
    ],
    // bannerImage:
    //   "https://media.geeksforgeeks.org/wp-content/uploads/20230901130152/Insertion-In-Max-Heap.png",
    // imageURL:
    //   "https://miro.medium.com/v2/resize:fit:665/0*zcVbYPDgX_br8ayR.png",
    bannerImage: require("../../assets/images/datastructures/heap banner.png"),
    imageURL: require("../../assets/images/datastructures/heap image.png"),
    CodeSnippt: `// Implementation of a max heap using an array in JavaScript
class MaxHeap {
  // Constructor to initialize an empty heap
  constructor() {
    this.heap = []; // Array to store heap elements
  }

  // Method to insert a new element into the heap
  insert(value) {
    this.heap.push(value); // Add the new value to the end of the heap array
    this.heapifyUp(); // Restore the heap property by moving the new value up as needed
  }

  // Method to remove and return the maximum value (root) from the heap
  extractMax() {
    if (this.isEmpty()) {
      return null; // If the heap is empty, return null
    }
    const max = this.heap[0]; // Store the maximum value (root) to be returned
    const last = this.heap.pop(); // Remove the last element from the heap
    if (!this.isEmpty()) {
      this.heap[0] = last; // Move the last element to the root position
      this.heapifyDown(); // Restore the heap property by moving the new root down as needed
    }
    return max; // Return the maximum value
  }

  // Method to restore the heap property by moving a newly inserted element up the heap
  heapifyUp() {
    let currentIndex = this.heap.length - 1; // Start with the index of the last element
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2); // Calculate the parent index
      if (this.heap[parentIndex] >= this.heap[currentIndex]) {
        break; // If the parent is greater than or equal to the current element, heap property is satisfied
      }
      // Swap the current element with its parent
      [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
      currentIndex = parentIndex; // Move up to the parent index
    }
  }

  // Method to restore the heap property by moving the root element down the heap
  heapifyDown() {
    let currentIndex = 0; // Start with the root index
    const length = this.heap.length;
    while (true) {
      let maxIndex = currentIndex; // Assume the current element is the maximum
      const leftIndex = 2 * currentIndex + 1; // Calculate the left child index
      const rightIndex = 2 * currentIndex + 2; // Calculate the right child index
      // Compare the current element with its left child
      if (leftIndex < length && this.heap[leftIndex] > this.heap[maxIndex]) {
        maxIndex = leftIndex; // If left child is greater, update max index
      }
      // Compare the current element with its right child
      if (rightIndex < length && this.heap[rightIndex] > this.heap[maxIndex]) {
        maxIndex = rightIndex; // If right child is greater, update max index
      }
      if (maxIndex === currentIndex) {
        break; // If the current element is the maximum, heap property is satisfied
      }
      // Swap the current element with its maximum child
      [this.heap[currentIndex], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[currentIndex]];
      currentIndex = maxIndex; // Move down to the maximum child index
    }
  }

  // Method to check if the heap is empty
  isEmpty() {
    return this.heap.length === 0; // Return true if the heap array is empty
  }
}
    
`,
    Approach: [
      "Choose the appropriate type of heap (max heap or min heap) based on the problem requirements.",
      "Implement heap operations such as insertion, extraction, and heapify.",
      "Consider the specific use case and optimize for performance by choosing appropriate heap operations.",
      "Handle edge cases such as empty heap or invalid inputs.",
    ],
    Complexity:
      "Heap operations like insertion and deletion have logarithmic time (O(log n)) complexity since they involve maintaining the heap property by traversing the height of the heap. Heapifying the entire heap takes linear time (O(n)). Overall, heaps provide efficient prioritization of elements and are often used in algorithms requiring efficient extraction of extremal elements.",

    TimeComplexity: {
      Insert: "O(log n)",
      Search: "O(n)",
      Remove: "O(log n)",
      Find: "O(n)",
    },
  },
  {
    title: "Hash Table",
    Type: "Non linear",
    description:
      "A hash table is a data structure that implements an associative array abstract data type. It uses a hash function to map keys to values, allowing efficient insertion, deletion, and lookup operations.",
    catchyShortDescription: "Maps keys to values using a hash function.",
    text: "Hash tables offer fast average-case performance for storing and retrieving data, making them suitable for applications where quick access to data is crucial. A hash table consists of an array of buckets, each containing key-value pairs. To store a key-value pair, the hash function generates an index (hash code) based on the key, and the pair is stored in the corresponding bucket. Collisions may occur when multiple keys map to the same index, requiring collision resolution techniques such as chaining or open addressing. Hash tables are widely used in database indexing, caching mechanisms, and language implementations for symbol tables.",
    examples: [
      "Storing usernames and passwords in a login system.",
      "Implementing a dictionary with word definitions.",
      "Caching frequently accessed data in web applications.",
    ],
    // bannerImage:
    //   "https://res.cloudinary.com/dx1kpewvo/image/upload/v1662954408/2022-09-19/spatial_hashmap_2_d9suk9.png",
    // imageURL:
    //   "https://s3.ap-south-1.amazonaws.com/s3.studytonight.com/tutorials/uploads/pictures/1604653967-76844.png",
    bannerImage: require("../../assets/images/datastructures/hashtable banner.png"),
    imageURL: require("../../assets/images/datastructures/hashtable image.png"),
    CodeSnippt: `
// Implementation of a hash table using separate chaining in JavaScript
class HashTable {
  // Constructor to initialize the hash table with a specified size and empty buckets
  constructor(size = 10) {
    this.size = size; // Size of the hash table (number of buckets)
    // Create an array of buckets filled with empty arrays
    this.buckets = Array(this.size).fill(null).map(() => []);
  }

  // Hash function to generate an index for a given key
  hash(key) {
    let hash = 0; // Initialize hash value
    // Iterate through each character of the key
    for (let i = 0; i < key.length; i++) {
      // Add the Unicode value of each character to the hash value
      hash += key.charCodeAt(i);
    }
    // Return the hash value modulo the size of the hash table to get the index
    return hash % this.size;
  }

  // Method to insert a key-value pair into the hash table
  set(key, value) {
    const index = this.hash(key); // Get the index for the key
    // Push the key-value pair into the bucket at the calculated index
    this.buckets[index].push({ key, value });
  }

  // Method to retrieve the value associated with a given key from the hash table
  get(key) {
    const index = this.hash(key); // Get the index for the key
    // Find the key-value pair in the bucket at the calculated index
    return this.buckets[index].find(item => item.key === key);
  }

  // Method to remove a key-value pair from the hash table given a key
  remove(key) {
    const index = this.hash(key); // Get the index for the key
    const bucket = this.buckets[index]; // Get the bucket at the calculated index
    // Iterate through the bucket to find the key-value pair with the specified key
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        // If the key is found, remove the key-value pair from the bucket
        return bucket.splice(i, 1);
      }
    }
    // If the key is not found, return null
    return null;
  }
}`,
    Approach: [
      "Choose an appropriate hash function based on the type of keys and expected distribution.",
      "Decide on the collision resolution strategy (chaining, open addressing) based on performance and memory constraints.",
      "Implement hash table operations such as insertion, retrieval, and deletion.",
      "Handle resizing of the hash table when load factors exceed a certain threshold.",
    ],
    Complexity:
      "Hash table operations like insertion, deletion, and lookup have average-case constant-time (O(1)) complexity when the hash function distributes keys evenly and collisions are handled effectively. However, in the worst case, these operations may have linear time (O(n)) complexity if collisions occur frequently and degrade performance. Resizing the hash table and rehashing may incur additional overhead but are essential for maintaining efficient performance as the number of elements grows. Overall, hash tables offer fast data access and are widely used in various applications.",

    TimeComplexity: {
      Insert: "O(1)",
      Search: "O(1)",
      Remove: "O(1)",
      Find: "O(1)",
    },
  },
];
