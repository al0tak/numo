interface HomeMenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const HomeMenuButton = ({ icon, label, onClick }: HomeMenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        flex aspect-square flex-1 cursor-pointer flex-col items-center
        justify-center gap-2 rounded-sm bg-foreground/5 p-3 text-foreground
        transition-colors
        hover:bg-foreground/10
      "
    >
      {icon}
      <span className="text-center text-xs/tight font-medium">{label}</span>
    </button>
  );
};
