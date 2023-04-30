# a-trie-grows-in-js

Trie implentation in JavaScript

BYO setters.

## Recipes

### Trie as Set

```js
import { BasicTrie } from 'a-trie-grows-in-js';

class TrieSet extends BasicTrie {
  constructor() {
    super();
  }

  add(thing) {
    const cursor = this._cursor(thing, 1, 0);

    if (!cursor[this.EOI]) {
      cursor[this.EOI] = 1;
      this.size++;
    }

    return this;
  }

  *[Symbol.iterator]() {
    for (const [key, _] of this._traverse()) {
      yield key;
    }
  }
}

const example = new TrieSet();

example.add('hello').add('hell').add('hey').add('hello');
exampe.size; // 3

example.has('he'); // false
example.has('hello'); // true

const allItems = [...example]; // ['hello', 'hell', 'hey'];
```

### Trie as Inverted Index

```js
import { BasicTrie } from 'a-trie-grows-in-js';

class Index extends BasicTrie {
  constructor() {
    super();
  }

  add(word, docId) {
    const cursor = this._cursor(word, 1, 0);

    if (!cursor[this.EOI]) {
      cursor[this.EOI] = [docId];
      this.size++;
    } else {
      cursor[this.EOI].push(docId);
    }

    return this;
  }

  *[Symbol.iterator]() {
    for (const [word, docIds] of this._traverse()) {
      yield [word, docIds];
    }
  }
}

const example = new Index();

example.add('hello', 1).add('hell', 1).add('hey', 2).add('hello', 2);
exampe.size; // 3

example.has('he'); // false
example.get('he'); // undefined
example.has('hello'); // true
example.get('hello'); // [1,2]

const allItems = [...example]; // [['hello', [1,2]], ['hell', [1]], ['hey', [2]]]
```
