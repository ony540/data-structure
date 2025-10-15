class Node {
  next = null;
  constructor(value) {
    this.value = value;
  }
}
class LinkedList {
  // 아래와 동일 문법
  //   constructor(length) {
  //   this.length = length;
  // }

  length = 0;
  head = null;

  // 추가 구현
  add(value) {
    if (this.head) {
      let current = this.head;
      // 다음값이 없을때까지
      while (current.next) {
        current = current.next;
      }
      // 새로운값 추가
      current.next = new Node(value);
    } else {
      this.head = new Node(value);
    }
    this.length++;
    return this.length;
  }
  search(index) {
    return this.#search(index)[1]?.value;
  }
  // 프라이빗함수 #로 선언 - 이전의 search에서 prev가 추가됨
  #search(index) {
    let count = 0;
    let prev;
    let current = this.head;

    while (count < index) {
      prev = current;
      current = current?.next;
      count++;
    }
    return [prev, current];
  }

  // 이전의 다음값을 현재 삭제할것의 다음값으로 지정한다.
  remove(index) {
    const [prev, current] = this.#search(index);
    if (prev && current) {
      prev.next = current.next;
      this.length--;
      return this.length;
    } else if (current) {
      // index가 0 일때
      this.head = current.next;
      this.length--;
      return this.length;
    }
    // 삭제하고자 하는 대상이 없을 때
    //  아무것도 안함
  }
}

const ll = new LinkedList();
ll.length;
ll.add(1); //1
ll.add(2); //2
ll.add(3); //3
ll.add(4); //4
ll.add(5); //5
ll.add(6); //6

ll.search(4); //네번쨰에 있는 값을 가져와라
console.log(ll.search(3)); //4
console.log(ll.search(5)); //6
console.log(ll.search(7)); // undefined

ll.remove(4); // 4번째꺼(5)를 없애라
console.log(ll.search(4)); // 6
ll.remove(4); // 4번째꺼(6)를 없애라
console.log(ll.search(4)); // undefined
console.log(ll.remove(4)); // undefined - 이미 없는 거를 지우려고 한다면 아무일도 X
