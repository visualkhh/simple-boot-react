export namespace ObjectUtils {
  export namespace Path {
    export const to = <T = any>(obj: any) => {
      const destination: T = {} as any;
      Object.entries(obj).forEach(([path, value]) => {
        set(destination, path, value);
      });

      return destination;
    };
    export const set = (obj: any, path: string, value: any) => {
      const pathParts = path.split('.');
      let current = obj;

      for (let i = 0; i < pathParts.length; i++) {
        let key = pathParts[i];
        const isArrayItem = key.includes('[') && key.includes(']');
        const isLastKey = i === pathParts.length - 1;

        if (isArrayItem) {
          let [arrayKey, indexStr] = key.split('[');
          const index = parseInt(indexStr.replace(']', ''), 10);

          if (!Array.isArray(current[arrayKey])) {
            current[arrayKey] = [];
          }

          if (isLastKey) {
            current[arrayKey][index] = value;
          } else {
            if (!current[arrayKey][index]) {
              current[arrayKey][index] = {};
            }
            current = current[arrayKey][index];
          }
        } else {
          if (isLastKey) {
            current[key] = value;
          } else {
            if (!current[key]) {
              current[key] = {};
            }
            current = current[key];
          }
        }
      }
    };
  }
}
