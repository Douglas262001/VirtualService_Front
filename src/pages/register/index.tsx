import ComandaList from "@components/caixa/ComandaList";
import { ResgisterContextProvider } from "context/register/RegisterContext";

const Register = () => {
  return (
    <ResgisterContextProvider>
      <div className="w-full inline-block">
        <div className="bg-[#3d3d3d] w-[50%] h-[97.5vh] rounded-md py-5">
          <ComandaList />
        </div>
        <div className="bg-[yellow]"></div>
      </div>
    </ResgisterContextProvider>
  );
};

export default Register;
