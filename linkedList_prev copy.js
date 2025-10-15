class Node {
  next = null;
  prev = null;

  constructor(value) {
    this.value = value;
  }
}
class DoubleLinkedList {
  length = 0;
  head = null;
  tail = null;

  // 추가 구현 - 다른 사람 head와 Next도 사용하기
  add(value) {
    const newNode = new Node(value);

    // 값이 있다.
    if (this.head) {
      this.tail.next = newNode; //기존 tail의 next값 추가
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      // 기존값이 없다.
      this.head = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this.length;
  }

  #search(index) {
    // 찾을게 없을 경우
    if (index < 0 || index >= this.length) {
      return [undefined, undefined];
    }

    let count;
    let current;

    // 앞쪽에서 탐색
    if (index < this.length / 2) {
      count = 0;
      current = this.head;
      while (count < index) {
        current = current.next;
        count++;
      }
    } else {
      // 뒤쪽에서 탐색 !!
      count = this.length - 1; //1빼야함
      current = this.tail;
      while (count > index) {
        current = current.prev;
        count--;
      }
    }

    return [current.prev, current];
  }

  search(index) {
    return this.#search(index)[1]?.value;
  }

  remove(index) {
    const [prev, current] = this.#search(index);

    // 삭제할게 없는 경우 아무것도 안함
    if (!current) {
      return;
    }

    // 이전값이 있으면
    if (prev) {
      // 이전의 다음값을 현재 삭제할 것의 다음값으로 지정한다.
      prev.next = current.next;
    } else {
      // index = 0일 때 이전값이 없을때 (head 삭제)
      this.head = current.next;
    }

    // 이걸 해야함!!- 다음값이 있을때 다음거의 prev값을 지정해주기
    if (current.next) {
      current.next.prev = prev;
    } else {
      //  다음값이 없을때 tail 삭제
      this.tail = prev;
    }

    this.length--;
    return this.length;
  }
}

const ll = new DoubleLinkedList();
ll.length;
ll.add(1); //1
ll.add(2); //2
ll.add(3); //3
ll.add(4); //4
ll.add(5); //5
ll.add(6); //6
console.log(ll);

console.log(ll.search(3)); //4
console.log(ll.search(5)); //6
console.log(ll.search(7)); // undefined

ll.remove(4); // 4번째꺼(5)를 없애라
console.log(ll.search(4)); // 6
ll.remove(4); // 4번째꺼(6)를 없애라
console.log(ll.search(4)); // undefined
console.log(ll.remove(4)); // undefined - 이미 없는 거를 지우려고 한다면 아무일도 X
