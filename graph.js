class Graph {
  vertices = [];
  matrix = [];

  insertVertex(name) {
    // name 겹치는지 중복 검사
    this.vertices.push(new Vertex(name));
    this.matrix.push([]); //버텍스 하나 넣을때마다 이차원 배열이 됨
  }

  #searchVertex(name) {
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i].name === name) {
        return i;
      }
    }
    return null;
  }

  insertArc(from, to, value, capacity) {
    const fromV = this.#searchVertex(from); // 인덱스가 0
    const toV = this.#searchVertex(to);
    if (fromV === null || toV === null) {
      throw '찾는 버텍스가 없습니다.';
    }
    this.matrix[fromV][toV] = new Arc(value, capacity);
  }
}

class Vertex {
  constructor(name) {
    this.name = name;
  }
}
class Arc {
  constructor(value, capacity) {
    this.value = value;
    this.capacity = capacity;
    capacity; //커패서티 케파 (자기 역량, 수용량) - 복잡한 그래프는 케파도 가지고 있음
    //arc 관 물담는 관으로 생각
  }
}

const g = new Graph();

g.insertVertex('a');
g.insertVertex('b');
g.insertVertex('c');
g.insertArc('a', 'b', 3);
g.insertArc('a', 'c', 2);
g.insertArc('c', 'a', 4);
g.insertArc('b', 'c', 1);

// 아크는 양방향일떄 서로 다른 value, capa를 가질 수 있다
