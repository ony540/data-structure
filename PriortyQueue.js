//우선순위 큐
class PriorityQueue {
  arr = [];

  // 내가 부모보다 크면 부모랑 바꾼다.
  #reheapUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index].priority > this.arr[parentIndex].priority) {
        //priority끼리 비교
        //값  바꾸기
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        this.#reheapUp(parentIndex); //재귀 내가 부모인덱스가 되었으므로
      }
    }
  }

  insert(priority, value) {
    const index = this.arr.length;
    this.arr[index] = { priority, value }; //노드를 객체로 정의
    this.#reheapUp(index);
  }

  // 삭제는 root만 가능 (최대힙 가장 큰거를 제거하는 순간 그다음으로 큰 숫자가 올라와야함
  #reheapDown(index) {
    const leftIndex = index * 2 + 1;

    if (leftIndex < this.arr.length) {
      // 자식이 있다면
      const rightIndex = index * 2 + 2;
      const bigger =
        this.arr[leftIndex]?.priority > this.arr[rightIndex]?.priority ? leftIndex : rightIndex; // 최소힙이면 bigger이 아니라 smaller로 반대로
      //왼쪽 자식은 없을 수도 있으므로 ?.

      // 자식보다 작으면 바꾸고 다시 재귀
      if (this.arr[index]?.priority < this.arr[bigger]?.priority) {
        // priority로 비교
        const temp = this.arr[index];
        this.arr[index] = this.arr[bigger];
        this.arr[bigger] = temp;
        this.#reheapDown(bigger);
      }
    }
  }

  // 루트삭제
  remove() {
    if (this.arr.length === 0) return false;

    // 마지막 하나남으면 루트에 넣는게 아니라 팝하기
    if (this.arr.length === 1) return this.arr.pop();

    const root = this.arr[0];
    this.arr[0] = this.arr.pop(); //마지막꺼를 뽑아서 루트에 넣기
    this.#reheapDown(0);
    return root; //루트 노드
  }

  sort() {
    //힙정렬
    const sortedArray = [];
    while (this.arr.length > 0) {
      sortedArray.push(this.remove());
    }
    return sortedArray;
  }
  search(value) {
    for (let index = 0; index < this.arr.length; index++) {
      if (this.arr[i].value === value) {
        return i;
      }
    }
    return null;
  }
  update(value, newValue) {
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr[index].value = newValue;
    //마지막에서부터 leaf가 아닌 노드부터
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      //복잡도 O(1/2n)
      this.#heapify(i); //복잡도 O(1)
    }
  }
  // 특정값 삭제
  removeValue(value) {
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr.splice(index, 1);
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // 마지막부터 세었을때 leaf가 아닌 첫번째 노드부터 시작

      //복잡도 1/2n
      this.#heapify(i); //복잡도 1
    }
  }

  //특정 값을 수정하거나 삭제했을때 내부적으로 쓰는 함수 시간복잡도-O(N)
  //우선순위 큐는 heapify가 없는 거긴한데 한다면
  #heapify(index) {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const bigger =
      (this.arr[leftIndex]?.priority || 0) > (this.arr[rightIndex]?.priority || 0)
        ? leftIndex
        : rightIndex; // 45 > undefined == false

    // 부모보다 크면 바꿔주기
    if (this.arr[index]?.priority < this.arr[bigger]?.priority) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[bigger];
      this.arr[bigger] = temp;
    }
  }
}

const pq = new PriorityQueue();
pq.insert(3, 'one');
pq.insert(7, 'two');
pq.insert(2, 'three');
pq.insert(8, 'four');
pq.insert(5, 'five');
pq.insert(6, 'six');
pq.insert(9, 'king'); // 가장 먼저 나와야함

console.log(pq.remove()); // 'king'이 나온다

//최소힙 - 인서트 , 리무브, 히피파이 바꾸기  리힙업 리힙다운
// 민힙과 맥스힙으로 바꾸려면 - 민힙을 맥스힙으로 옮긴다음에 힙피파이해주기
