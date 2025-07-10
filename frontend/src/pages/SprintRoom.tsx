import { useParams } from "react-router-dom";

export default function SprintRoom() {
  const { id: roomId } = useParams();
  return <div>SprintRoom {roomId}</div>;
}
