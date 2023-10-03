import { useMutation } from "@tanstack/react-query";
import enviroment from "../environments/enviroment";
import api from "@utils/api";

type user = {
  id: number;
  name: string;
  lastname: string;
  permission: number;
  email: string;
};

const usePostUser = (user: user) => {
  return useMutation(postUser(user), {
    onSuccess: () => {},
  });
};

const postUser = (user: user) => {
  return () =>
    api
      .post(`${enviroment.railway}adm/new_user/`, user)
      .then(({ data }) => data);
};

export default usePostUser;
