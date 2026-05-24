import { motion, useDragControls } from "framer-motion";
import { useRef } from "react";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const WORKSPACE_PADDING = 400;
const WORKSPACE_WIDTH = A4_WIDTH + WORKSPACE_PADDING * 2;
const WORKSPACE_HEIGHT = A4_HEIGHT + WORKSPACE_PADDING * 2;

interface EditorPreviewProps {
  text: string;
}

export function EditorPreview({ text }: EditorPreviewProps) {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <div
      className="
        h-full flex-1 cursor-grab overflow-auto rounded-2xl border border-border
        bg-muted
        active:cursor-grabbing
      "
      onPointerDown={(e) => dragControls.start(e)}
    >
      <div
        ref={workspaceRef}
        className="relative"
        style={{ width: WORKSPACE_WIDTH, height: WORKSPACE_HEIGHT }}
      >
        <motion.div
          drag
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={workspaceRef}
          dragMomentum={false}
          dragElastic={0}
          className="absolute rounded-sm bg-white shadow-xl"
          style={{
            width: A4_WIDTH,
            height: A4_HEIGHT,
            left: WORKSPACE_PADDING,
            top: WORKSPACE_PADDING,
          }}
        >
          <div className="
            pointer-events-none p-12 text-sm wrap-break-word whitespace-pre-wrap
            text-black select-none
          ">
            {text}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
