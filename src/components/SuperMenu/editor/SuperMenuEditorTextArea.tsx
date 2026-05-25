import { useTranslation } from "@/i18n";

interface SuperMenuEditorTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export function SuperMenuEditorTextArea({ value, onChange }: SuperMenuEditorTextAreaProps) {
  const { t } = useTranslation();

  return (
    <label className="flex min-h-0 flex-1 flex-col gap-1.5">
      <span className="text-xs text-book-muted">{t.editor.bodyLabel}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.editor.bodyPlaceholder}
        className="
          size-full min-h-0 flex-1 resize-none rounded-md border
          border-book-border/40 bg-book-foreground/5 px-3 py-2 text-sm
          text-book-foreground outline-none
          placeholder:text-book-muted
          focus-visible:ring-2 focus-visible:ring-book-border/60
        "
      />
    </label>
  );
}
