export class KVMap<Map> {
  private db: { [key in keyof Map | string]?: any };

  constructor(initDb?: Partial<Map>) {
    if (typeof initDb === "object" && !Array.isArray(initDb)) {
      this.db = { ...this.db, ...initDb };
    }
  }

  public get<Key extends keyof Map>(key: Key): Map[Key] | undefined {
    return this.db[key];
  }

  public set<Key extends keyof Map>(key: Key, value: Map[Key]): void {
    this.db[key] = value;
  }

  public delete<Key extends keyof Map>(key: Key) {
    return delete this.db[key];
  }
}
