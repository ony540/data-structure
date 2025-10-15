export class Stack {
  arr = [];

  push(value) {
    return this.arr.push(value);
  }
  pop() {
    return this.arr.pop();
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

// const stack = new Stack();

// stack.push(1); //1 push하고 난다음의 length를 반환
// stack.push(3); //2
// stack.push(5); //3
// stack.push(2); //4
// stack.push(4); //5
// stack.length; //5
// stack.pop(); //4
// stack.top(); //2

// stack에는 pop과 push만하도록 제한
