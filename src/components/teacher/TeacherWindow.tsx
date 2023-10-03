import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "@utils/queryClient";

import enviroment from "../../environments/enviroment";
import GenericWindow from "../base/GenericWindow";
import api from "@utils/api";

type teacher = {
  name: string;
  lastname: string;
  email: string;
  permission: number;
  password: string;
};

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
};

const TeacherWindow = ({ isOpen, setIsOpen }: Props) => {
  const [teacher, setTeacher] = useState<teacher>({
    name: "",
    lastname: "",
    email: "",
    permission: 2,
    password: "",
  });

  const [isStudent, setIsStudent] = useState<boolean>(false);

  const mutation = useMutation(
    (t: teacher) => api.post(`${enviroment.railway}adm/new_user/`, t),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["getTeachers"], { type: "all" });
        setIsOpen(false);
      },
    }
  );

  const handleChangeTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;

    setTeacher({
      ...teacher,
      [name]: e.target.value,
    });
  };

  const handleSaveTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ ...teacher, permission: isStudent ? 4 : 2 });
  };

  return (
    <GenericWindow title="Professor" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSaveTeacher}>
        <div className="form-control">
          <div className="w-ful flex flex-col">
            <span className="label-text">Nome</span>
            <input
              type="text"
              name="name"
              value={teacher.name}
              placeholder="Escreva aqui"
              onChange={handleChangeTeacher}
              required
              className="input input-bordered w-full mb-4"
            />
            <span className="label-text">Sobrenome</span>
            <input
              type="text"
              name="lastname"
              value={teacher.lastname}
              placeholder="Escreva aqui"
              onChange={handleChangeTeacher}
              required
              className="input input-bordered w-full mb-4"
            />

            <span className="label-text">E-mail</span>
            <input
              type="email"
              name="email"
              value={teacher.email}
              placeholder="Escreva aqui"
              onChange={handleChangeTeacher}
              required
              className="input input-bordered w-full mb-4"
            />
            <span className="label-text">Senha</span>
            <input
              type="text"
              name="password"
              value={teacher.password}
              placeholder="Escreva aqui"
              onChange={handleChangeTeacher}
              required
              className="input input-bordered  w-full mb-4"
            />
            <span className="label-text">Também é aluno?</span>
            <input
              type="checkbox"
              checked={isStudent}
              onChange={() => setIsStudent(!isStudent)}
              className="checkbox"
            />
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
          </div>
        </div>
      </form>
    </GenericWindow>
  );
};

export default TeacherWindow;
