import { useState } from "react";
import { joinQueue } from "../services/apiSockets";
import { useUserContext } from "../../contexts/userContext";

const availableStacks = ["React", "Angular", "Vue"];

export default function Dashboard() {
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [techStack, setTechStack] = useState<string[]>([]);

  const { user } = useUserContext();

  if (!user) return <div>Loading...</div>;

  const { userId, username } = user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinQueue({ userId, username, skillLevel, techStack });
  };

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
          <>
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
          </>
        ))}

        <button>Start Sprint</button>
      </form>
    </div>
  );
}
