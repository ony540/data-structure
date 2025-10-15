export class Deque {
  arr = [];

  push(value) {
    return this.arr.push(value);
  }
  pop() {
    return this.arr.pop();
  }

  // 앞에꺼 뺴기
  shift() {
    return this.arr.shift();
  }

  // 앞으로 넣기
  unshift(value) {
    return this.arr.unshift(value);
  }

  //젤 앞에꺼보기
  peek() {
    return this.arr.at(0);
  }
  // 맨 위에 있는거! 마지막요소
  top() {
    return this.arr.at(-1); //최근 문법!
  }

  // getter func 매서드가 아님
  get length() {
    return this.arr.length;
  }
}

const deque = new Deque();

deque.push(1); //1 push하고 난다음의 length를 반환
deque.push(3); //2
deque.push(5); //3
deque.unshift(2); //4
deque.unshift(4); //5
// 4 2 1 3 5
console.log(deque.length); //5
deque.pop(); //5
deque.shift(); //4
console.log(deque.peek()); //2
