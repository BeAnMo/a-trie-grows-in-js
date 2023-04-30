// @ts-check

/**
 * @typedef {Object} EmptyTrie
 * @typedef {Object} TrieCursor
 * @typedef {Object} TrieValue A leaf node on a trie.
 */

const EOI = '_$_'; // 'end of item'

function* traverseTrie(trie, path, eoi = EOI) {
  for (const k of Object.keys(trie)) {
    if (k === eoi) {
      yield [path.join(''), trie[eoi]];
    } else {
      yield* traverseTrie(trie[k], [...path, k]);
    }
  }
}

class TrieError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'TrieError';
  }
}

function BasicTrie(trie = Object.create(null)) {
  this._t = trie;
  this.size = 0;
}

/**
 * @description The value that represents the end of an item.
 * @assumes A unique value.
 */
BasicTrie.prototype.EOI = '_$_';
/**
 * @description The empty trie value.
 * @type {EmptyTrie}
 */
BasicTrie.prototype.NONE = {};

BasicTrie.prototype._traverse = function () {
  return traverseTrie(this._t, [], this.EOI);
};

/**
 * @typedef {EmptyTrie | TrieCursor} CursorReturn
 * @typedef {[CursorReturn, TrieCursor]} CursorAndParentReturn
 * @description Returns a trie-cursor from the given STR.
 * When SHOULDFILL is truthy, the trie is filled when encountering
 *   UNDEFINED for a char of STR.
 * When RETURNPARENT is truthy, a 2-element array containing
 *   the cursor and the parent is returned.
 * @param {string} str
 * @param {any} shouldFill
 * @param {any} returnParent
 * @returns {CursorReturn | CursorAndParentReturn}
 */
BasicTrie.prototype._cursor = function (
  str,
  shouldFill = false,
  returnParent = false
) {
  let cursor = this._t;

  if (returnParent) {
    let parent = cursor;

    for (const ch of str) {
      parent = cursor;
      if (cursor[ch] === undefined && !shouldFill) {
        return [this.NONE, parent];
      }

      if (cursor[ch] === undefined) {
        cursor = cursor[ch] = Object.create(null);
      } else {
        cursor = cursor[ch];
      }
    }

    return [cursor || this.NONE, parent];
  } else {
    for (const ch of str) {
      if (cursor[ch] === undefined && !shouldFill) {
        return this.NONE;
      }

      if (cursor[ch] === undefined) {
        cursor = cursor[ch] = Object.create(null);
      } else {
        cursor = cursor[ch];
      }
    }

    return cursor || this.NONE;
  }
};

/**
 * @param {string} str
 * @returns {TrieValue?}
 */
BasicTrie.prototype.get = function (str) {
  const cursor = this._cursor(str, 0, 0);
  return cursor === this.NONE ? null : cursor[this.EOI];
};

/**
 * @description Returns true if STR exists in the trie.
 * @param {string} str
 * @returns {boolean}
 */
BasicTrie.prototype.has = function (str) {
  return !!this.get(str);
};

/**
 * @description Removes STR from the trie.
 * @param {string} str
 * @returns {BasicTrie}
 */
BasicTrie.prototype.delete = function (str) {
  let [cursor, parent] = this._cursor(str, 0, 1);

  if (cursor !== this.NONE) {
    delete parent[str.slice(-1)[0]];
    this.size--;
  }

  return this;
};

/**
 * @abstract
 * @description Adds a new value to the trie.
 * @param  {...any} args
 */
BasicTrie.prototype.add = function (...args) {
  throw new TrieError(`'add' method not implemented!`);
};

/**
 * @description Create a new trie from the cursor of STR.
 * If the cursor is NONE, creates an empty trie.
 * @param {string} str
 * @returns {BasicTrie}
 */
BasicTrie.prototype.branch = function (str) {
  const cursor = this._cursor(str, 0, 0);

  return new BasicTrie(cursor === this.NONE ? null : cursor);
};

/**
 * @description Resets the internal state of the trie.
 */
BasicTrie.prototype.clear = function () {
  this._t = Object.create(null);
  this.size = 0;
};

export { BasicTrie };
