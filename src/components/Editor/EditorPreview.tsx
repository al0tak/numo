import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Download, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { useTranslation } from "@/i18n";
import { type Invoice } from "@/types/invoice";

import { InvoiceDocument } from "./InvoiceDocument";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const BASE_X = -A4_WIDTH / 2;
const BASE_Y = -A4_HEIGHT / 2;
const FIT_PADDING = 32;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;
const WHEEL_ZOOM_INTENSITY = 0.004;
const BUTTON_ZOOM_STEP = 1.2;
const SPRING = { type: "spring", stiffness: 320, damping: 32, mass: 0.5 } as const;

interface EditorPreviewProps {
  invoice: Invoice;
}

function clampZoom(z: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
}

function computeFitZoom(containerWidth: number, containerHeight: number) {
  if (containerWidth <= 0 || containerHeight <= 0) return 1;
  const available = {
    w: Math.max(0, containerWidth - FIT_PADDING * 2),
    h: Math.max(0, containerHeight - FIT_PADDING * 2),
  };
  return clampZoom(Math.min(available.w / A4_WIDTH, available.h / A4_HEIGHT));
}

// The browser uses document.title as the suggested "Save as PDF" filename, so we
// derive a clean base name from the invoice (no extension — the browser adds .pdf).
function invoicePrintTitle(invoice: Invoice, fallback: string) {
  const base = (invoice.companyName || invoice.topText || fallback)
    .trim()
    .replace(/[^\wÀ-ɏЀ-ӿ-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || fallback;
}

export function EditorPreview({ invoice }: EditorPreviewProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [zoomDisplay, setZoomDisplay] = useState(1);
  const initializedRef = useRef(false);

  const x = useMotionValue(BASE_X);
  const y = useMotionValue(BASE_Y);
  const scale = useMotionValue(1);

  useMotionValueEvent(scale, "change", (v) => setZoomDisplay(v));

  const stopAll = useCallback(() => {
    x.stop();
    y.stop();
    scale.stop();
  }, [x, y, scale]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
      if (!initializedRef.current && width > 0 && height > 0) {
        initializedRef.current = true;
        scale.set(computeFitZoom(width, height));
        x.set(BASE_X);
        y.set(BASE_Y);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [scale, x, y]);

  const applyZoom = useCallback(
    (factor: number, focalX: number, focalY: number, animated: boolean) => {
      stopAll();
      const currentZoom = scale.get();
      const nextZoom = clampZoom(currentZoom * factor);
      if (nextZoom === currentZoom) return;
      const ratio = nextZoom / currentZoom;
      const el = containerRef.current;
      let nextX = x.get();
      let nextY = y.get();
      if (el) {
        const rect = el.getBoundingClientRect();
        const dcx = focalX - rect.width / 2;
        const dcy = focalY - rect.height / 2;
        const currentPanX = x.get() - BASE_X;
        const currentPanY = y.get() - BASE_Y;
        nextX = BASE_X + dcx * (1 - ratio) + currentPanX * ratio;
        nextY = BASE_Y + dcy * (1 - ratio) + currentPanY * ratio;
      }
      if (animated) {
        animate(scale, nextZoom, SPRING);
        animate(x, nextX, SPRING);
        animate(y, nextY, SPRING);
      } else {
        scale.set(nextZoom);
        x.set(nextX);
        y.set(nextY);
      }
    },
    [scale, x, y, stopAll],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        const focalX = e.clientX - rect.left;
        const focalY = e.clientY - rect.top;
        const factor = Math.exp(-e.deltaY * WHEEL_ZOOM_INTENSITY);
        applyZoom(factor, focalX, focalY, false);
      } else {
        stopAll();
        x.set(x.get() - e.deltaX);
        y.set(y.get() - e.deltaY);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [applyZoom, stopAll, x, y]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    stopAll();
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startX = x.get();
    const startY = y.get();

    const onMove = (ev: PointerEvent) => {
      x.set(startX + (ev.clientX - startClientX));
      y.set(startY + (ev.clientY - startClientY));
    };
    const cleanup = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", cleanup);
      window.removeEventListener("pointercancel", cleanup);
      window.removeEventListener("blur", cleanup);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", cleanup);
    window.addEventListener("pointercancel", cleanup);
    window.addEventListener("blur", cleanup);
  };

  const handleZoomIn = () => {
    applyZoom(BUTTON_ZOOM_STEP, size.width / 2, size.height / 2, true);
  };
  const handleZoomOut = () => {
    applyZoom(1 / BUTTON_ZOOM_STEP, size.width / 2, size.height / 2, true);
  };
  const handleFit = () => {
    if (size.width === 0 || size.height === 0) return;
    stopAll();
    animate(scale, computeFitZoom(size.width, size.height), SPRING);
    animate(x, BASE_X, SPRING);
    animate(y, BASE_Y, SPRING);
  };

  const handleDownload = () => {
    // Print the invoice via the browser's own engine: vector text, selectable,
    // tiny file, pixel-identical to the preview (same HTML/CSS). The print
    // stylesheet (global.css) hides the app and shows only `.invoice-print-frame`.
    const previousTitle = document.title;
    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restoreTitle);
    };
    document.title = invoicePrintTitle(invoice, t.invoice.untitled);
    window.addEventListener("afterprint", restoreTitle);
    window.print();
  };

  return (
    <div
      ref={containerRef}
      className="
        relative h-full flex-1 cursor-grab touch-none overflow-hidden
        rounded-2xl border border-border bg-muted
        active:cursor-grabbing
      "
      onPointerDown={onPointerDown}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 rounded-sm bg-white shadow-xl"
        style={{
          width: A4_WIDTH,
          height: A4_HEIGHT,
          x,
          y,
          scale,
          willChange: "transform",
        }}
      >
        <InvoiceDocument invoice={invoice} />
      </motion.div>

      {/* Print-only copy of the document, rendered to <body> so the print
          stylesheet can show it on its own clean A4 page (see global.css). */}
      {createPortal(
        <div data-print-frame>
          <InvoiceDocument invoice={invoice} />
        </div>,
        document.body,
      )}

      <div
        className="
          absolute right-3 bottom-3 flex items-center gap-1 rounded-lg border
          border-border bg-card/80 p-1 shadow-sm backdrop-blur-sm
        "
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={t.editor.downloadPdf}
          onClick={handleDownload}
          className="
            flex h-8 cursor-pointer items-center justify-center gap-1.5
            rounded-md px-2 text-xs font-medium text-foreground/70
            transition-colors
            hover:bg-foreground/5 hover:text-foreground
          "
        >
          <Download size={14} />
          <span>{t.editor.downloadPdf}</span>
        </button>
      </div>

      <div
        className="
          absolute bottom-3 left-3 flex items-center gap-1 rounded-lg border
          border-border bg-card/80 p-1 shadow-sm backdrop-blur-sm
        "
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={t.editor.zoomOut}
          onClick={handleZoomOut}
          disabled={zoomDisplay <= MIN_ZOOM + 1e-6}
          className="
            flex size-8 cursor-pointer items-center justify-center rounded-md
            text-foreground/70 transition-colors
            hover:bg-foreground/5 hover:text-foreground
            disabled:cursor-not-allowed disabled:opacity-40
            disabled:hover:bg-transparent
          "
        >
          <ZoomOut size={16} />
        </button>
        <button
          type="button"
          aria-label={t.editor.fitToScreen}
          onClick={handleFit}
          className="
            flex h-8 min-w-16 cursor-pointer items-center justify-center gap-1.5
            rounded-md px-2 text-xs font-medium text-foreground/70
            transition-colors
            hover:bg-foreground/5 hover:text-foreground
          "
        >
          <Maximize2 size={14} />
          <span className="tabular-nums">{Math.round(zoomDisplay * 100)}%</span>
        </button>
        <button
          type="button"
          aria-label={t.editor.zoomIn}
          onClick={handleZoomIn}
          disabled={zoomDisplay >= MAX_ZOOM - 1e-6}
          className="
            flex size-8 cursor-pointer items-center justify-center rounded-md
            text-foreground/70 transition-colors
            hover:bg-foreground/5 hover:text-foreground
            disabled:cursor-not-allowed disabled:opacity-40
            disabled:hover:bg-transparent
          "
        >
          <ZoomIn size={16} />
        </button>
      </div>
    </div>
  );
}
