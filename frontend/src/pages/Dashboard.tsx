import { useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  joinQueue,
  socket,
} from "../services/apiSockets";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const availableStacks = ["React", "Angular", "Vue"];

export default function Dashboard() {
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [techStack, setTechStack] = useState<string[]>([]);

  const { user } = useUserContext();

  const { userId, username } = user!;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connectSocket();
    joinQueue({ userId, username, skillLevel, techStack });
  };

  useEffect(() => {
    socket.on("match_found", ({ newRoomId, partner }) => {
      console.log("Matched with", partner);
      navigate(`/room/${newRoomId}`);
    });

    return () => {
      socket.off("match_found");
    };
  });

  return (
    <div className="flex flex-col gap-3">
      <span>Dashboard</span>
      <form onSubmit={handleSubmit}>
        <label>Skill Level:</label>
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>

        <label>Tech Stack</label>
        {availableStacks.map((stack) => (
          <div key={stack}>
            <label>{stack}</label>
            <input
              type="checkbox"
              value={stack}
              checked={techStack.includes(stack)}
              onChange={(e) =>
                setTechStack((prev) =>
                  e.target.checked
                    ? [...prev, stack]
                    : prev.filter((s) => s !== stack)
                )
              }
            />
          </div>
        ))}

        <button>Start Sprint</button>
      </form>
      <button onClick={disconnectSocket}>Disconnect</button>
    </div>
  );
}
