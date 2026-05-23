interface MainMenuHomeButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function MainMenuHomeButton({ icon, label, onClick }: MainMenuHomeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center gap-2 aspect-square rounded-sm bg-black/5 hover:bg-black/10 transition-colors cursor-pointer p-3 text-foreground"
    >
      {icon}
      <span className="text-xs font-medium leading-tight text-center">{label}</span>
    </button>
  );
}
