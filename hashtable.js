class Hashtable {
  data = []; //capa로 제한
  constructor(capa) {
    //공간복잡도 O(n) n은 넣어야하는 값들의 개수
    this.capa = capa;
  }
  insert(key, value) {
    //시간복잡도 O(1) (hash제외)
    const hash = hashF(key, this.capa);
    if (!this.data[hash]) this.data[hash] = [];
    this.data[hash].push({ key, value });
  }
  search(key) {
    //시간복잡도 O(N/hash == 1) hash성능이 좋은 경우 1 아니면 N (hash의 성능이 중요함!!!)
    const hash = hashF(key);

    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) return this.data[hash][i].value;
      }
    }
    return null;
  }
  update(key, value) {
    const hash = hashF(key);

    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) this.data[hash][i].value = value;
      }
    }
  }

  delete(key) {
    const hash = hashF(key);
    if (this.data[hash]) {
      for (let i = 0; i < this.data[hash].length; i++) {
        if (this.data[hash][i].key === key) this.data[hash].splice(i, 1);
      }
    }
  }
}

// 칸수 제한있을때 어떻게 데이터를 저장해야하나?
function hashF(key, mod) {
  if (typeof key === 'string') {
    key.split('').reduce((a, c) => a + c.charCodeAt(), 0) % mod;
    //['a','b','c] -> [97,98,99] => 294 (다더하면) ->  24  (294 % 30)
  }
  if (typeof key === 'number') {
    return key % mod;
  }
}

const ht = new Hashtable(30);
ht.insert(31, 'hello');
ht.insert(61, 'bye');
ht.insert(83, true);
ht.insert(115, 115);
console.log(ht.search(61)); //bye
ht.search(99); //null
ht.update(83, false);
ht.delete(31);

// 해시함수를 쓸때는 데이터의 분포도를 잘 확인해야함 키의 분포가 쏠려있다면 나머지로 하면 별로 좋지않은 방법임