
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(dataArray) {
        this.root = buildTree(dataArray);
    }
}

function buildTree(dataArray) {
    let sortedArray = removeDuplicates(mergeSort(dataArray, 0, dataArray.length - 1));
    return createBalancedTree(sortedArray, 0, sortedArray.length - 1);
}

function createBalancedTree(dataArray, start, end) {
    if (start > end) {
        return null;
    }

    let mid = Math.floor((start + end) / 2);
    let node = new Node(dataArray[mid]);

    node.left = createBalancedTree(dataArray, start, mid - 1);
    node.right = createBalancedTree(dataArray, mid + 1, end);

    return node;
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

function merge(arr, l, m, r){
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);
 
    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];

    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
        let i = 0;
        let j = 0;
        let k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr, l, r) {
    if (l >= r) {
        return;
    }

    let m = l + Math.floor((r - l) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
    return arr;
}
function insert(data){
    let newNode = new Node(data);

    if(tree.root === null){
        tree.root = newNode;
        // console.log(newNode);

    }
    else{
        insertNode(tree.root, newNode);
        // console.log("tree value:",tree.root);
        // console.log(newNode)
    }
}

function insertNode(node, newNode){
    // console.log("node val:",node.data)
    // console.log("new node",newNode.data);
    // console.log(newNode.data < node.data);
    if(node.data === newNode.data)
            return; 
    else if(newNode.data < node.data){
        // console.log("new node value:",newNode.data)
        if(node.left === null)
            node.left = newNode;
        else{
        // console.log("new node value:",newNode.data)
            insertNode(node.left, newNode);
        }
    }
    else{
        if(node.right === null)
            node.right = newNode;
        else
            insertNode(node.right, newNode);
    }
}

function deletes(data){
    if(tree.root === null)
        return;
    else
        tree.node = deleteNode(tree.root, data);
}

function deleteNode(node, key){
    // console.log("root",node.data)
    // console.log("key",key)
    // console.log("less",key < node.data);
    // console.log("greater",key > node.data);
    if(key < node.data){
        node.left = deleteNode(node.left, key);
        return node;
    }
    else if(key > node.data){
        node.right = deleteNode(node.right, key);
        return node;
    }
    else{
        // console.log("no child",node.left === null && node.right === null);
        // console.log("one child-left",node.left === null);
        // console.log("one child-right",node.right === null);
        // console.log("two child",node.left === null);
        if(node.left === null && node.right === null){
            node = null;
            return node;
        }else if(node.left === null){
            console.log(node);
            node = node.right;
            console.log(node);
            
            return node;
        }else if(node.right === null){
            node = node.left;
            return node;
        }else{
            let aux = this.findMinNode( node.right );
			node.data = aux.data;
			node.right = this.deleteNode( node.right, aux.data );
			return node;
                
        }

    }
}
function findMinNode ( node ) {
    if ( node.left === null )
        return node;
    else
        return this.findMinNode( node.left );
}

function find(node, key){
    console.log(node);
    if(node === null)
        return;
    if(node.data === key){
        // console.log(node.left, node.right);
        return node;
    }
    if(key < node.data){
        find(node.left, key);
    }else{
        find(node.right, key);
    }
}
function levelorder(node){
    let queue = [];
    queue.push(node);
    while(queue.length != 0){
        let curNode = queue.shift();
        console.log(curNode.data);

        if(curNode.left != null){
            queue.push(curNode.left);
        }
        if(curNode.right != null){
            queue.push(curNode.right)
        }
    }

    
}
function inorder(node, arr=[]){
    
    if(node === null)
    return;

    inorder(node.left, arr);
    arr.push(node.data);
    inorder(node.right, arr);

    return arr;
}
function preorder(node){
    if(node === null)
    return;

    console.log(node.data);
    preorder(node.left);
    preorder(node.right);
}
function postorder(node){
    if(node === null)
    return;

    postorder(node.left);
    postorder(node.right);
    console.log(node.data);
}

function height(node){
    if(!node)
        return 0;
    
    return 1+Math.max(height(node.left), height(node.right));
}


function depth(node, x) {
    console.log(!node);
    if(node === null)
        return -1;
    let dist = -1;
    if((node.data === x)||(dist = depth(node.left, x))>=0 || (dist = depth(node.right, x))>=0)
        return dist+1;
    
    return dist;
}

function isBalanced(node){
    if (node === null) return 0;

    const leftBalance = isBalanced(node.left);
    const rightBalance = isBalanced(node.right);
    const diff = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || diff > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
}

function reBalance(node){
    let nodes = {};
    let arr = inorder(node);
    console.log(inorder(node));
    nodes = createBalancedTree(arr, 0, arr.length-1);
    console.log(createBalancedTree(arr, 0, arr.length-1));
    prettyPrint(nodes);
}
let dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(dataArray);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
prettyPrint(tree.root);
console.log(tree.root);
insert(20);
insert(2);
console.log(tree.root);
prettyPrint(tree.root);
insert(5);
insert(7);
insert(19);
insert(1);
insert(24);
insert(21);
insert(32);
insert(315);
prettyPrint(tree.root);
deletes(67);
// deletes(23);
prettyPrint(tree.root);
inorder(tree.root);
preorder(tree.root);
postorder(tree.root);
console.log(find(tree.root, 8));
levelorder(tree.root);
console.log(height(tree.root));
console.log(depth(tree.root,21));
console.log(isBalanced(tree.root));
reBalance(tree.root);