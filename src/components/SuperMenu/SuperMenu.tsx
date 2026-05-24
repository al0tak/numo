import { motion } from "framer-motion";

import { SuperMenuEditorBody } from "./editor/SuperMenuEditorBody";
import { SuperMenuHomeBody } from "./home/SuperMenuHomeBody";
import { spring } from "./spring";

interface SuperMenuPropsBase {
  variant: "home" | "editor";
}

interface SuperMenuHomeProps extends SuperMenuPropsBase {
  variant: "home";
}

interface SuperMenuEditorProps extends SuperMenuPropsBase {
  variant: "editor";
  editorText: string;
  onEditorTextChange: (value: string) => void;
}

export type SuperMenuProps = SuperMenuHomeProps | SuperMenuEditorProps;

export function SuperMenu(props: SuperMenuProps) {
  const isHome = props.variant === "home";

  return (
    <motion.div
      layoutId="nav-panel"
      transition={spring}
      className={[
        "flex flex-col",
        isHome
          ? "w-[360px] items-center gap-5 rounded-3xl border border-border bg-card/60 p-4 backdrop-blur-xl"
          : "h-full w-[280px] shrink-0 gap-4 overflow-y-auto rounded-2xl border border-border bg-card p-5",
      ].join(" ")}
    >
      {isHome ? (
        <SuperMenuHomeBody />
      ) : (
        <SuperMenuEditorBody
          editorText={props.editorText}
          onEditorTextChange={props.onEditorTextChange}
        />
      )}
    </motion.div>
  );
}
