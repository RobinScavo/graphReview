//IMPLEMENT A BINARY TREE

//IMPLEMENT A BINARY SEARCH TREE WITH BOTH RECURSIVE AND ITERATIVE SEARCH

//IMPLEMENT A GRAPH USING BOTH GRAPHNODE CLASS AND ADJACENCY LIST

//IMPLEMENT A BREADTH-FIRST SEARCH OF A GRAPH USING ITERATION

//IMPLEMENT A DEPTH-FIRST SEARCH OF A GRAPH USING RECURSION

//GIVEN AN OBJECT WITH AT LEAST TWO KEYS (startName) AND (endName) WITH THE VALUES BEING ARRAYS, RETURN
//A SET OF ALL NODES VISITED IN BREADTH-FIRST ORDER IF A VALID PATH IS FOUND (RETURN NULL IF NOT).
function areTheyConnected (adjacencyList, startName, endName) {

}
const adjacencyList = {
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





//*HINTS*
//1) Create a BST class with a root. For 'insert' method make a currentNode var in the parameters
//set to root, check that a root extists, if not create a new node and make it the root. Check
//the value of currentNode and an if/else. If the value argument is less that currentNode's value
//go left: if no left node exists then create a new node set to currentNode.left. If one does
//exist then recurse passing in val and currentNode.left. Follow the same pattern for right.
//For 'searchRecur' method make a currentNode var set to root. If no currentNode return false (base)
//Next make an if/else if/else statement that starts by checking if val is less than current node
//and recurses if so, passing in currentNode.left. Same pattern for right. If === return true.
//For 'searchIter' method set currentNode to root, use a while (currentNode) loop and an
//if/ else if/ else statement similar to searchRecur. Have a late return for false.
