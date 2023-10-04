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
  debugger
  const [theme, setTheme] = useState(localStorage.setItem("theme", "dark"));

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="m-2 flex justify-end">

    </div>
  );
};

export default TopBar;
