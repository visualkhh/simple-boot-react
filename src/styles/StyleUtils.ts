export class StyleUtils {
  static getComputedStyle(k: string, window: Window) {
    return window.getComputedStyle(document.documentElement).getPropertyValue(k);
  }

  // static getStyleValue(element: HTMLElement, styleName: string): string {
  //     if (element.style[styleName]) {
  //         return element.style[styleName];
  //     } else if (element.currentStyle) {
  //         return element.currentStyle[styleName];
  //     } else if (document.defaultView && document.defaultView.getComputedStyle) {
  //         styleName = styleName.replace(/([A-Z])/g, '-$1').toLowerCase();
  //         const s = document.defaultView.getComputedStyle(element, '');
  //         return s && s.getPropertyValue(styleName);
  //     } else {
  //         return null;
  //     }
  // }
}
