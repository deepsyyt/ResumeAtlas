import { toPng } from "html-to-image";

export async function generateShareImage(node: HTMLElement): Promise<string> {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
  });
  return dataUrl;
}

