import { Link } from "react-router-dom";
import SidebarData from "./SidebarData";
import { ArrowLeft, ArrowRight, SignOut } from "phosphor-react";
import { useState } from "react";
import classNames from "classnames";
import Logo from "../base/Logo";
import useAuth from "@hooks/auth";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { signOut } = useAuth();
  const collapseSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogOut = async () => {
    signOut();
  };

  return (
    <aside
      className={classNames(
        "min-h-[calc(100vh-5.7rem)] text-[#303030] min-w-min text-center transition-[width] duration-300 ease-in bg-gradient-to-b from-[#fec80a] to-[#d4a90b] w-[20%] m-2 rounded-md p-5 ",
        {
          "w-[5%]": isCollapsed,
        }
      )}
    >
      {!isCollapsed ? (
        <section>
          <ArrowLeft
            className="cursor-pointer rounded-md hover:bg-white/30 backdrop-blur-sm p-2"
            onClick={collapseSidebar}
            size={40}
          />
          <span className="h-[20px]">
            <Logo />
          </span>
        </section>
      ) : (
        <ArrowRight
          className="m-auto cursor-pointer rounded-md hover:bg-white/30 backdrop-blur-sm p-2"
          onClick={collapseSidebar}
          size={40}
        />
      )}
      <div
        className={classNames("flex justify-between flex-col", {
          "h-[calc(100vh-5.7rem)]": isCollapsed,
          "h-[calc(100vh-17.5rem)]": !isCollapsed,
        })}
      >
        <ul className="text-lg">
          {SidebarData.map((item) => {
            return (
              <li
                className="p-5 rounded-md hover:bg-white/30 backdrop-blur-sm transition ease-in-out duration-300"
                key={item.id}
              >
                <Link
                  data-tip={isCollapsed ? item.description : ""}
                  className={classNames("flex text-center", {
                    "tooltip tooltip-right": isCollapsed,
                  })}
                  to={item.path}
                >
                  <span className="sm:justify-around">
                    {<item.icon size={32} />}
                  </span>
                  <section
                    className={classNames("ml-5", {
                      hidden: isCollapsed,
                    })}
                  >
                    {item.description}
                  </section>
                </Link>
              </li>
            );
          })}
        </ul>
        <button onClick={handleLogOut} className="btn">
          <span
            className={classNames("mr-2", {
              hidden: isCollapsed,
            })}
          >
            Sair
          </span>
          <SignOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
