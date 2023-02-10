/**
 * LRU
 * tab用的，用来访问最近一次访问，和清除最不常访问的activation缓存
 * @param {number} capacity
 */

class LRUCache<T> {
  capacity: number;
  map: Map<string, T>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
  }

  // 最少使用
  get leastRecentUsed() {
    for (const entry of this.map) {
      return entry[1];
    }
    return undefined;
  }

  // 最近一次访问
  get recent() {
    let last: [string, T] | undefined = undefined;
    for (const entry of this.map) {
      last = entry;
    }
    return last?.[1];
  }

  get(key: string) {
    if (this.map.has(key)) {
      // 调整到iteration的尾部
      const val = this.map.get(key);

      this.map.delete(key);
      this.map.set(key, val as T);

      return val;
    } else {
      return -1;
    }
  }

  del(key: string) {
    this.reflectEvent("beforeDelete", key);
    this.map.delete(key);
    this.reflectEvent("afterDelete", key);
  }

  private reflectEvent(name: Events, data: any) {
    const dispatch = Reflect.get(this, "dispatch");
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    dispatch && dispatch.call(this, name, data);
  }

  put(key: string, value: T) {
    if (this.map.has(key)) {
      // 删除该元素
      this.map.delete(key);
    } else {
      if (this.map.size === this.capacity) {
        // 删除首个元素
        for (const kv of this.map) {
          this.reflectEvent("beforeDelete", kv[0]);
          this.del(kv[0]);
          this.reflectEvent("afterDelete", kv[0]);
          break;
        }
      }
    }
    // 增加元素到iteration的尾部
    this.map.set(key, value);
  }
}

type Events = "beforeDelete" | "afterDelete" | "capacityDelete";
type Listener = (data: any) => void;
type EventsMap = {
  [key in Events]: Listener[];
};

// 为lru提供事件监听
export default class EventLRU<T> extends LRUCache<T> {
  private events: EventsMap = {
    beforeDelete: [],
    afterDelete: [],
    capacityDelete: [],
  };

  addEventListener(name: Events, listener: Listener) {
    this.events[name].push(listener);
  }

  removeEventListener(name: Events, listener: Listener) {
    this.events[name] = this.events[name].filter((fn) => fn !== listener);
  }

  dispatch(name: Events, data: any) {
    this.events[name].forEach((listener) => listener(data));
  }
}
