import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { ProductsTab } from "./productstab";
import { Tab } from "@headlessui/react";
import {
  EnumMedidaTempoPreparo,
  EnumTipoProdutoServico,
  EtapaProdutoType,
  ProdutoType,
  TipoProduto,
} from "types/Produto";
import { useMutation } from "@tanstack/react-query";
import api from "@utils/api";
import { queryClient } from "@utils/queryClient";
import { toast } from "sonner";
import { EnumType, getArray } from "@utils/enums";
import { Etapa, EtapaSearch } from "types/Etapa";

interface IProductsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  codigoProduto?: number;
  setCodigoProduto?: React.Dispatch<number>;
}

export type ProductFormType = {
  id?: number;
  nome: string;
  descricao?: string;
  valor?: number;
  serveQuantasPessoas?: number;
  tempoPreparo?: number;
};

const ProductsWindow = ({
  isOpen,
  setIsOpen,
  codigoProduto,
  setCodigoProduto,
}: IProductsProps) => {
  const methods = useForm<ProductFormType>({
    defaultValues: import.meta.env.DEV
      ? {
          nome: "",
          valor: 0,
        }
      : {},
  });

  const [base64Image, setBase64Image] = React.useState<string>("");
  const [tipoProduto, setTipoProduto] = React.useState<EnumType>(
    getArray(EnumTipoProdutoServico)[0]
  );
  const [medidaTempoPreparo, setMedidaTempoPreparo] = React.useState<EnumType>(
    getArray(EnumMedidaTempoPreparo)[0]
  );

  const [etapa, setEtapa] = React.useState<EtapaSearch>({
    id: 0,
    nome: "",
  });

  const [etapas, setEtapas] = React.useState<EtapaSearch[]>([]);

  const [etapasSelecionadas, setEtapasSelecionadas] = React.useState<
    EtapaSearch[]
  >([]);

  const [isTipoProdutoProduto, setIsTipoProdutoProduto] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    buscarEtapas();
  }, []);

  React.useEffect(() => {
    if (!codigoProduto) return;

    buscarProdutoPorId(codigoProduto);
  }, [codigoProduto]);

  React.useEffect(() => {
    setIsTipoProdutoProduto(tipoProduto.identificador === TipoProduto.Produto);
  }, [tipoProduto]);

  React.useEffect(() => {
    if (isTipoProdutoProduto) return;

    methods.reset({
      serveQuantasPessoas: 0,
      tempoPreparo: 0,
      descricao: "",
    });
    setEtapasSelecionadas([]);
    setBase64Image("");
  }, [isTipoProdutoProduto]);

  const buscarEtapas = async () => {
    try {
      const response = await api.get(`Etapa/Listar`);

      setEtapas(
        response.data.body.map((e: Etapa) => ({ id: e.id, nome: e.nome }))
      );
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const buscarProdutoPorId = async (codigoProduto: number) => {
    try {
      const response = await api.get(`ProdutoServico/Buscar/${codigoProduto}`);

      const produto = response.data.body;
      methods.setValue("nome", produto.nome);
      methods.setValue("descricao", produto.descricao);
      methods.setValue("valor", produto.valor);
      methods.setValue("serveQuantasPessoas", produto.serveQuantasPessoas);
      methods.setValue("tempoPreparo", produto.tempoPreparo);
      setTipoProduto(
        getArray(EnumTipoProdutoServico).find(
          (t) => t.identificador === produto.tipo
        )!
      );
      setMedidaTempoPreparo(
        getArray(EnumMedidaTempoPreparo).find(
          (t) => t.identificador === produto.medidaTempoPreparo
        )!
      );

      // const base64ByUrl = await toDataUrl(produto.urlImagem);

      setBase64Image(produto.urlImagem);

      if (produto.etapas.length > 0) {
        setEtapasSelecionadas(
          produto.etapas.map((e: EtapaProdutoType) => ({
            id: e.etapa.id,
            nome: e.etapa.nome,
          }))
        );
      }
    } catch (error: any) {
      toast.error(error.response.data.reasonPhrase);
    }
  };

  const mutationCreate = useMutation(
    (s: ProdutoType) => api.post(`ProdutoServico/Inserir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getProducts"]);
        setIsOpen(false);
        limparCampos();
        toast.success("Produto cadastrado com sucesso!");
      },
      onError: (error: any) => {
        toast.error(error.response.data.reasonPhrase);
      },
    }
  );

  const mutationUpdate = useMutation(
    (s: ProdutoType) => {
      return api.post(`ProdutoServico/Salvar`, s);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getProducts"]);
        setIsOpen(false);
        toast.success("Produto alterado com sucesso!");
        limparCampos();
      },
    }
  );

  const onSubmit: SubmitHandler<ProductFormType> = async (data) => {
    const product: ProdutoType = {
      id: codigoProduto,
      tipo: tipoProduto.identificador,
      serveQuantasPessoas: data.serveQuantasPessoas
        ? Number(data.serveQuantasPessoas)
        : 0,
      tempoPreparo: data.tempoPreparo ? Number(data.tempoPreparo) : 0,
      medidaTempoPreparo: medidaTempoPreparo.identificador,
      valor: data.valor ? Number(data.valor) : 0,
      nome: data.nome,
      descricao: data.descricao,
      base64Image: base64Image,
      codigosEtapas: etapasSelecionadas.map((e) => e.id),
    };

    if (data.id) {
      mutationUpdate.mutate(product);
      return;
    }

    mutationCreate.mutate(product);
  };

  const handleClickCancelar = () => {
    setIsOpen(false);
    limparCampos();
  };

  const limparCampos = () => {
    methods.reset({
      nome: "",
      descricao: "",
      valor: 0,
      tempoPreparo: 0,
      serveQuantasPessoas: 0,
    });
    setBase64Image("");
    setTipoProduto(getArray(EnumTipoProdutoServico)[0]);
    setMedidaTempoPreparo(getArray(EnumMedidaTempoPreparo)[0]);
    setEtapasSelecionadas([]);
    setEtapa({ id: 0, nome: "" });
    setCodigoProduto && setCodigoProduto(0);
  };

  return (
    <GenericWindow isOpen={isOpen} setIsOpen={setIsOpen} title="Produtos">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="form-control">
            <div className="w-full h-full flex flex-col">
              <ProductsTab.Root>
                <Tab.Panel>
                  <ProductsTab.General
                    tipoProduto={tipoProduto}
                    setTipoProduto={setTipoProduto}
                    medidaTempoPreparo={medidaTempoPreparo}
                    setMedidaTempoPreparo={setMedidaTempoPreparo}
                    isTipoProdutoProduto={isTipoProdutoProduto}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <ProductsTab.Steps
                    etapasSelecionadas={etapasSelecionadas}
                    setEtapasSelecionadas={setEtapasSelecionadas}
                    etapa={etapa}
                    setEtapa={setEtapa}
                    etapas={etapas}
                    isTipoProdutoProduto={isTipoProdutoProduto}
                  />
                </Tab.Panel>
                <Tab.Panel>
                  <ProductsTab.Image
                    setBase64Image={setBase64Image}
                    base64Image={base64Image}
                    isTipoProdutoProduto={isTipoProdutoProduto}
                  />
                </Tab.Panel>
              </ProductsTab.Root>
            </div>
            <div className="modal-action">
              <ButtonCancel type="button" onClick={handleClickCancelar} />
              <ButtonSave type="submit" />
            </div>
          </div>
        </form>
      </FormProvider>
    </GenericWindow>
  );
};

export default ProductsWindow;
