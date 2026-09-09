import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "@/hooks/useTheme";

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: typeof Sun;
}

const options: readonly ThemeOption[] = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "Use system theme", icon: Monitor },
  { value: "dark", label: "Dark theme", icon: Moon },
];

export function ThemeToggle(): JSX.Element {
  const { preference, setPreference } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex rounded-full border border-line bg-panel/75 p-1"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={preference === value}
          title={label}
          onClick={() => setPreference(value)}
          className={[
            "grid h-10 w-10 place-items-center rounded-full transition-colors",
            preference === value
              ? "bg-ink text-page shadow-sm"
              : "text-muted hover:bg-ink/5 hover:text-ink",
          ].join(" ")}
        >
          <Icon size={16} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}