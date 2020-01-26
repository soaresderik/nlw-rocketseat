import * as React from "react";

import camera from "../assets/camera.svg";
import "./Create.css";

import api from "../services/api";
import { IProp } from "./Login";

const Create: React.FC<IProp> = ({ history }) => {
  const [company, setCompany] = React.useState("");
  const [techs, setTechs] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState(null);

  const preview = React.useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();
    const userId = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    const response = await api.post("/spots", data, {
      headers: {
        user_id: userId
      }
    });

    history.push("/dash");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumb" : ""}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        type="text"
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">
        TECNOLOGIAS * <span>(separadas por vírgulas)</span>
      </label>
      <input
        type="text"
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="company">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        id="techs"
        placeholder="Valor cobrado por dia?"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
};

export default Create;
