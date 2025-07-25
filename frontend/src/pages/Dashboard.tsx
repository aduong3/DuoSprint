import { useEffect, useState } from "react";
import { connectSocket, joinQueue, socket } from "../services/apiSockets";
import { useUserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

// const availableStacks = ["React", "Angular", "Vue"];

export default function Dashboard() {
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [techStack, setTechStack] = useState<"react" | "angular" | "vue">(
    "react"
  );

  const { user } = useUserContext();

  const { userId, username } = user!;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillLevel || !techStack) return;

    // console.log(userId, skillLevel, techStack, username);
    connectSocket();
    joinQueue({ userId, username, skillLevel, techStack });
  };

  // maybe better to somehow emit the tech stack so that we can load it into the editor. ----------------------------
  useEffect(() => {
    socket.on("match_found", ({ newRoomId, partner }) => {
      //console.log("Matched with", partner);
      navigate(`/room/${techStack}/${newRoomId}`);
    });

    return () => {
      socket.off("match_found");
    };
  });

  return (
    <div className="flex flex-col gap-3">
      <span>Dashboard</span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Skill Level:
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </label>

        <label>
          Tech Stack
          {/* {availableStacks.map((stack) => (
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
        ))} */}
          <select
            value={techStack}
            onChange={(e) =>
              setTechStack(e.target.value as "react" | "angular" | "vue")
            }
          >
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="vue">Vue</option>
          </select>
        </label>

        <button>Start Sprint</button>
      </form>
    </div>
  );
}
