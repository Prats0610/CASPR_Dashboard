import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ThemeSync() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
