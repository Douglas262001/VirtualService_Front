import { Eye, EyeSlash, SignIn } from "phosphor-react";
import { useState } from "react";
import Logo from "@components/base/Logo";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@hooks/auth";

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

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      // tratar aqui o erro retornado da api
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="card w-[500px] bg-neutral shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
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
                <button className="btn btn-success">
                  Entrar &nbsp;&nbsp;
                  <SignIn size={20} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
