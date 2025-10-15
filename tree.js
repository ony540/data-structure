class Tree {
  constructor(value) {
    this.root = value;
  }
}

class Node {
  children = [];

  constructor(value) {
    this.value = value;
  }

  push(value) {
    this.children.push(new Node(value));
  }
}

const tree = new Tree(50);
tree.root; // 50
tree.root.children; //[]

tree.root.push(25)
tree.root.push(75)
tree.root.children[0].push(12)
tree.root.children[0].push(37)
tree.root.children[1].push(37)
tree.root.children[1].push(37)

