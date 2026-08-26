/*
 * Copyright 2023 OceanBase
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  DEFALT_WIDTH,
  MAX_PANEL_WIDTH,
  PANEL_CHROME_WIDTH,
  VIEWPORT_MARGIN
} from '../const';

let measureCtx: CanvasRenderingContext2D | null | undefined;

function getMeasureContext(): CanvasRenderingContext2D | null {
  if (measureCtx !== undefined) {
    return measureCtx;
  }
  if (typeof document === 'undefined') {
    measureCtx = null;
    return null;
  }
  try {
    measureCtx = document.createElement('canvas').getContext('2d');
  } catch {
    measureCtx = null;
  }
  return measureCtx;
}

export function measureTextWidth(text: string): number {
  if (!text) {
    return 0;
  }
  const ctx = getMeasureContext();
  if (!ctx || typeof window === 'undefined') {
    return 0;
  }
  try {
    const style = window.getComputedStyle(document.body);
    const fontWeight = style.fontWeight || '400';
    const fontSize = style.fontSize || '14px';
    const fontFamily = style.fontFamily || 'sans-serif';
    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const width = ctx.measureText(text).width;
    return Number.isFinite(width) ? width : 0;
  } catch {
    return 0;
  }
}

export function clampAdaptivePanelWidth(
  contentPx: number,
  viewportWidth?: number
): number {
  const vw =
    typeof viewportWidth === 'number' && Number.isFinite(viewportWidth)
      ? viewportWidth
      : typeof window !== 'undefined'
        ? window.innerWidth
        : MAX_PANEL_WIDTH;
  const viewportCap = Math.max(DEFALT_WIDTH, vw - VIEWPORT_MARGIN);
  const upper = Math.min(MAX_PANEL_WIDTH, viewportCap);
  if (!Number.isFinite(contentPx) || contentPx <= 0) {
    return DEFALT_WIDTH;
  }
  const needed = Math.ceil(contentPx + PANEL_CHROME_WIDTH);
  return Math.min(upper, Math.max(DEFALT_WIDTH, needed));
}

/** 由当前可见标题文本估算面板宽；测量失败或无标题时回落 DEFALT_WIDTH */
export function calcAdaptivePanelWidthFromTitles(
  titles: string[],
  viewportWidth?: number
): number {
  if (!titles?.length) {
    return DEFALT_WIDTH;
  }
  let maxContent = 0;
  for (const title of titles) {
    if (!title) {
      continue;
    }
    const w = measureTextWidth(title);
    if (w > maxContent) {
      maxContent = w;
    }
  }
  if (maxContent <= 0) {
    return DEFALT_WIDTH;
  }
  return clampAdaptivePanelWidth(maxContent, viewportWidth);
}
