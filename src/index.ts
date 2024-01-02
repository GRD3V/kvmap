type KeyListener<T> = (value: T) => void | Promise<void>;

export class KVMap<Map> {
  private db: { [key in keyof Map | string]?: any };

  private listenerList: {
    [key in keyof Map]?: KeyListener<any>[];
  };

  constructor(initDb?: Partial<Map>) {
    this.listenerList = {};
    if (typeof initDb === "object" && !Array.isArray(initDb)) {
      this.db = { ...this.db, ...initDb };
    }
  }

  /** Get a value by its key */
  public get<Key extends keyof Map>(key: Key): Map[Key] | undefined {
    return this.db[key];
  }

  /** Set a value by its key */
  public set<Key extends keyof Map>(key: Key, value: Map[Key]): Map[Key] {
    this.db[key] = value;

    const listenerList = this.listenerList[key];
    if (listenerList) {
      listenerList.forEach((listener) => {
        listener(this.db[key]);
      });
    }

    return this.db[key];
  }

  /** Delete a value by its key */
  public delete<Key extends keyof Map>(key: Key): boolean {
    return delete this.db[key];
  }

  /** Add an event listener for a key  */
  public addListenner<Key extends keyof Map>(
    key: Key,
    listener: (value: Map[Key]) => void
  ): KVMap<Map> {
    if (!this.listenerList[key]) this.listenerList[key] = [];
    this.listenerList[key]?.push(listener);
    return this;
  }

  /** Remove an event listener for a key  */
  public removeListenner<Key extends keyof Map>(
    key: Key,
    listener: (value: Map[Key]) => void
  ): KVMap<Map> {
    const listenerList = this.listenerList[key];
    if (listenerList) {
      const even = (l: KeyListener<Map[Key]>) => l === listener;
      const index = listenerList.findIndex(even);
      listenerList.splice(index, 1);
    }
    return this;
  }
}
