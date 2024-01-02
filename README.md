# kvmap

`kvmap` is a simple, in-memory data store based on key-value pairs. It is possible to use type declarations to validate the data store.

```bash
npm install kvmap
```

---

## Use `kvmap` with `Javascript` & `JSDoc`

```javascript
// @ts-check
import { KVMap } from "kvmap";

/**
 * @type {KVMap<{
 *   a: string,
 *   b: { x: number, y: number },
 *   [key: string]: unknown,
 * }>}
 */
const kvmap = new KVMap({
  a: "Hello world!",
});

console.log(kvmap.get("a")); // Hello world!
console.log(kvmap.get("b")); // undefined
console.log(kvmap.get("c")); // undefined

kvmap.set("b", { x: 1, y: 2 });
console.log(kvmap.get("b")); // {x: 1, y: 2}

kvmap.set("c", 123);
console.log(kvmap.get("c")); // 123

kvmap.delete("a");
console.log(kvmap.get("a")); // undefined

// With listener
kvmap.addListener("b", (value) => {
  console.log(value);
});

kvmap.set("b", { x: 2, y: 1 });

// console: {x: 2, y: 1}
```

---

## Use `kvmap` with `Typescript`

```typescript
import { KVMap } from "kvmap";

type KeyValueMap = {
  a: string;
  b: { x: number; y: number };

  // Allow unknown
  [key: string]: unknown;
};

const kvmap = new KVMap<KeyValueMap>({
  a: "Hello world!",
});

console.log(kvmap.get("a")); // Hello world!
console.log(kvmap.get("b")); // undefined
console.log(kvmap.get("c")); // undefined

kvmap.set("b", { x: 1, y: 2 });
console.log(kvmap.get("b")); // {x: 1, y: 2}

kvmap.set("c", 123);
console.log(kvmap.get("c")); // 123

kvmap.delete("a");
console.log(kvmap.get("a")); // undefined

// With listener
kvmap.addListener("b", (value) => {
  console.log(value);
});

kvmap.set("b", { x: 2, y: 1 });

// console: {x: 2, y: 1}
```
