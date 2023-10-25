import * as React from "react";
import CardComanda from "./CardComanda";
import { ComandasAbertas } from "types/Caixa";
import { useEffect } from "react";
import { toast } from "sonner";
import api from "@utils/api";
import GenericLoading from "@components/base/GenericLoading";
import { useRegister } from "context/register/RegisterContext";

const ComandaList: React.FC = () => {
  const {
    codigoComanda,
    setCodigoComanda,
    setNumeroComanda,
    refetchComandas,
    setRefetchComandas
  } = useRegister();
  const [comandasAbertas, setComandasAbertas] = React.useState<
    ComandasAbertas[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    listarComandasAbertas();
  }, []);

  useEffect(() => {
    if (!refetchComandas) return;
    listarComandasAbertas();
    setRefetchComandas(false);
  }, [refetchComandas]);

  const listarComandasAbertas = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("Caixa/ListarComandasAbertas");

      setComandasAbertas(response.data.body);

      if (
        !response.data.body.some(
          (p: { id: number; numero: string }) => p.id === codigoComanda
        )
      ) {
        setCodigoComanda(0);
        setNumeroComanda(0);
      }
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
