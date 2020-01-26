import * as React from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import * as socketio from "socket.io-client";
import "./Dash.css";

const Dash: React.FC = () => {
  const [spots, setSpots] = React.useState([]);
  const [requests, setRequests] = React.useState([]);

  const userId = localStorage.getItem("user");
  const socket = React.useMemo(
    () =>
      socketio("http://localhost:3000", {
        query: {
          user_id: userId
        }
      }),
    [userId]
  );

  React.useEffect(() => {
    socket.on("booking_request", (data: any) => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  React.useEffect(() => {
    async function loadSpots() {
      // tslint:disable-next-line: variable-name
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAccept(id: string) {
    await api.post(`/bookings/${id}/approvals`);

    setRequests(requests.filter(r => r._id !== id));
  }

  async function handleReject(id: string) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(r => r._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(req => (
          <li key={req._id}>
            <p>
              <strong>{req.user.email}</strong> está solicitando uma reserva em{" "}
              <strong>{req.spot.company}</strong> para a data:{" "}
              <strong>{req.date}</strong>
              <button className="accept" onClick={() => handleAccept(req._id)}>
                ACEITAR
              </button>
              <button className="reject" onClick={() => handleReject(req._id)}>
                REJEITAR
              </button>
            </p>
          </li>
        ))}
      </ul>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>{" "}
      </Link>
    </>
  );
};

export default Dash;
