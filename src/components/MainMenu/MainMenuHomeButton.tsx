interface MainMenuHomeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function MainMenuHomeButton({ icon, label, onClick }: MainMenuHomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex aspect-square flex-1 cursor-pointer flex-col items-center
        justify-center gap-2 rounded-sm bg-black/5 p-3 text-foreground
        transition-colors
        hover:bg-black/10
      "
    >
      {icon}
      <span className="text-center text-xs/tight font-medium">{label}</span>
    </button>
  );
}
