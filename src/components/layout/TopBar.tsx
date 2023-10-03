import { Moon, Sun } from "phosphor-react";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

const themesStructure: { [key: string]: any } = {
  light: {
    label: "light",
    icon: <Sun size={20} />,
  },
  dark: {
    label: "dark",
    icon: <Moon size={20} />,
  },
};

const TopBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "dark");

  useEffect(() => {
    themeChange(false);
  }, []);

  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <div className="m-2 flex justify-end">
      <button
        className="btn btn-circle"
        data-set-theme={nextTheme}
        onClick={() => setTheme(nextTheme)}
      >
        {themesStructure[nextTheme].icon}
      </button>
    </div>
  );
};

export default TopBar;
