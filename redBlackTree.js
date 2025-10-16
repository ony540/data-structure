import { bfs } from './treversal.js';

export class RedBlackTree {
  root = null;
  length = 0;

  // 재귀용 인서트함수
  #insert(node, value) {
    // 숙제: 같은 값을 넣은 경우 에러 처리 (alert, throw)
    if (node?.value == value) {
      throw new Error('it has same value');
    }

    if (node.value > value) {
      // 루트노드보다 작은 값이면
      // 왼팔있으면 왼팔에 맡기기 없으면 왼팔이 되라
      if (node.left) {
        return this.#insert(node.left, value);
      } else {
        const newNode = new Node(value, 'red');
        newNode.parent = node;
        node.left = newNode;
        return newNode;
      }
    } else {
      // 루트노드보다 큰 값이면
      if (node.right) {
        return this.#insert(node.right, value);
      } else {
        const newNode = new Node(value, 'red');
        newNode.parent = node;
        node.right = newNode;
        return newNode;
      }
    }
  }

  // 더블레드인지 확인하고 리컬러나 리스트럭처실행
  #checkDoubleRed(node) {
    if (node.color === 'red' && node.parent.color == 'red') {
      if (node.getUncle()?.color === 'red') {
        this.#recolor(node);
      } else if (node.getUncle()?.color === 'black') {
        this.#restructure(node);
      } else if (!node.getUncle()) {
        this.#restructure(node);
      }
    }
  }
  #recolor(node) {
    if (node?.parent) {
      node.parent.color = 'black';
    }
    if (node?.getUncle()) {
      node.getUncle().color = 'black';
    }
    if (node?.parent?.parent) {
      node.parent.parent.color = 'red';
      if (node.parent?.parent === this.root) {
        node.parent.parent.color = 'black';
      }
    }
    this.#checkDoubleRed(node.parent?.parent);
  }

  #restructure(node) {
    let middle;
    const grandgrandpa = node.parent.parent.parent; // 증조할 nullable
    const grandpa = node.parent;
    const parent = node.parent;

    // A. 내가 할배보다 클때
    if (node.value > grandpa.value) {
      if (node.value > parent.value) {
        middle = node.parent;
      } else {
        middle = node;
      }

      // A.에서의 재구조화 과정 1~2  ------------

      //1-a.가운데가 나일때
      if (middle === node) {
        node.left = grandpa;
        grandpa.parent = node;
        grandpa.right = null; // 부모 할배 끊기
        node.right = parent;
        parent.parent = node;
        parent.left = null;
      } else {
        //1-b. 가운데가 부모일때
        grandpa.right = parent.left; //할 오를 부.왼으로
        if (grandpa.right) {
          grandpa.right.parent = grandpa; //할 오의 부를 할로
        }
        grandpa.right = null; // 할배 부모 연결끊기

        parent.left = grandpa; //부.오를 할배로
        parent.left.parent = parent; // 부.오.의 부모를 부모로
      }
      //b. 증조할의 자식을 중간값으로 지정
      if (grandgrandpa.left === grandpa) {
        grandgrandpa.left = middle;
        middle.parent = grandgrandpa;
      } else {
        grandgrandpa.right = middle;
        middle.parent = grandgrandpa;
      }
    } else {
      // B. 내가 할배보다 작을때

      if (node.value < node.parent.value) {
        middle = node.parent;
      } else {
        middle = node;
      }

      // B.에서의 재구조화 과정  1~2  ------------

      //1-a.가운데가 나일때
      if (middle === node) {
        node.right = grandpa;
        grandpa.parent = node;
        grandpa.left = null; // 할 왼 없애기

        node.left = parent;
        parent.parent = node;
        parent.right = null;
      } else {
        //1-b. 가운데가 부모일때
        grandpa.left = parent.right; //할 왼쪽을 부.오로
        if (grandpa.left) {
          grandpa.left.parent = grandpa; //할 왼쪽의 부를 할로
        }
        grandpa.left = null; // 할 왼 없애기

        parent.right = grandpa; //부.오를 할배로
        parent.right.parent = parent; // 부.오.의 부모를 부모로
      }

      // 2. 증조할의 자식을 중간값으로 지정
      if (grandgrandpa.left === grandpa) {
        grandgrandpa.left = middle;
        middle.parent = grandgrandpa;
      } else {
        grandgrandpa.right = middle;
        middle.parent = grandgrandpa;
      }
    }
    //가장 위는 블랙, 색상 변경
    middle.color = 'black';
    if (middle.left) middle.left.color = 'red';
    if (middle.right) middle.right.color = 'red';
  }

  insert(value) {
    // 어떤 값을 넣으려할때, 일단 어디에 넣을지 모르겠다
    // 그래서 왼팔 오른팔에 맡긴다
    //근데 왼팔 오른팔 없으면 거기 넣는다.
    if (!this.root) {
      this.root = new Node(value, 'black');
    } else {
      const newNode = this.#insert(this.root, value);
      this.#checkDoubleRed(newNode);
    }
    this.length++;
  }

  #search(node, value) {
    if (node.value > value) {
      // 더 작은 값 찾을 때
      if (!node.left) return;
      if (node.left.value === value) return node.left;
      return this.#search(node.left, value);
    } else {
      if (!node.right) return;
      if (node.right.value === value) return node.right;
      return this.#search(node.right, value);
    }
  }

  search(value) {
    if (!this.root) return null;
    if (this.root.value === value) return this.root;
    return this.#search(this.root, value);
  }

  #remove(node, value) {
    //제거할 값이 존재하지 않는 경우
    if (!node) {
      this.length++;
      return null;
    }

    //자식 입장
    if (node.value === value) {
      //제거할 값을 찾은 경우
      if (!node.left && !node.right) {
        return null; //1. leaf - 부모한테 자기를 잘라달라고함 (node.left를 null로 지정해달라)
      } else if (!node.left) {
        return node.right; // 2. 오른팔만 있는 경우 - 자기 오른팔 넘기기
      } else if (!node.right) {
        return node.left; // 3. 왼팔만 있는 경우 - 자기 왼팔 넘기기
      } else {
        // 4. 양팔 다 있는 경우
        let exchange = node.left;
        while (exchange.right) {
          exchange = exchange.right;
        }
        const temp = node.value;
        node.value = exchange.value;
        exchange.value = temp;
        node.left = this.#remove(node.left, exchange.value);

        return node;
      }
    } else {
      //부모 입장 (부모입장에서 자기자신아닐경우 자식한테 넘기기)
      if (node.value > value) {
        node.left = this.#remove(node.left, value);
        return node;
      } else {
        node.right = this.#remove(node.right, value);
        return node;
      }
    }
  }
  remove(value) {
    this.root = this.#remove(this.root, value);
    this.length--;
    return this.length; // 숙제로 length 반환
  }
}

class Node {
  left = null;
  right = null;
  parent = null;

  constructor(value, color = 'red') {
    this.value = value;
    this.color = color;
  }
  getUncle() {
    if (this.parent?.parent?.left === this.parent) {
      return this.parent?.parent?.right;
    } else if (this.parent?.parent?.right === this.parent) {
      return this.parent?.parent?.left;
    }
  }
}

// 8, 7, 9, 3, 6, 4, 5, 12
const rb = new RedBlackTree();
rb.insert(8); //b
rb.insert(7); //r
rb.insert(9); //r
// 여기부터 시작
rb.insert(3); // 리컬러
rb.insert(6); // 리스트럭처
// rb.insert(4);
// rb.insert(5);
// rb.insert(12);
bfs(rb);

// rb.insert(10); //b ->r->b
// rb.insert(5); //r ->b
// rb.insert(15); //r ->b
// rb.insert(3); //r -> recolor
