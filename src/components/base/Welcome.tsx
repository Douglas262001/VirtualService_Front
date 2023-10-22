import { DeviceTabletCamera } from "phosphor-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex justify-between">
      <h1
        className="mb-4 text-3xl font-extrabold text-white-900 dark:text-white md:text-3xl lg:text-3xl"
        style={{ margin: "0px 0px 10px 20px" }}
      >
        Bem vindo ao
        <span
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#fec80a] to-[#d4a90b]"
          style={{ margin: "0px 10px 0px 15px" }}
        >
          Yellow Software!
        </span>{" "}
      </h1>
      <Link to="/tablets">
        <button className="btn btn-primary mr-8">
          Versão tablets <DeviceTabletCamera className="ml-3" size={24} />
        </button>
      </Link>
    </div>
  );
};
export default Welcome;
