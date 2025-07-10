import { useState } from "react";

const availableStacks = ["React", "Angular", "Vue"];

export default function Dashboard() {
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [techStack, setTechStack] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
