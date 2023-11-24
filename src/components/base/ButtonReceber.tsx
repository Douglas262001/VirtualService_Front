import { Cardholder, CircleNotch } from "phosphor-react";
import * as React from "react";

type ButtonSaveProps = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  text?: string;
};

const ButtonReceber = ({ isLoading, text, ...props }: ButtonSaveProps) => {
  return (
    <button
      className="btn-receber btn btn-success w-1/2 h-12 px-6 text-zinc-900 transition-colors duration-150 bg-lime-400 rounded-lg focus:shadow-outline hover:bg-lime-600 text-2xl font-semibold my-5 ml-[50%]
    xl:h-10 xl:px-1 xl:p-1 xl:text-lg xl:font-bold xl:my-3"
      {...props}
    >
      {text ?? "Receber e finalizar"}
      {isLoading ? (
        <div className={`animate-spin h-[${20}px] w-[${20}px] m-0`}>
          <CircleNotch size={20} />
        </div>
      ) : (
        <Cardholder size={20} className="ml-2" />
      )}
    </button>
  );
};

export default ButtonReceber;
