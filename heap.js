//최대 힙
class MaxHeap {
  arr = [];

  // 내가 부모보다 크면 부모랑 바꾼다.
  #reheapUp(index) {
    if (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index] > this.arr[parentIndex]) {
        //값  바꾸기
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        this.#reheapUp(parentIndex); //재귀 내가 부모인덱스가 되었으므로
      }
    }
  }

  insert(value) {
    const index = this.arr.length;
    this.arr[index] = value;
    this.#reheapUp(index);
  }

  // 삭제는 root만 가능 (최대힙 가장 큰거를 제거하는 순간 그다음으로 큰 숫자가 올라와야함
  #reheapDown(index) {
    const leftIndex = index * 2 + 1;

    if (leftIndex < this.arr.length) {
      // 자식이 있다면
      const rightIndex = index * 2 + 2;
      const bigger = this.arr[leftIndex] > this.arr[rightIndex] ? leftIndex : rightIndex; // 최소힙이면 bigger이 아니라 smaller로 반대로
      // 자식보다 작으면 바꾸고 다시 재귀
      if (this.arr[index] < this.arr[bigger]) {
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
    return root;
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
      if (this.arr[i] === value) {
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
    this.arr[index] = newValue;
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
  #heapify(index) {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const bigger =
      (this.arr[leftIndex] || 0) > (this.arr[rightIndex] || 0) ? leftIndex : rightIndex; // 45 > undefined == false

    // 부모보다 크면 바꿔주기
    if (this.arr[index] < this.arr[bigger]) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[bigger];
      this.arr[bigger] = temp;
    }
  }
}

const heap = new MaxHeap();
heap.insert(8);
heap.insert(19);
heap.insert(23);
heap.insert(32);
heap.insert(45);
heap.insert(56);
heap.insert(78);

console.log(heap.sort());

heap.update(23, 90);
heap.removeValue(32);


//최소힙 - 인서트 , 리무브, 히피파이 바꾸기  리힙업 리힙다운 
// 민힙과 맥스힙으로 바꾸려면 - 민힙을 맥스힙으로 옮긴다음에 힙피파이해주기