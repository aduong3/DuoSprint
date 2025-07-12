import { useNavigate, useParams } from "react-router-dom";
import { disconnectSocket } from "../services/apiSockets";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export default function SprintRoom() {
  const [code, setCode] = useState("// Start Coding Now!");
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnectSocket();
    navigate("/dashboard", { replace: true });
  };

  const handleCodeChange = (newValue: string | undefined) => {
    if (newValue === undefined) return;
    setCode(newValue);

    //socket.emit changes to the roomId with codes
  };

  useEffect(() => {
    //socket.on code change, get incoming code and call it to setCode

    return () => {
      //socket.off code chagne
    };
  });

  return (
    <div className="flex flex-col h-svh">
      <div className="flex gap-12">
        <span>SprintRoom {roomId}</span>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>

      <Editor
        language="javascript"
        theme="vs-dark"
        width="50vw"
        height="70vh"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
}
