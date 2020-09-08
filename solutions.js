//IMPLEMENT A BINARY TREE AND A BINARY SEARCH TREE
class TreeNode {
    constructor (val) {
        this.val = val;
        this.left = null;
        this.left = null;
    }
}

let a = new TreeNode('a');                //       A
let b = new TreeNode('b');                //      / \
let c = new TreeNode('c');                //     B   C
let d = new TreeNode('d');                //    / \   \
let e = new TreeNode('e');                //   D   E   F
let f = new TreeNode('f');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//examples of trees: the DOM, network routing (shortest path), syntax trees, AI, folders in operating system

let ten = new TreeNode ('10');                     //        10
let five = new TreeNode ('10');                    //        / \
let sixteen = new TreeNode ('10');                 //       5   16
let one = new TreeNode ('10');                     //      / \    \
let sixteenDuplicate = new TreeNode ('10');

ten.left = five;
ten.right = sixteen;
five.left = one;
five.right = seven;
sixteen.right = sixteenDuplicate;

//IMPLEMENT A BINARY SEARCH TREE WITH BOTH RECURSIVE AND ITERATIVE SEARCH, BFS THAT RETURNS AN
//ARRAY OF ALL VALUES, AND DFS'S FOR PREORDER, INORDER AND POSTORDER
class BST {
    constructor() {
        this.root = null;
    }

    insert(val, currentNode=this.root) { //O(log n)
        if (!this.root) {
            this.root = new TreeNode(val);
            return;
        }
        if (val < currentNode.val) {
            if (!currentNode.left) {
                currentNode.left = new TreeNode(val);
            } else {
                this.insert(val, currentNode.left)
            }
        } else {
            if (!currentNode.right) {
                currentNode.right = new TreeNode(val);
            } else {
                this.insert(val, currentNode.right);
            }
        }
    }
    searchRecur (val, currentNode=this.root) { //O(log n)
        if (!currentNode) return false

        if (val < currentNode.val) {
            return this.searchRecur (val, currentNode.left);
        } else if (val > currentNode.val) {
            return this.searchRecur(val, currentNode.right);
        } else {
            return true;
        }
    }
    searchIter (val) {  //O(log n)
        let currentNode = this.root;

        while (currentNode) {
            if (val < currentNode.val) {
                currentNode = currentNode.left;
            } else if (val > currentNode.val) {
                currentNode = currentNode.right
            } else {
                return true;
            }
        }
        return false;
    }
    BFS () {
        let node = this.root,
            result = [],
            queue = [];
        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }
    PreorderDFS (visited = new Set()) {
        function helper(node) {
            visited.add(node.val);
            if (node.left) helper(node.left);
            if (node.right) helper(node.right)
        }
        helper (this.root);
        return visited;
    }
    PostorderDFS (visited = new Set()) {
        function helper (node) {
            if (node.left) helper (node.left);
            if (node.right) helper (node.right)
            visited.add(node.val)
        }
        helper (this.root);
        return visited
    }
    InorderDFS (visited = new Set()) {
        function helper (node) {
            if (node.left) helper (node.left);
            visited.add(node.val);
            if (node.right) helper (node.right);
        }
        helper (this.root);
        return visited;
    }
}

const tree = new BST();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

// console.log(tree.searchRecur(10)); //true
// console.log(tree.searchIter(7)); //false
// console.log(tree.BFS());
// console.log(tree.PreorderDFS());
// console.log(tree.PostorderDFS());
// console.log(tree.InorderDFS());

//Using BFS versus DFS: for a wide tree BFS will use lots of memory and long, unbalanced trees
//use lots of memory for DFS. Inorder will give you a sorted array, with preorder you know the
//original root (first element)

//IMPLEMENT A GRAPH USING BOTH GRAPHNODE CLASS AND ADJACENCY LIST
class GraphNode {
    constructor (val) {
        this.val = val;
        this.neighbors = [];
    }
}

let aaa = new GraphNode('a');         //      A - C
let bbb = new GraphNode('b');         //       \ /
let ccc = new GraphNode('c');         //        B

aaa.neighbors = [bbb];
bbb.neighbors = [ccc];
ccc.neighbors = [aaa];

let graph = {
    'a': ['b'],
    'b': ['c'],
    'c': ['a']
}

//IMPLEMENT A GRAPH WITH METHODS FOR ADDING A VERTEX OR EDGE AND REMOVING AN EDGE OR VERTEX
//DON'T WORRY ABOUT ERROR HANDLING OR EDGE CASES
class Graph {
    constructor () {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        this.adjacencyList[vertex] = [];
    }
    addEdge (vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }
    removeEdge (vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter( v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter( v => v !== vertex1);
    }
    removeVertex (vertex) {
        while(this.adjacencyList[vertex].length) {
            const adjacencyVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacencyVertex);
         }
         delete this.adjacencyList[vertex]
    }
}

