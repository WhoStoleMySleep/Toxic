type HTML = {
  Element: HTMLElement | null;
  ElementArr: HTMLElement[] | null;
  Canvas: HTMLCanvasElement | null;
}

type Canvas = {
  RenderContext2d: CanvasRenderingContext2D | null
}

export type { HTML, Canvas };
