interface SuperMenuHomeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function SuperMenuHomeButton({ icon, label, onClick }: SuperMenuHomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex w-full cursor-pointer items-center gap-3 rounded-md border
        border-book-border/30 bg-book-foreground/5 px-4 py-3
        text-book-foreground transition-colors
        hover:bg-book-foreground/10
      "
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
