import { useLocation } from "@tanstack/react-router";
import { useState } from "react";

import { SuperMenu, type SuperMenuVariant } from "../components/SuperMenu";

function variantFromPath(pathname: string): SuperMenuVariant {
  if (pathname.startsWith("/invoices/new")) return "editor";
  if (pathname.startsWith("/settings")) return "settings";
  return "home";
}

export function RootLayout() {
  const location = useLocation();
  const variant = variantFromPath(location.pathname);
  const [editorText, setEditorText] = useState("");

  return (
    <div className="
      flex h-screen items-center justify-center overflow-hidden bg-background
      p-4
    ">
      <SuperMenu
        variant={variant}
        editorText={editorText}
        onEditorTextChange={setEditorText}
      />
    </div>
  );
}
