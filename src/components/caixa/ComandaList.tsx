import * as React from "react";
import CardComanda from "./CardComanda";
import { ComandasAbertas } from "types/Caixa";
import { useEffect } from "react";
import { toast } from "sonner";
import api from "@utils/api";
import GenericLoading from "@components/base/GenericLoading";

const ComandaList: React.FC = () => {
  const [comandasAbertas, setComandasAbertas] = React.useState<
    ComandasAbertas[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    listarComandasAbertas();
  }, []);

  const listarComandasAbertas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("Caixa/ListarComandasAbertas");

      setComandasAbertas(response.data.body);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <GenericLoading />;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5 justify-center px-8 ">
      {comandasAbertas?.map((item) => (
        <CardComanda key={item.id} id={item.id} numero={item.numero} />
      ))}
    </div>
  );
};

export default ComandaList;
