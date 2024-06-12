export class ScriptUtils {
  public static getVariablePaths(script: string): Set<string> {
    const usingVars = new Set<string>();

    class GetDetectProxy implements ProxyHandler<any> {
      public usingVars = usingVars;

      constructor(public prefix?: string) {}

      set(target: any, p: string | symbol, value: any, receiver: any): boolean {
        return true;
      }

      get(target: any, p: string | symbol, receiver: any): any {
        let items;
        if (typeof p === 'string' && isNaN(Number(p))) {
          items = this.prefix ? this.prefix + '.' + p : p;
          this.usingVars.add(items);
        } else if (typeof p === 'string' && !isNaN(Number(p))) {
          items = this.prefix ? this.prefix + '[' + p + ']' : p;
          this.usingVars.add(items);
        }
        return new Proxy(() => {}, new GetDetectProxy(items));
      }
    }

    const destUser = new Proxy(() => {}, new GetDetectProxy());

    try {
      // eslint-disable-next-line no-new-func,no-unused-expressions
      Function(`"use strict"; ${script}; `).bind(destUser)();
    } catch (e) {
      console.error(e);
    }
    return usingVars;
  }

  public static evalReturn(script: string, thisTarget: any): any {
    // if (!script.startsWith('this.')) {
    //     script = 'this.' + script;
    // }
    return this.eval('return ' + script + ';', thisTarget);
  }

  public static eval(script: string, thisTarget: any): any {
    // eslint-disable-next-line no-new-func,no-unused-expressions
    return Function(`"use strict"; ${script} `).bind(thisTarget)();
  }

  public static loadElement(
    document: Document,
    name: string,
    option: { attribute?: { [key: string]: string }; body?: string; created: (tag: HTMLElement) => void }
  ) {
    return new Promise((resolve, reject) => {
      const tag = document.createElement(name);
      if (option?.body) {
        tag.innerHTML = option.body;
      } else {
        tag.onload = resolve;
      }
      tag.onerror = reject;
      if (option?.attribute) {
        for (const [key, value] of Object.entries(option.attribute)) {
          tag.setAttribute(key, value);
        }
      }
      option.created(tag);
      if (option?.body && tag.parentNode) {
        resolve(tag);
      }
      // document.head.append(tag);
    });
  }

  public static loadStyleSheet(document: Document, href: string, attribute: { [key: string]: string } = {}) {
    // const tag = document.createElement('link');
    // tag.type = 'text/css';
    // tag.setAttribute('rel', 'stylesheet');
    // tag.href = href;
    // for (const [key, value] of Object.entries(attribute)) {
    //     tag.setAttribute(key, value);
    // }
    // target.append(tag)
    attribute.type = 'text/css';
    attribute.rel = 'stylesheet';
    attribute.href = href;
    return ScriptUtils.loadElement(document, 'link', {
      attribute,
      created: e => {
        document.head.append(e);
      }
    });
  }

  public static loadScript(document: Document, src: string, attribute: { [key: string]: string } = {}) {
    attribute.type = attribute?.type ?? 'text/javascript';
    attribute.src = src;
    return ScriptUtils.loadElement(document, 'script', { attribute, created: e => document.head.append(e) });
  }
  public static loadScriptBody(document: Document, body: string, attribute: { [key: string]: string } = {}) {
    attribute.type = attribute?.type ?? 'text/javascript';
    return ScriptUtils.loadElement(document, 'script', { body, attribute, created: e => document.head.append(e) });
  }
}
