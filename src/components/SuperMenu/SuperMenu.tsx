import { motion } from "framer-motion";

import { type Invoice } from "@/types/invoice";

import { SuperMenuEditorBody } from "./editor/SuperMenuEditorBody";
import { SuperMenuHomeBody } from "./home/SuperMenuHomeBody";
import { SuperMenuSettingsBody } from "./settings/SuperMenuSettingsBody";
import { spring } from "./spring";

interface SuperMenuHomeProps {
  variant: "home";
}

interface SuperMenuEditorProps {
  variant: "editor";
  invoice: Invoice;
  onInvoiceChange: (invoice: Invoice) => void;
}

interface SuperMenuSettingsProps {
  variant: "settings";
}

export type SuperMenuProps =
  | SuperMenuHomeProps
  | SuperMenuEditorProps
  | SuperMenuSettingsProps;

const VARIANT_CLASSES: Record<SuperMenuProps["variant"], string> = {
  home: `
    w-full max-w-[360px] items-center gap-5 rounded-3xl border border-border
    bg-card/60 p-4 backdrop-blur-xl
  `,
  editor: `
    h-full w-[280px] shrink-0 gap-4 overflow-y-auto rounded-2xl border
    border-border bg-card p-5
  `,
  settings: `
    h-full w-full max-w-[480px] overflow-hidden rounded-2xl border border-border
    bg-card
  `,
};

export function SuperMenu(props: SuperMenuProps) {
  return (
    <motion.div
      layoutId="nav-panel"
      transition={spring}
      className={["flex flex-col", VARIANT_CLASSES[props.variant]].join(" ")}
    >
      {props.variant === "home" && <SuperMenuHomeBody />}
      {props.variant === "editor" && (
        <SuperMenuEditorBody
          invoice={props.invoice}
          onInvoiceChange={props.onInvoiceChange}
        />
      )}
      {props.variant === "settings" && <SuperMenuSettingsBody />}
    </motion.div>
  );
}
