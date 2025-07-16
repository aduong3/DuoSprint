import { useNavigate, useParams } from "react-router-dom";
import { disconnectSocket, socket } from "../services/apiSockets";
import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { SandpackFileExplorer } from "sandpack-file-explorer";

import { useEffect, useState } from "react";
import MonacoEditor from "../components/MonacoEditor";

export default function SprintRoom() {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const [explorerRefreshKey, setExplorerRefreshKey] = useState(0);

  const handleDisconnect = () => {
    disconnectSocket();
    navigate("/dashboard", { replace: true });
  };

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, [roomId]);

  return (
    <div className="flex flex-col h-svh">
      <div className="flex gap-12">
        <span className="text-xl">SprintRoom {roomId}</span>
        <button onClick={handleDisconnect} className="bg-red-500 py-1 px-2">
          Disconnect
        </button>
      </div>

      <SandpackProvider template="react" theme="dark">
        <SandpackLayout>
          <SandpackFileExplorer key={explorerRefreshKey} />

          <MonacoEditor
            roomId={roomId}
            setExplorerRefreshKey={setExplorerRefreshKey}
          />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
