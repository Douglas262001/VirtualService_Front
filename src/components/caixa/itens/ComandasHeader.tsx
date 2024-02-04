import { SubtractSquare } from "@phosphor-icons/react";
import LancarPedidoWindow from "./lancarpedido";
import { useState } from "react";
import { Bell, ArrowsClockwise } from "phosphor-react";
import GroupTagWindow from "./agruparcomandas";
import { useRegister } from "context/register/RegisterContext";
import SearchField from "@components/base/SearchField";
import { QuartoMesaFilterCaixaType } from "types/QuartoMesa";
import * as React from "react";
import { toast } from "sonner";
import api from "@utils/api";

const ComandasHeader = () => {
  const [isLancarPedidoOpen, setIsLancarPedidoOpen] = useState(false);
  const [isGroupTagOpen, setIsGroupTagOpen] = useState(false);
  const {setRefetchComandas } = useRegister();
  const {setFilterNumeroComandaPorQuartoMesa } = useRegister();
  const handleClickLancarPedido = () => {
    setIsLancarPedidoOpen(true);
  };

  const handleClickAgruparComandas = () => {
    setIsGroupTagOpen(true);
  };

  
  const [quartosMesas, setQuartosMesas] = React.useState<QuartoMesaFilterCaixaType[]>([]);
  const [quartoMesa, setQuartoMesa] = React.useState<QuartoMesaFilterCaixaType>({
    id: 0,
    numero: "Selecionar todas deploy as mesas",    
  });

  const listarquartosMesasServicos = async () => {
    try {
      const response = await api.get("QuartoMesa/Listar");

      let intArray: QuartoMesaFilterCaixaType[] = response.data.body.map((p: QuartoMesaFilterCaixaType) => (
        {
          id: p.id,
          numero: p.numero,
        }));

        intArray.unshift({id: 0, numero: "Selecionar todas as mesas"});

      setQuartosMesas(intArray);
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const handleClickRefresh = () => {
    setFilterNumeroComandaPorQuartoMesa(quartoMesa?.id?.toString() ?? "0")
    setRefetchComandas(true);
  };

  return (
    <div className="h-16 bg-[#27272a] mb-5 ml-8 mr-12 rounded-md flex justify-right items-center p-4">
      <h2 className="text-2xl"></h2>
      <div className="flex gap-2">

        <button onClick={listarquartosMesasServicos}> 
          <SearchField
              data={quartosMesas}
              value={quartoMesa}
              setValue={setQuartoMesa}
              displayValue="numero"
              valueField="id"
              optionsHeight="200"
              disabled={!true}
            />
        </button>
        <button onClick={handleClickRefresh} className="btn btn-info h-3 w-[6vh]">
          <ArrowsClockwise size={24} />
        </button>
        <button onClick={handleClickAgruparComandas} className="btn btn-info h-3 w-[20vh]">
          Agrupar comandas <SubtractSquare size={24} />
        </button>
          <GroupTagWindow
           isOpen={isGroupTagOpen}
           setIsOpen={setIsGroupTagOpen}
          />
        <button onClick={handleClickLancarPedido} className="btn btn-info h-3 w-[16vh]">
          Lançar pedido <Bell size={24} />
        </button>
        <LancarPedidoWindow
          isOpen={isLancarPedidoOpen}
          setIsOpen={setIsLancarPedidoOpen}
        />
      </div>
    </div>
  );
};

export default ComandasHeader;
