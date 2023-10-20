import ComandaList from "@components/caixa/ComandaList";
import ItensContainer from "@components/caixa/itens";
import ComandasHeader from "@components/caixa/itens/ComandasHeader";
import { ResgisterContextProvider } from "context/register/RegisterContext";

const Register = () => {
  return (
    <ResgisterContextProvider>
      <div className="w-full flex gap-2">
        <div className="bg-[#3d3d3d] w-[50%] h-[97.5vh] rounded-md py-5 overflow-y-scroll">
          <ComandasHeader />
          <ComandaList />
        </div>
        <ItensContainer />
      </div>
    </ResgisterContextProvider>
  );
};

export default Register;
