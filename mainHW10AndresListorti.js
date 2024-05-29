// Homework 10
// https://chivalrous-camelotia-9aa.notion.site/Homework-10-27b61e7b3bed47f19bcc4ca352bf1e74


/**
   * Custom hash function implementation
   * @param {string} str - The input string to be hashed
   * @param {number} [hashSize=53] - The size of the hash table (prime number)
   * @returns {number} The hash code
   */
function customHash(str, hashSize = 53) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash * 31 + char) % hashSize;
    }
    return hash;
  }
  

/**
 * Node class for linked list implementation
 */
class Node {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.next = null;
    }
  }
  
  /**
   * Separate chaining implementation for collision handling
   */
  class SeparateChaining {
    constructor(hashSize) {
      this.hashSize = hashSize;
      this.buckets = new Array(hashSize).fill(null);
    }
  
    insert(key, value) {
      const hash = customHash(key, this.hashSize);
      const node = new Node(key, value);
  
      if (!this.buckets[hash]) {
        this.buckets[hash] = node;
      } else {
        let current = this.buckets[hash];
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
    }
  
    get(key) {
      const hash = customHash(key, this.hashSize);
      let current = this.buckets[hash];
  
      while (current) {
        if (current.key === key) {
          return current.value;
        }
        current = current.next;
      }
  
      return undefined;
    }
  
    delete(key) {
      const hash = customHash(key, this.hashSize);
      let current = this.buckets[hash];
      let prev = null;
  
      while (current) {
        if (current.key === key) {
          if (!prev) {
            this.buckets[hash] = current.next;
          } else {
            prev.next = current.next;
          }
          return true;
        }
        prev = current;
        current = current.next;
      }
  
      return false;
    }
  }
  
  
  /**
   * HashTable class
   */
  class HashTable {
    constructor(hashSize = 53) {
      this.hashSize = hashSize;
      this.buckets = new SeparateChaining(hashSize);
    }
  
    insert(key, value) {
      this.buckets.insert(key, value);
    }
  
    get(key) {
      return this.buckets.get(key);
    }
  
    delete(key) {
      return this.buckets.delete(key);
    }
  }
  
  // Tests
  function runTests() {
    const hashTable = new HashTable();
  
    console.log('Test: insert and get');
    hashTable.insert('apple', 10);
    hashTable.insert('banana', 20);
    console.log('Get "apple":', hashTable.get('apple')); // Expected: 10
    console.log('Get "banana":', hashTable.get('banana')); // Expected: 20
  
    console.log('\nTest: delete');
    hashTable.delete('apple');
    console.log('Get "apple":', hashTable.get('apple')); // Expected: undefined
    console.log('Get "banana":', hashTable.get('banana')); // Expected: 20
  
    console.log('\nTest: collision handling');
    const hashSize = 3;
    const collisionHashTable = new HashTable(hashSize);
    collisionHashTable.insert('apple', 10);
    collisionHashTable.insert('banana', 20);
    collisionHashTable.insert('cherry', 30);
    console.log('Get "apple":', collisionHashTable.get('apple')); // Expected: 10
    console.log('Get "banana":', collisionHashTable.get('banana')); // Expected: 20
    console.log('Get "cherry":', collisionHashTable.get('cherry')); // Expected: 30
  }
  
  runTests();