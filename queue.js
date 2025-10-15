export class Queue {
  arr = [];

  enqueue(value) {
    return this.arr.push(value);
  }
  dequeue() {
    return this.arr.shift();
  }
  // peek- 엿보다 처음에 들어간거 반환
  peek() {
    return this.arr.at(0); //최근 문법!
  }

  // getter func 매서드가 아님
  get length() {
    return this.arr.length;
  }
}

// const queue = new Queue();

// queue.enqueue(1); //1
// queue.enqueue(3); //2
// queue.enqueue(5); //3
// queue.enqueue(2); //4
// queue.enqueue(4); //5

// queue.length; //5
// queue.dequeue(); //1
// queue.peek(); //2

// stack에는 dequeue(shift) enqueue(push)만하도록 제한
//배열로 하는게 사기같다 연결리스트로 만들기!!
