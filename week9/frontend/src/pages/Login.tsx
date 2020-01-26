import * as React from "react";
import api from "../services/api";
import { History, LocationState } from "history";

export interface IProp {
  history?: History<LocationState>;
}

const Login: React.FC<IProp> = ({ history }) => {
  const [email, setEmail] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await api.post("/sessions", {
      email
    });

    const { _id } = response.data;

    localStorage.setItem("user", _id);

    history.push("/dash");
  }

  return (
    <>
      <p>
        Lorem <strong>spots</strong> ipsum dolor sit amet consectetur
        adipisicing elit molestias perspiciatis.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor e-mail"
          onChange={e => setEmail(e.target.value)}
        />

        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
};

export default Login;
