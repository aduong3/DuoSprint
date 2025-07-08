import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const roomId = "1d23-4b36-as2f";
  return (
    <div className="flex flex-col gap-3">
      <span>Dashboard</span>
      <Link to={`/room/${roomId}`}>Start Sprint</Link>
    </div>
  );
}
