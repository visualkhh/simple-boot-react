import { Storage } from './Storage';
type ItemSet = { key: string; value: string };

export class MemoryStorage implements Storage {
  private memory: ItemSet[];
  constructor() {
    this.memory = [];
  }

  get length(): number {
    return this.memory.length;
  }

  clear(): void {
    this.memory = [];
  }

  getItemSet(key: string): ItemSet | null;
  getItemSet(key: number): ItemSet | null;
  getItemSet(keyOrIndex: string | number): ItemSet | null {
    const item =
      typeof keyOrIndex === 'string' ? this.memory.find(item => item.key === keyOrIndex) : this.memory[keyOrIndex];
    return item ?? null;
  }

  findIndex(key: string): number | null {
    const idx = this.memory.findIndex(item => item.key === key);
    return idx < 0 ? null : idx;
  }

  getItem(key: string): string | null {
    const item = this.getItemSet(key);
    if (item) {
      return item.value;
    }
    return null;
  }

  key(index: number): string | null {
    return this.memory[index].key ?? null;
  }

  removeItem(key: string): void {
    const index = this.findIndex(key);
    if (index !== null) {
      this.memory.splice(index, 1);
    }
  }

  setItem(key: string, value: string): void {
    const prev = this.getItemSet(key);
    if (prev) {
      prev.value = value;
    }
    this.memory.push({ key, value });
  }
}
