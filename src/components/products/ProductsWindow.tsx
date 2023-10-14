import ButtonCancel from "@components/base/ButtonCancel";
import ButtonSave from "@components/base/ButtonSave";
import GenericWindow from "@components/base/GenericWindow";
import React from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductsTab } from "./productstab";
import { Tab } from "@headlessui/react";
import {
  EnumMedidaTempoPreparo,
  EnumTipoProdutoServico,
  ProdutoType,
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

const formSchema = yup.object({
  nome: yup.string().required("Você precisa informar o campo nome"),
});

const ProductsWindow = ({
  isOpen,
  setIsOpen,
  codigoProduto,
  setCodigoProduto,
}: IProductsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: yupResolver(formSchema),
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

  React.useEffect(() => {
    buscarEtapas();
  }, []);

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

  const mutationCreate = useMutation(
    (s: ProdutoType) => api.post(`ProdutoServico/Inserir`, s),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getProducts"]);
        setIsOpen(false);
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
        reset({
          nome: "",
          descricao: "",
        });
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
  };

  return (
    <GenericWindow isOpen={isOpen} setIsOpen={setIsOpen} title="Produtos">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <div className="w-full h-full flex flex-col">
            <ProductsTab.Root>
              <Tab.Panel>
                <ProductsTab.General
                  register={register}
                  tipoProduto={tipoProduto}
                  setTipoProduto={setTipoProduto}
                  medidaTempoPreparo={medidaTempoPreparo}
                  setMedidaTempoPreparo={setMedidaTempoPreparo}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ProductsTab.Steps
                  etapasSelecionadas={etapasSelecionadas}
                  setEtapasSelecionadas={setEtapasSelecionadas}
                  etapa={etapa}
                  setEtapa={setEtapa}
                  etapas={etapas}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ProductsTab.Image
                  setBase64Image={setBase64Image}
                  base64Image={base64Image}
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
    </GenericWindow>
  );
};

export default ProductsWindow;
