import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SuperMenuEditorBody } from "./editor/SuperMenuEditorBody";
import { SuperMenuHomeBody } from "./home/SuperMenuHomeBody";
import { SuperMenuSettingsBody } from "./settings/SuperMenuSettingsBody";

export type SuperMenuVariant = "home" | "editor" | "settings";

export interface SuperMenuProps {
  variant: SuperMenuVariant;
  editorText: string;
  onEditorTextChange: (value: string) => void;
}

const OUTER_CLASSES: Record<SuperMenuVariant, string> = {
  home: `
    h-[560px] w-[300px] overflow-hidden rounded-r-3xl border border-l-[3px]
    border-book-border bg-book text-book-foreground shadow-lg
  `,
  editor: `
    h-[560px] w-[900px] max-w-full overflow-hidden rounded-3xl border
    border-book-border bg-book text-book-foreground shadow-lg
  `,
  settings: `
    h-[560px] w-[300px] overflow-hidden rounded-l-3xl border border-r-[3px]
    border-book-border bg-book text-book-foreground shadow-lg
  `,
};

const INNER_CLASSES: Record<SuperMenuVariant, string> = {
  home: "flex h-full w-full flex-col items-stretch gap-5 p-6 pb-5",
  editor: "flex h-full w-full flex-row",
  settings: "flex h-full w-full flex-col items-stretch gap-5 p-6 pb-5",
};

function isFlipTransition(
  from: SuperMenuVariant,
  to: SuperMenuVariant,
): boolean {
  return (
    (from === "home" && to === "settings") ||
    (from === "settings" && to === "home")
  );
}

const FLIP_OUT = { duration: 0.28, ease: [0.4, 0, 1, 1] as const };
const FLIP_IN = { duration: 0.32, ease: [0, 0, 0.2, 1] as const };
const BODY_FADE_OUT = { duration: 0.18, ease: "easeIn" as const };
const BODY_FADE_IN = { duration: 0.24, ease: "easeOut" as const };
const MORPH_DURATION_MS = 450;
const layoutTransition = { duration: 0.5, ease: [0.6, 0, 0.4, 1] as const };

export function SuperMenu({
  variant,
  editorText,
  onEditorTextChange,
}: SuperMenuProps) {
  const [displayVariant, setDisplayVariant] = useState(variant);
  const displayVariantRef = useRef(variant);
  const containerControls = useAnimationControls();
  const bodyControls = useAnimationControls();

  // Keep ref in sync with state — used by the transition effect so it doesn't
  // re-fire (and cancel itself) when we update displayVariant mid-flight.
  useEffect(() => {
    displayVariantRef.current = displayVariant;
  }, [displayVariant]);

  useEffect(() => {
    const from = displayVariantRef.current;
    const to = variant;
    if (from === to) return;
    let cancelled = false;

    const run = async () => {
      if (isFlipTransition(from, to)) {
        await containerControls.start({ scaleX: 0 }, FLIP_OUT);
        if (cancelled) return;
        setDisplayVariant(to);
        await containerControls.start({ scaleX: 1 }, FLIP_IN);
      } else {
        await bodyControls.start({ opacity: 0 }, BODY_FADE_OUT);
        if (cancelled) return;
        setDisplayVariant(to);
        await new Promise<void>((resolve) =>
          setTimeout(resolve, MORPH_DURATION_MS),
        );
        if (cancelled) return;
        await bodyControls.start({ opacity: 1 }, BODY_FADE_IN);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [variant, containerControls, bodyControls]);

  return (
    <motion.div
      layout
      initial={{ scaleX: 1 }}
      animate={containerControls}
      transition={{ layout: layoutTransition }}
      style={{ transformOrigin: "center center" }}
      className={OUTER_CLASSES[displayVariant]}
    >
      <motion.div
        initial={{ opacity: 1 }}
        animate={bodyControls}
        className={INNER_CLASSES[displayVariant]}
      >
        {displayVariant === "home" && <SuperMenuHomeBody />}
        {displayVariant === "editor" && (
          <SuperMenuEditorBody
            editorText={editorText}
            onEditorTextChange={onEditorTextChange}
          />
        )}
        {displayVariant === "settings" && <SuperMenuSettingsBody />}
      </motion.div>
    </motion.div>
  );
}
