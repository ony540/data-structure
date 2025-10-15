class Node {
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }
}

export class BinarySearchTree {
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
        this.#insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else {
      // 루트노드보다 큰 값이면
      if (node.right) {
        this.#insert(node.right, value);
      } else {
        node.right = new Node(value);
      }
    }
  }

  insert(value) {
    // 어떤 값을 넣으려할때, 일단 어디에 넣을지 모르겠다
    // 그래서 왼팔 오른팔에 맡긴다
    //근데 왼팔 오른팔 없으면 거기 넣는다.
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.#insert(this.root, value);
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

// const bst = new BinarySearchTree();
// bst.insert(8);
// bst.insert(10);
// bst.insert(3);
// // bst.insert(3);
// bst.insert(1);
// bst.insert(6);
// bst.insert(14);
// bst.insert(7);
// bst.insert(4);
// bst.insert(13);

// console.log(bst.search(7));
// bst.remove(8);
// bst.remove(0);
// // bst.search(1);
// console.log(bst.length); // 9

// const bst2 = new BinarySearchTree();
// bst2.insert(50);
// bst2.remove(50);
// bst2.insert(7);

//순서따라 다른 모양이 나옴

// 서브트리도 이진 탐색 트리의 모양이어야함
//전체에 사용되는 알고리즘, 서브트리에 사용되는 알고리즘이 같음 -> 이럴땐 재귀함수를 이용해라

// 인서트할때마다 처음 시작부터들어감  각자 자기의 서브트리에게 맡김(위임)! (재귀)

// remove
// leaf - 자기만 자른다
// 왼팔,오른팔만 있다 - 자기자식을 자기로 끌어올려달라고 한다.
// 양팔이 있을 경우 - 자기다음으로 큰 애를 자기로 변경 (자기 왼쪽 중에서 가장 오른쪽인 애), 그 바꿔진 자리의 자신을 자른다.
