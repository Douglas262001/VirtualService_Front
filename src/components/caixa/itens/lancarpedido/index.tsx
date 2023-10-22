import GenericTable from "@components/base/GenericTable";
import GenericWindow from "@components/base/GenericWindow";
import SearchField from "@components/base/SearchField";
import api from "@utils/api";
import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProdutoServicoEtapaItem = {
  id?: number;
  nome: string;
  valorUn: number;
};

const LancarPedidoWindow = ({ isOpen, setIsOpen }: Props) => {
  const [produtosServicos, setProdutosServicos] = useState<
    ProdutoServicoEtapaItem[]
  >([]);
  const [produtoServico, setProdutoServico] = useState<ProdutoServicoEtapaItem>(
    {
      nome: "",
      valorUn: 0,
    }
  );

  useEffect(() => {
    listarProdutosTipoEtapaItem();
  }, []);

  const listarProdutosTipoEtapaItem = async () => {
    try {
      const response = await api.get("ProdutoServico/Listar");

      setProdutosServicos(response.data.body);
    } catch (error: any) {
      console.log(error.response.data.reasonPhrase);
    }
  };

const   handleClickAdicionar = () => {
  
}

  return (
    <GenericWindow title="Lançar pedido" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <span className="label-text">Comanda</span>
            <SearchField
              value={produtoServico}
              setValue={setProdutoServico}
              data={produtosServicos}
              displayValue="nome"
              valueField="id"
              optionsHeight="120"
            />
          </div>
          <button onClick={handleClickAdicionar} type="button" className="btn btn-info mt-5">
            Adicionar
            <Plus className="ml-3" />
          </button>
        </div>
        <GenericTable />
      </form>
    </GenericWindow>
  );
};

export default LancarPedidoWindow;
