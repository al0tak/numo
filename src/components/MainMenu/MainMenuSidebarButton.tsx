interface MainMenuSidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}

export function MainMenuSidebarButton({ icon, label, onClick, active }: MainMenuSidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer w-full text-left",
        active
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-accent hover:text-accent-foreground",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}
