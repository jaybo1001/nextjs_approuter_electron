import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('n-dark')}>N-Dark</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  );
}