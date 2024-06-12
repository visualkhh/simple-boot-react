export class ClipBoardUtils {
  static readText(clipboard: Clipboard = navigator.clipboard): Promise<string> {
    return clipboard.readText();
  }

  static read(clipboard: Clipboard = navigator.clipboard): Promise<ClipboardItems> {
    return clipboard.read();
  }

  static writeText(data: string | number, clipboard: Clipboard = navigator.clipboard): Promise<void> {
    return clipboard.writeText(typeof data === 'number' ? String(data) : data);
  }

  static write(data: ClipboardItems, clipboard: Clipboard = navigator.clipboard): Promise<void> {
    return clipboard.write(data);
  }
}
