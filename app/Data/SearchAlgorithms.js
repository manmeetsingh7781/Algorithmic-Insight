export const searching_algorithms = [
  {
    title: "Linear Search",
    description:
      "The linear search algorithm is a simple searching algorithm that sequentially checks each element in a list until it finds the target value or reaches the end of the list.",
    catchyShortDescription:
      "Sequentially checks each element until finding the target value.",
    text: "Linear search is straightforward and easy to implement. It works well for small lists or unsorted data. However, its time complexity is O(n), making it less efficient for large datasets. To perform a linear search, start from the beginning of the list and compare each element with the target value. If the element matches the target, return its index; otherwise, continue to the next element. Repeat this process until either the target is found or the end of the list is reached.",
    examples: [
      "Finding a specific word in a paragraph.",
      "Searching for a name in an unsorted list of names.",
      "Locating a file in a folder with unsorted files.",
    ],
    // bannerImage: "https://i.imgur.com/2nq0crq.png",
    // imageURL: "https://i.imgur.com/NAzZLZ6.gif",
    bannerImage: require("../../assets/images/searching/linear search banner.png"),
    imageURL: require("../../assets/images/searching/Linear.gif"),
    CodeSnippt: `// Function to perform Linear Search
function linearSearch(arr, target) {
    // Loop through each element of the array
    for (let i = 0; i < arr.length; i++) { 
        // Check if the current element matches the target 
        if (arr[i] === target) { 
            // If found, return the index of the element
            return i; 
        }
    }
    return -1; // If not found, return -1
}`,
    Approach: [
      "Start from the beginning of the list.",
      "Compare each element with the target value.",
      "If the element matches the target, return its index.",
      "Continue to the next element until the target is found or the end of the list is reached.",
    ],
    Complexity:
      "In linear search, the time it takes to find an element increases linearly with the size of the list. So, if you double the size of the list, it will take roughly twice as long to find an element.",

    // Best, Worst, Average
    TimeComplexity: ["O(n)", "O(n)", "O(n)"],
    SpaceComplexity: ["O(1)", "O(1)", "O(1)"],
  },
  {
    title: "Binary Search",
    description:
      "The binary search algorithm is an efficient searching algorithm used for finding the position of a target value within a sorted array.",
    catchyShortDescription:
      "Efficiently finds the position of a target value in a sorted array.",
    text: "Binary search operates by repeatedly dividing the search interval in half until the target value is located or determined to be absent. To use binary search, the array must be sorted in ascending order. The algorithm compares the target value with the middle element of the array. If the target matches the middle element, its position is returned. If the target is less than the middle element, the search continues in the lower half of the array; otherwise, it continues in the upper half. This process repeats until the target is found or the search interval becomes empty.",
    examples: [
      "Finding a word in a sorted dictionary.",
      "Searching for a name in a sorted list of names.",
      "Locating a file in a sorted directory.",
    ],
    // bannerImage: "https://i.imgur.com/JViVqWZ.jpeg",
    // imageURL: "https://i.imgur.com/oVMyDpk.gif",
    bannerImage: require("../../assets/images/searching/binary search banner.jpg"),
    imageURL: require("../../assets/images/searching/binary search - gif image.gif"),

    CodeSnippt: `// Function to perform Binary Search
function binarySearch(arr, target) {
  // Initialize the lower bound of the search range  
  let low = 0; 
  // Initialize the upper bound of the search range
  let high = arr.length - 1;
  // Continue searching until the low index is less than or equal to the high index
  while (low <= high) {
    // Calculate the middle index
    let mid = Math.floor((low + high) / 2); 
    // If the element at the middle index is equal to the target, return the index
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {  
      // If the middle element is less than the target, update the lower bound
      low = mid + 1;
    } else {  
      // If the middle element is greater than the target, update the upper bound
      high = mid - 1;
    }
  }
  // If the target is not found in the array, return -1
  return -1;
}`,
    Approach: [
      "Set low to the beginning of the array and high to the end of the array.",
      "While low is less than or equal to high:",
      "Calculate mid as the average of low and high.",
      "If the target is equal to the element at mid, return mid.",
      "If the target is less than the element at mid, set high to mid - 1.",
      "If the target is greater than the element at mid, set low to mid + 1.",
      "Repeat until low is greater than high.",
      "If the target is not found, return -1.",
    ],
    Complexity:
      "Binary search works by repeatedly dividing the search interval in half. This means that with each step, the number of remaining elements to search decreases exponentially. It's like cutting down the possibilities by half with each guess.",
    TimeComplexity: ["O(1)", "O(log n)", "O(log n)"],
    SpaceComplexity: ["O(1)", "O(1)", "O(1)"],
  },
  {
    title: "Depth-First Search",
    description:
      "The depth-first search (DFS) algorithm is a traversal method used to explore a graph or tree structure. It starts at a designated node and explores as far as possible along each branch before backtracking.",
    catchyShortDescription:
      "Explores as far as possible along each branch before backtracking.",
    text: "Depth-first search is often implemented recursively, utilizing a stack data structure to keep track of visited nodes and explore adjacent nodes depthwise. It begins at a specified starting node and explores as far as possible along each branch before backtracking. This process continues until all reachable nodes are visited. Depth-first search is commonly used in various graph-related problems such as finding connected components, topological sorting, and solving puzzles.",
    examples: [
      "Finding connected components in a graph.",
      "Solving mazes by exploring paths.",
      "Determining reachability between nodes in a network.",
    ],
    // bannerImage: "https://i.imgur.com/o0KsJTU.png",
    // imageURL: "https://i.imgur.com/DpeASE2.gif",
    bannerImage: require("../../assets/images/searching/dfs banner.png"),
    imageURL: require("../../assets/images/searching/dfs search - gif image.gif"),

    CodeSnippt: `// Function to perform Depth-First Search (DFS)
function dfs(graph, node, visited) {
  visited[node] = true;  // Mark the current node as visited
  console.log(node);  // Print the current node
  // Iterate over neighbors of the current node
  for (let neighbor of graph[node]) {
    // If the neighbor has not been visited, recursively call dfs on it
    if (!visited[neighbor]) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
    Approach: [
      "Start at a specified starting node.",
      "Explore as far as possible along each branch before backtracking.",
      "Mark visited nodes to avoid revisiting.",
      "Continue until all reachable nodes are visited.",
    ],
    Complexity:
      "Depth-First Search visits each vertex and edge of the graph once. For a graph with V vertices and E edges, it has a time complexity proportional to the sum of vertices and edges.",
    TimeComplexity: ["O(V + E)", "O(V + E)", "O(V + E)"],
    SpaceComplexity: ["O(V)", "O(V)", "O(V)"],
  },
  {
    title: "Breadth-First Search",
    description:
      "The breadth-first search (BFS) algorithm is a traversal method used to explore a graph or tree structure. It starts at a designated node and systematically explores all its neighbors before moving to the next level.",
    catchyShortDescription:
      "Explores all neighbors at the current level before moving to the next level.",
    text: "Breadth-first search explores a graph or tree structure level by level, systematically visiting all neighbors of a node before moving to the next level. It utilizes a queue data structure to keep track of nodes to be explored. Starting from a specified node, BFS visits its neighbors, then the neighbors' neighbors, and so on, until all reachable nodes are visited. Breadth-first search is commonly used in shortest path algorithms, network analysis, and traversing hierarchical structures such as directories.",
    examples: [
      "Finding the shortest path in a graph.",
      "Exploring social networks for connections.",
      "Traversing directories in a file system.",
    ],
    // bannerImage: "https://i.imgur.com/ZTPZKhq.png",
    // imageURL: "https://i.imgur.com/TNKZiPb.gif",
    bannerImage: require("../../assets/images/searching/bfs banner.png"),
    imageURL: require("../../assets/images/searching/bfs search - gif image.gif"),

    CodeSnippt: `// Function to perform Breadth-First Search (BFS)
function bfs(graph, start) {
  let visited = [];  // Array to track visited nodes
  let queue = [start];  // Initialize queue with the starting node
  visited[start] = true;  // Mark the starting node as visited
  // Continue BFS until the queue is empty
  while (queue.length > 0) {
    let node = queue.shift();  // Dequeue the first node from the queue
    console.log(node);  // Print the current node
    // Iterate over neighbors of the current node
    for (let neighbor of graph[node]) {
      // If the neighbor has not been visited, mark it as visited and enqueue it
      if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
      }
    }
  }
}`,
    Approach: [
      "Start at a specified starting node.",
      "Explore all neighbors at the current level before moving to the next level.",
      "Use a queue to keep track of nodes to be explored.",
      "Continue until all reachable nodes are visited.",
    ],
    Complexity:
      "Breadth-First Search also visits each vertex and edge of the graph once. Similarly, for a graph with V vertices and E edges, its time complexity is proportional to the sum of vertices and edges.",
    TimeComplexity: ["O(V + E)", "O(V + E)", "O(V + E)"],
    SpaceComplexity: ["O(V)", "O(V)", "O(V)"],
  },
  {
    title: "Dijkstra's Search",
    description:
      "Dijkstra's algorithm is a method for finding the shortest path between nodes in a graph. It works on weighted graphs, where each edge has a non-negative weight.",
    catchyShortDescription:
      "Finds the shortest path between nodes in a weighted graph.",
    text: "Dijkstra's algorithm efficiently finds the shortest path between nodes in a graph with non-negative edge weights. It maintains a set of visited nodes and a priority queue of tentative distances from the start node. The algorithm iteratively selects the node with the shortest tentative distance, updates the distances of its neighbors, and marks it as visited. This process continues until all reachable nodes are visited or the destination node is reached. Dijkstra's algorithm is widely used in route planning, network routing protocols, and resource allocation.",
    examples: [
      "Finding the shortest route between cities on a map.",
      "Determining optimal paths in network routing.",
      "Allocating resources efficiently in computer networks.",
    ],
    // bannerImage: "https://i.imgur.com/FEpIgNg.png",
    // imageURL: "https://i.imgur.com/wDJY64d.gif",
    bannerImage: require("../../assets/images/searching/djikstra banner.png"),
    imageURL: require("../../assets/images/searching/dijkistra search - gif image.gif"),

    CodeSnippt: `// Function to perform Dijkstra's Algorithm
function dijkstra(graph, start) {
  let distances = {};  // Object to store the shortest distances from the start node
  let visited = new Set();  // Set to track visited nodes
  let queue = new PriorityQueue();  // Priority queue to manage nodes based on their distances
  distances[start] = 0;  // Set distance of start node to itself as 0
  queue.enqueue(start, 0);  // Enqueue the start node with priority 0
  // Continue Dijkstra's algorithm until the priority queue is empty
  while (!queue.isEmpty()) {
    let current = queue.dequeue().data;  // Dequeue the node with the smallest distance
    if (visited.has(current)) continue;  // Skip if the node has already been visited
    visited.add(current);  // Mark the current node as visited
    // Iterate over neighbors of the current node
    for (let neighbor of graph[current]) {
      // Calculate the distance to the neighbor through the current node
      let distance = distances[current] + neighbor.weight;
      // Update the shortest distance to the neighbor if necessary
      if (!distances.hasOwnProperty(neighbor.node) || distance < distances[neighbor.node]) {
        distances[neighbor.node] = distance;
        // Enqueue the neighbor with its updated distance as priority
        queue.enqueue(neighbor.node, distance);
      }
    }
  }
  return distances;  // Return the shortest distances from the start node to all other nodes
}`,
    Approach: [
      "Maintain a set of visited nodes and a priority queue of tentative distances from the start node.",
      "Iteratively select the node with the shortest tentative distance.",
      "Update the distances of its neighbors.",
      "Mark visited nodes and continue until all reachable nodes are visited or the destination node is reached.",
    ],
    Complexity:
      "Dijkstra's Algorithm's time complexity depends on the data structures used to implement it. In the worst case, where a priority queue is used, it becomes O((V + E) log V), where V is the number of vertices and E is the number of edges in the graph.",
    TimeComplexity: [
      "O((V + E) log V)",
      "O((V + E) log V)",
      "O((V + E) log V)",
    ],
    SpaceComplexity: ["O(V)", "O(V)", "O(V)"],
  },
  {
    title: "A* Search",
    description:
      "The A* algorithm is a pathfinding algorithm used to find the shortest path between nodes in a graph or grid. It combines the advantages of Dijkstra's algorithm and heuristic search techniques.",
    catchyShortDescription:
      "Finds the shortest path using a combination of Dijkstra's algorithm and heuristics.",
    text: "A* algorithm efficiently finds the shortest path between nodes in a graph by considering both the actual cost from the start node and a heuristic estimate of the remaining cost to the destination node. It maintains a priority queue of nodes to be explored, prioritizing nodes with lower total estimated cost. A* uses a heuristic function to estimate the remaining cost, guiding the search towards the most promising paths. This combination of actual cost and heuristic estimation allows A* to find optimal paths while reducing the search space compared to traditional algorithms. A* algorithm is widely used in robotics, video games, and route planning applications.",
    examples: [
      "Finding the shortest path for a robot to navigate obstacles.",
      "Planning optimal routes for characters in video games.",
      "Optimizing delivery routes for logistics.",
    ],
    // bannerImage: "https://i.imgur.com/LH5XpxW.png",
    // imageURL: "https://i.imgur.com/p5gDdN2.gif",
    bannerImage: require("../../assets/images/searching/A banner.png"),
    imageURL: require("../../assets/images/searching/A image.gif"),

    CodeSnippt: `// Function to perform A* Algorithm
function aStar(graph, start, goal) {
  let openSet = new Set([start]);  // Set of nodes to be evaluated
  let cameFrom = {};  // Map of navigated nodes
  let gScore = { [start]: 0 };  // Map of cost from start along the best known path
  let fScore = { [start]: heuristic(start, goal) };  // Map of estimated total cost from start to goal through node
  // Continue A* Algorithm until open set is empty
  while (openSet.size > 0) {
    // Find the node in open set with the lowest fScore
    let current = [...openSet].reduce((a, b) => fScore[a] < fScore[b] ? a : b);
    if (current === goal) return reconstructPath(cameFrom, current);  // If goal is reached, return the path
    openSet.delete(current);  // Remove current node from open set
    // Explore neighbors of the current node
    for (let neighbor of graph[current]) {
      // Calculate tentative gScore for neighbor
      let tentativeGScore = gScore[current] + neighbor.distance;
      // Update the path if this is a better path
      if (!gScore.hasOwnProperty(neighbor.node) || tentativeGScore < gScore[neighbor.node]) {
        cameFrom[neighbor.node] = current;  // Update the navigation path
        gScore[neighbor.node] = tentativeGScore;  // Update the gScore for neighbor
        fScore[neighbor.node] = gScore[neighbor.node] + heuristic(neighbor.node, goal);  // Update the fScore for neighbor
        openSet.add(neighbor.node);  // Add neighbor to open set if not already present
      }
    }
  }
  return null;  // If no path found, return null
}`,
    Approach: [
      "Maintain a set of open nodes to be explored.",
      "Maintain dictionaries to store the actual cost from the start node (gScore) and the total estimated cost to the destination node (fScore).",
      "While there are open nodes:",
      "Select the node with the lowest total estimated cost.",
      "If the current node is the goal, reconstruct and return the path.",
      "Remove the current node from the set of open nodes.",
      "For each neighbor of the current node:",
      "Calculate the tentative cost from the start node to the neighbor.",
      "Update the scores if a better path is found.",
      "Add the neighbor to the set of open nodes.",
    ],
    Complexity:
      "A* Search, similar to Dijkstra's Algorithm, depends on the data structures used. With appropriate data structures like priority queues, it has a time complexity of O(E log V), where E is the number of edges and V is the number of vertices.",
    TimeComplexity: ["O(E log V)", "O(E log V)", "O(E log V)"],
    SpaceComplexity: ["O(V)", "O(V)", "O(V)"],
  },
  {
    title: "Prim's Search Algorithm",
    description:
      "Prim's algorithm is a greedy algorithm used to find the minimum spanning tree (MST) of a connected, undirected graph. It starts with an arbitrary node and repeatedly adds the cheapest edge that connects a vertex in the MST to a vertex outside of it.",
    catchyShortDescription:
      "Finds the minimum spanning tree of a graph using a greedy approach.",
    text: "Prim's algorithm efficiently finds the minimum spanning tree (MST) of a connected, undirected graph by starting with an arbitrary node and repeatedly adding the cheapest edge that connects a vertex in the MST to a vertex outside of it. It maintains a priority queue of candidate edges, selecting the edge with the lowest weight at each step. The algorithm continues until all vertices are included in the MST, resulting in a tree that spans all vertices with the minimum total edge weight. Prim's algorithm is commonly used in network design, clustering, and optimizing communication networks.",
    examples: [
      "Designing efficient communication networks.",
      "Clustering data points in data analysis.",
      "Creating spanning trees for network routing.",
    ],
    // bannerImage: "https://i.imgur.com/NLoXFJj.png",
    // imageURL: "https://i.imgur.com/rbO7Ijw.gif",
    bannerImage: require("../../assets/images/searching/prims banner.png"),
    imageURL: require("../../assets/images/searching/prims search - gif image.png"),

    CodeSnippt: `// Function to perform Prim's Algorithm
function prim(graph) {
  let mst = [];  // Array to store the minimum spanning tree
  let visited = new Set();  // Set to track visited nodes
  let edges = new PriorityQueue();  // Priority queue to manage candidate edges
  // Start with an arbitrary node and add its edges to the priority queue
  for (let neighbor of graph[Object.keys(graph)[0]]) {
    edges.enqueue({ node: neighbor.node, weight: neighbor.weight }, neighbor.weight);
  }
  visited.add(Object.keys(graph)[0]);  // Mark the starting node as visited
  // Continue Prim's algorithm until all vertices are visited
  while (visited.size < Object.keys(graph).length) {
    // Dequeue the edge with the lowest weight
    let edge = edges.dequeue().data;
    // If the destination node is not visited, add the edge to the MST
    if (!visited.has(edge.node)) {
      mst.push(edge);
      visited.add(edge.node);
      // Add the edges of the newly visited node to the priority queue
      for (let neighbor of graph[edge.node]) {
        if (!visited.has(neighbor.node)) {
          edges.enqueue({ node: neighbor.node, weight: neighbor.weight }, neighbor.weight);
        }
      }
    }
  }
  return mst;  // Return the minimum spanning tree
}`,
    Approach: [
      "Maintain a set of visited nodes and a priority queue of candidate edges.",
      "Start with an arbitrary node and add its edges to the priority queue.",
      "While not all vertices are visited:",
      "Dequeue the edge with the lowest weight from the priority queue.",
      "If the destination node is not visited, add the edge to the minimum spanning tree (MST).",
      "Add the edges of the newly visited node to the priority queue.",
    ],
    Complexity:
      "Prim's Algorithm's time complexity is similar to Dijkstra's Algorithm when implemented with a priority queue. It's O((V + E) log V) where V is the number of vertices and E is the number of edges.",
    TimeComplexity: [
      "O((V + E) log V)",
      "O((V + E) log V)",
      "O((V + E) log V)",
    ],
    SpaceComplexity: ["O(V + E)", "O(V + E)", "O(V + E)"],
  },
  {
    title: "Kruskal's Search Algorithm",
    description:
      "Kruskal's algorithm is a greedy algorithm used to find the minimum spanning tree (MST) of a connected, undirected graph. It builds the MST by iteratively adding the shortest edge that does not form a cycle with the edges already selected.",
    catchyShortDescription:
      "Builds the minimum spanning tree by adding shortest edges without creating cycles.",
    text: "Kruskal's algorithm efficiently finds the minimum spanning tree (MST) of a connected, undirected graph by iteratively adding the shortest edge that does not form a cycle with the edges already selected. It maintains a priority queue of all edges sorted by their weights and a disjoint set data structure to track the connected components of the graph. The algorithm processes edges in ascending order of weight, adding each edge to the MST if it does not create a cycle. Kruskal's algorithm continues until all vertices are included in the MST, resulting in a tree that spans all vertices with the minimum total edge weight. Kruskal's algorithm is commonly used in network design, clustering, and optimizing communication networks.",
    examples: [
      "Designing efficient communication networks.",
      "Clustering data points in data analysis.",
      "Creating spanning trees for network routing.",
    ],
    // bannerImage: "https://i.imgur.com/Pf9aHGY.png",
    // imageURL: "https://i.imgur.com/voFYM1V.gif",
    bannerImage: require("../../assets/images/searching/kruskals banner.png"),
    imageURL: require("../../assets/images/searching/kruskal search - gif image.gif"),

    CodeSnippt: `// Function to perform Kruskal's Algorithm
function kruskal(graph) {
  let mst = [];  // Array to store the minimum spanning tree
  let edges = [];  // Array to store all edges sorted by weight
  let dsu = new DisjointSetUnion(Object.keys(graph));  // Disjoint set to track connected components
  // Convert the graph to an array of edges
  for (let node in graph) {
    for (let neighbor of graph[node]) {
      edges.push({ source: node, target: neighbor.node, weight: neighbor.weight });
    }
  }
  // Sort the edges by weight in non-decreasing order
  edges.sort((a, b) => a.weight - b.weight);
  // Iterate over sorted edges and add to MST if it does not create a cycle
  for (let edge of edges) {
    if (dsu.find(edge.source) !== dsu.find(edge.target)) {
      mst.push(edge);
      dsu.union(edge.source, edge.target);
    }
  }
  return mst;  // Return the minimum spanning tree
}`,
    Approach: [
      "Maintain a priority queue of all edges sorted by their weights and a disjoint set data structure.",
      "Convert the graph to an array of edges and sort them by weight in non-decreasing order.",
      "Iterate over sorted edges and add to the MST if it does not create a cycle.",
    ],
    Complexity:
      "Kruskal's Algorithm sorts all the edges by weight, which takes O(E log E) time, where E is the number of edges. After sorting, it iterates through all the edges, and each edge operation takes almost constant time.",
    TimeComplexity: ["O(E log E)", "O(E log E)", "O(E log E)"],
    SpaceComplexity: ["O(V)", "O(V)", "O(V)"],
  },
  {
    title: "Knuth-Morris-Pratt Search Algorithm",
    description:
      "The Knuth-Morris-Pratt (KMP) algorithm is a string-searching algorithm that efficiently finds occurrences of a pattern within a text.",
    catchyShortDescription:
      "Efficiently finds occurrences of a pattern within a text.",
    text: "The Knuth-Morris-Pratt algorithm efficiently searches for occurrences of a pattern within a text by utilizing information from previous matches. It preprocesses the pattern to construct a partial match table, which guides the search process without revisiting positions that cannot lead to a match. The algorithm compares characters of the pattern with the corresponding positions in the text, using the partial match table to determine the next position to examine. This approach allows KMP to achieve linear time complexity, making it suitable for large texts and patterns. Knuth-Morris-Pratt algorithm is commonly used in string matching applications such as text editors, compilers, and DNA sequence analysis.",
    examples: [
      "Finding all occurrences of a word in a document.",
      "Searching for substrings in DNA sequences.",
      "Detecting patterns in text processing.",
    ],
    // bannerImage: "https://i.imgur.com/Aj8WmCO.jpeg",
    // imageURL: "https://i.imgur.com/INQ2XAS.gif",
    bannerImage: require("../../assets/images/searching/knuth banner.jpg"),
    imageURL: require("../../assets/images/searching/knuth search - gif image.gif"),

    CodeSnippt: `// Function to perform Knuth-Morris-Pratt (KMP) Algorithm
function kmpSearch(text, pattern) {
let n = text.length;  // Length of the text
let m = pattern.length;  // Length of the pattern
let lps = computeLPSArray(pattern);  // Compute the Longest Prefix Suffix array for the pattern
let i = 0;  // Index for traversing the text
let j = 0;  // Index for traversing the pattern
let indices = [];  // Array to store indices of pattern occurrences in the text
// Iterate through the text
while (i < n) {
  // If characters at current positions match
  if (pattern[j] === text[i]) {
    i++;  // Move to the next character in the text
    j++;  // Move to the next character in the pattern
  }
  // If the entire pattern is matched
  if (j === m) {
    // Store the index where the pattern starts in the text
    indices.push(i - j);  
    
    // Update j to continue searching for the next occurrence
    j = lps[j - 1];  
  
  } else if (i < n && pattern[j] !== text[i]) {
    // If characters do not match and not all characters of the text have been examined
    
    if (j !== 0) {
      
      // Move j back to match the longest prefix that is also a suffix
      j = lps[j - 1]; 
      
    } else {
      // Move to the next character in the text
      i++; 
    }
  }
}
return indices;  // Return the indices of pattern occurrences in the text
}`,
    Approach: [
      "Preprocess the pattern to construct the longest prefix suffix (LPS) array.",
      "Iterate through the text and pattern using two pointers.",
      "Compare characters of the pattern with corresponding positions in the text.",
      "Use the LPS array to determine the next position to examine.",
      "If a match is found, record the index and update the pointer in the pattern using the LPS array.",
      "Continue until the end of the text is reached.",
      "Return the indices of all occurrences of the pattern in the text.",
    ],

    Complexity:
      "The Knuth-Morris-Pratt Algorithm has a time complexity of O(n + m), where n is the length of the text and m is the length of the pattern. This is because the algorithm only examines each character of the text and pattern once.",
    TimeComplexity: ["O(n + m)", "O(n + m)", "O(n + m)"],
    SpaceComplexity: ["O(m)", "O(m)", "O(m)"],
  },
];
