import { CircleNotch, SignIn } from "phosphor-react";
import * as React from "react";

type ButtonSubmitLoginProps = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  text?: string;
};

const ButtonSubmitLogin = ({ isLoading, text,  ...props }: ButtonSubmitLoginProps) => {
  return (
    <button className="btn btn-success" {...props}>
      {text ?? "Entrar"}
      {isLoading ? (
        <div className={`animate-spin h-[${20}px] w-[${20}px] m-0`}>
          <CircleNotch size={20} />
        </div>
      ) : (
        <SignIn size={20} className="ml-2" />
      )}
    </button>
  );
};

export default ButtonSubmitLogin;
