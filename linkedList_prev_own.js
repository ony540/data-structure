class Node {
  next = null;
  prev = null;

  constructor(value) {
    this.value = value;
  }
}
class LinkedList {
  length = 0;
  head = null;
  tail = null;

  // 추가 구현
  add(value) {
    if (this.tail) {
      // 기존의 tail의 current.next로 새로운값 추가
      let current = this.tail;
      current.next = new Node(value);
      // tail을 새로 들어온 값으로 바꾸고 prev지정
      this.tail = current.next;
      this.tail.prev = current;
    } else {
      const newNode = new Node(value);
      this.head = newNode; //오노: 이렇게 head도 지정
      this.tail = newNode;
    }
    this.length++;
    return this.length;
  }

  search(index) {
    return this.#search(index)[1]?.value;
  }

  #search(index) {
    //오노: 찾을게 없을 경우 미리 처리해주기, index의 값에 따라 앞쪽이나 뒷쪽에서 탐색하기 시작하기

    let count = this.length - 1; //오노: 1빼야함
    let current = this.tail;
    // let prev, next; // 오노: 둘다 필요X

    // 인덱스가 0일때
    while (count > index) {
      next = current;
      current = current?.prev;
      count--;
    }
    return [current.prev, current]; //오노: prev반환하는게 맞음!!
  }

  // 이전의 다음값을 현재 삭제할것의 다음값으로 지정한다.
  remove(index) {
    const [next, current] = this.#search(index);
    if (next && current) {
      // prev.next = current.next;
      // next도 바꿔줄 방법은 없나?
      //  다음꺼의 prev를 prev로 바꿔줘야함!!
      next.prev = current.prev;
      this.length--;
      return this.length;
    } else if (current) {
      // index가 0 일때
      this.tale = current;
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
console.log(ll);

ll.search(4); //네번쨰에 있는 값을 가져와라
console.log(ll.search(3)); //4
console.log(ll.search(5)); //6
console.log(ll.search(7)); // undefined

ll.remove(4); // 4번째꺼(5)를 없애라
console.log(ll.search(4)); // 6
ll.remove(4); // 4번째꺼(6)를 없애라
console.log(ll.search(4)); // undefined
console.log(ll.remove(4)); // undefined - 이미 없는 거를 지우려고 한다면 아무일도 X
