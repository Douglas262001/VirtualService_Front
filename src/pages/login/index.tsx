import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import Logo from "@components/base/Logo";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@hooks/auth";
import "./index.modules.css";
import { Toaster, toast } from "sonner";
import ButtonSubmitLogin from "@components/base/ButtonSubmitLogin";
import * as React from "react";

type LoginFormType = {
  email: string;
  password: string;
};

const formSchema = yup.object({
  email: yup.string().required("Você precisa informar seu email"),
  password: yup.string().required("Você precisa informar sua senha"),
});

// Adicionei validacao, com o errors.objeto.message tem a mensagem de erro do yup, da pra fazer uma label
function Login() {
  const { signIn } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: import.meta.env.DEV
      ? {
        email: "teste@gmail.com.br",
        password: "senha123",
      }
      : {},
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data);
    } catch (error) {
      toast.error("Email e/ou senha icorretos.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="grid place-items-center h-screen background-login">
        <div className="card w-[500px] bg-neutral shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control card-background">
              <div className="card-body">
                <div className="flex justify-center h-[10rem] w-full">
                  <Logo />
                </div>

                <input
                  type="email"
                  placeholder="E-mail"
                  required
                  className="input input-bordered w-full mb-4"
                  {...register("email")}
                />
                {/* mostrar aqui o erro */}
                <p>{errors.email?.message}</p>

                <div className="flex">
                  <input
                    type={passwordShown ? "text" : "password"}
                    placeholder="Senha"
                    required
                    className="input input-bordered w-full"
                    {...register("password")}
                  />
                  {passwordShown ? (
                    <Eye
                      className="ml-2 mt-2 cursor-pointer"
                      size={32}
                      onClick={() => setPasswordShown(false)}
                    />
                  ) : (
                    <EyeSlash
                      className="ml-2 mt-2 cursor-pointer"
                      size={32}
                      onClick={() => setPasswordShown(true)}
                    />
                  )}
                </div>

                <div className="card-actions justify-center">
                  <ButtonSubmitLogin isLoading = {isLoading} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
