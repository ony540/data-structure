import { BinarySearchTree } from './binarySearchTree.js';
import { Queue } from './queue.js';
import { Stack } from './stack.js';

export function bfs(tree) {
  const queue = new Queue();
  queue.enqueue(tree.root);
  console.log(tree);
  while (queue.length > 0) {
    const node = queue.dequeue(); // 젤처음들어간거 빼고
    console.log(node.value);

    // 자식들을 넣음
    if (node.left) {
      queue.enqueue(node.left);
    }
    if (node.right) {
      queue.enqueue(node.right);
    }
  }
}

function dfs(tree) {
  const stack = new Stack();
  stack.push(bst.root);
  while (stack.length > 0) {
    const node = stack.pop(); // 후입선출 빼고
    console.log(node.value);

    // 자식들을 넣음
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
}
// pre - in - post

function inOrder(node) {
  if (!node) return;
  inOrder(node.left);
  console.log(node.value); //중간에 콘솔찍기
  inOrder(node.right);
}
function postOrder(node) {
  if (!node) return;
  postOrder(node.left);
  postOrder(node.right);
  console.log(node.value); //오른쪽에 콘솔찍기
}

// const bst = new BinarySearchTree();
// bst.insert(4);
// bst.insert(2);
// bst.insert(6);
// bst.insert(1);
// bst.insert(3);
// bst.insert(5);
// bst.insert(7);
// bfs(bst);
// dfs(bst);
// bst;
// inOrder(bst.root);
// postOrder(bst.root);
