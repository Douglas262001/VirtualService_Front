import Welcome from "@components/base/Welcome";
import GraphicChart from "@components/graphicchart/GraphicChart";
import DateNow from "@components/analytics/DateNow";
import FilterGraphic from "@components/graphicchart/FilterGraphic";
import { Link } from "react-router-dom";
import { DeviceTabletCamera } from "phosphor-react";

const Analytics = () => {
  return (
    <>
      <Welcome />
      <div className="w-[300px] inline-block">
        <DateNow />
        <FilterGraphic />
      </div>
      <br></br>
      <br></br>
      <Link to="/tablets">
        <button className="btn btn-primary ml-5">
          Visualizar pedidos versão tablets <DeviceTabletCamera className="ml-3" size={24} />
        </button>
      </Link>
      <GraphicChart />
    </>
  );
};

export default Analytics;
