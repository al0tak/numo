import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { EditorPreview } from "@/components/Editor";

import { SuperMenuEditorTextArea } from "./SuperMenuEditorTextArea";

interface SuperMenuEditorBodyProps {
  editorText: string;
  onEditorTextChange: (value: string) => void;
}

export function SuperMenuEditorBody({
  editorText,
  onEditorTextChange,
}: SuperMenuEditorBodyProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate({ to: "/" })}
            className="
              -ml-0.5 cursor-pointer text-book-muted transition-colors
              hover:text-book-foreground
            "
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-lg font-semibold tracking-tight">numo</span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2">
          <SuperMenuEditorTextArea
            value={editorText}
            onChange={onEditorTextChange}
          />
        </div>
      </div>

      <div className="w-px shrink-0 self-stretch bg-book-border" />

      <div className="relative flex-1">
        <EditorPreview text={editorText} />
      </div>
    </>
  );
}
