import { useTranslation } from "@/i18n";

interface SuperMenuEditorTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export function SuperMenuEditorTextArea({ value, onChange }: SuperMenuEditorTextAreaProps) {
  const { t } = useTranslation();

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground">{t.editor.bodyLabel}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.editor.bodyPlaceholder}
        rows={8}
        className="
          w-full resize-y rounded-md border border-input bg-background px-3 py-2
          text-sm shadow-sm outline-none
          placeholder:text-muted-foreground
          focus-visible:ring-2 focus-visible:ring-ring
        "
      />
    </label>
  );
}