let g = new Graph();
g.addVertex("Missoula");
g.addVertex("Medellin");
g.addVertex("Seattle");
g.addVertex("Leon");
g.addVertex("Mexico City");
g.addEdge("Missoula", "Seattle");
g.addEdge("Mexico City", "Seattle");
g.addEdge("Mexico City", "Leon");
g.removeEdge("Missoula", "Seattle");
g.removeVertex("Mexico City");
// console.log(g);

//Uses for graphs: routes on maps, connections betweens friends on social media, recommendations

//Advantages of adjacency versus matrix: Adjacency takes up less space in sparse graphs, faster
//iteration over all edges but can be slower to look up a specific edge. Matrix takes up more space
//in sparse graphs, are slower to iterate over all edges but are faster to look up a specifc edge

//IMPLEMENT A BREADTH-FIRST SEARCH OF A GRAPH USING ITERATION
function breadthFirstSearch (graph, startingNode, targetVal) {
    let queue = [startingNode];
    let visited = new Set();
    while(queue.length) {
        let node = queue.shift();
        if (visited.has(node)) continue;
        visited.add(node);
        if (node === targetVal) return true;
        queue.push(...graph[node]);
    }
    return false;
}

breadthFirstSearch(graph, 'a', 'c');

//Graph traversal uses: peer networking, web crawlers, finding "closest" matches, shortest path

//2) Pass the graph, startingNode and target value as parameters. Create a queue array that
//contains startingNode, instanciate a new Set. Create a while loop (queue length), shift off first
//queue node, storing in var, then see if its in visited set, if so continue. If not, add it to
//visited then check if it equals target value, if not push

//IMPLEMENT A DEPTH-FIRST SEARCH OF A GRAPH USING BOTH RECURSION AND ITERATION
function depthFirstSearchRecursive (vertex, adjacencyList, result =[], visited = new Set ()) {
    if (!vertex) return null;
    result.push(vertex);
    for (let neighbor of adjacencyList[vertex]){
        if (visited.has(neighbor)) continue;
        visited.add(vertex);
        return depthFirstSearchRecursive(neighbor, adjacencyList, result, visited);
    }
    return result;
}

function depthFirstSearchIterative (vertex, adjacencyList) {
    let stack = [vertex];
    let result = [];
    let visited = new Set ();
    while(stack.length) {
        current = stack.pop();
        if (visited.has(current)) continue;
        visited.add(current);
        result.push(current);
        for (let neighbor of adjacencyList[current]) {
            stack.push(neighbor);
        }
    }
    return result;
}

let gg = new Graph ();
gg.addVertex("A")
gg.addVertex("B")
gg.addVertex("C")
gg.addVertex("D")
gg.addVertex("E")
gg.addVertex("F")

gg.addEdge("A", "B")
gg.addEdge("A", "C")
gg.addEdge("B", "D")
gg.addEdge("C", "E")
gg.addEdge("D", "E")
gg.addEdge("D", "F")
gg.addEdge("E", "F")

// console.log(depthFirstSearchIterative("B", gg.adjacencyList))
// console.log(depthFirstSearchRecursive("D", gg.adjacencyList))

//IMPLEMENT A BREADTH-FIRST SEARCH OF A GRAPH BOTH ITERATIVELY AND RECURSIVELY
function breadthFirstSearchIterative (vertex, adjacencyList) {
    let queue = [vertex];
    let visited = new Set();
    let result = [];
    while (queue.length) {
        let current = queue.shift();
        if(visited.has(current)) continue;
        result.push(current);
        visited.add(current);
        queue.push(...adjacencyList[current]);
    }
    return result;
}

// console.log(breadthFirstSearchIterative("A", gg.adjacencyList));

//GIVEN AN OBJECT WITH AT LEAST TWO KEYS (startName) AND (endName) WITH THE VALUES BEING ARRAYS, RETURN
//A SET OF ALL NODES VISITED IN BREADTH-FIRST ORDER IF A VALID PATH IS FOUND (RETURN NULL IF NOT).
function areTheyConnected (adjacencyList, startName, endName) {
    let queue = [startName];
    let visited = new Set();
    while (queue.length) {
        let current = queue.shift();
        if (visited.has(endName)) return visited;
        if (visited.has(current)) continue;
        visited.add(current);
        queue.push(...adjacencyList[current]);
    }
    return null;
}

const nameAdjacencyList = {
    'carrie':  ['humza', 'jun'],
    'farrah':  ['humza'],
    'humza':   ['carrie', 'farrah', 'jun', 'silla'],
    'jun':     ['carrie', 'silla'],
    'ophelia': ['travis'],
    'silla':   ['humza', 'yervand'],
    'travis':  ['ophelia'],
    'ursula':  ['travis'],
    'victor':  [],
    'yervand': ['silla']
}

console.log(areTheyConnected(nameAdjacencyList, 'carrie', 'yervand'));

// {'startName': 'carrie',
// 'endName': 'carrie',
// 'visited': ['carrie']},
// {'startName': 'carrie',
// 'endName': 'humza',
// 'visited': ['carrie', 'humza']},
// {'startName': 'carrie',
// 'endName': 'yervand',
// 'visited': ['carrie', 'jun', 'farrah', 'yervand', 'humza', 'silla']},
