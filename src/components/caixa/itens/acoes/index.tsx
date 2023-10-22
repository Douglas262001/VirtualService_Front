import { useRegister } from "context/register/RegisterContext";
import { Divide, Plus } from "phosphor-react";
import Swal from "sweetalert2";

const AcoesItens = () => {
  const { caixaGeral, calcular } = useRegister();

  const handleDivide = () => async () => {
    Swal.fire({
      title: "Dividir para quantas pessoas?",
      input: "number",
      background: "#333",
      color: "#cccccc",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Dividir",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ef4444",
      confirmButtonColor: "#84cc16",
      showLoaderOnConfirm: true,
      preConfirm: (pessoas) => {
        return calcular({
          ...caixaGeral,
          dividirEmQuantasPessoas: Number(pessoas),
        })
          .then((response: any) => {
            if (!response.success) {
              throw new Error(response.reasonPhrase);
            }
            return response;
          })
          .catch((error: any) => {
            Swal.showValidationMessage(`Algo deu errado: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        debugger;
        Swal.fire({
          title: `${result.value.body.valorTotalReceberPorPessoa.toLocaleString(
            "pt-br",
            {
              style: "currency",
              currency: "BRL",
            }
          )}`,
          text: "Valor por pessoa",
          showCancelButton: true,
          color: "#cccccc",
          background: "#333",
          cancelButtonColor: "#ef4444",
          confirmButtonColor: "#84cc16",
          cancelButtonText: "Cancelar",
          confirmButtonText: "Receber e finalizar",
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById('receber-e-finalizar')?.click()
          }
        });
      }
    });
  };

  return (
    <div className="w-full bg-zinc-700 rounded-md mt-2 flex p-3 gap-2 justify-between items-center py-5	">
      <div className="flex gap-2">
        <button
          onClick={handleDivide()}
          className="btn btn-info font-semibold text-zinc-900 text-base"
        >
          Dividir
          <Divide size={24} />
        </button>
        <button onClick={handleDivide()} className="btn btn-primary text-base">
          Item não cadastrado <Plus size={24} />
        </button>
      </div>
      <span className="text-4xl mx-10 font-semibold">
        {" "}
        R${caixaGeral?.valorTotalReceber}
      </span>
    </div>
  );
};

export default AcoesItens;
