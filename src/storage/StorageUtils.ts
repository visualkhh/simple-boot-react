export class StorageUtils {
  public static setStorageItem(k: string, v: string | any, storage: Storage) {
    if (typeof v === 'object') {
      v = JSON.stringify(v);
    }
    storage.setItem(k, v);
  }

  public static getStorageItem(k: string, storage: Storage) {
    return storage.getItem(k);
  }

  public static removeStorageItem(k: string, storage: Storage) {
    return storage.removeItem(k);
  }

  public static getStorageJsonObjectItem<T>(k: string, storage: Storage): T | null {
    const item = storage.getItem(k);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }

  public static cutStorageItem(k: string, storage: Storage) {
    const data = StorageUtils.getStorageItem(k, storage);
    StorageUtils.removeStorageItem(k, storage);
    return data;
  }

  public static cutStorageJsonObjectItem<T>(k: string, storage: Storage): T | null {
    const item = StorageUtils.getStorageJsonObjectItem(k, storage);
    StorageUtils.removeStorageItem(k, storage);
    return (item as T) ?? null;
  }

  public static clearStorage(storage: Storage) {
    storage.clear();
  }
}
