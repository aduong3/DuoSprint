import { useNavigate, useParams } from "react-router-dom";
import { disconnectSocket } from "../services/apiSockets";

export default function SprintRoom() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectSocket();
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex flex-col">
      <span>SprintRoom {roomId}</span>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
}
