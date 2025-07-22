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
    <div className="grid grid-rows-[5vh_70vh_25vh]">
      <div className="flex gap-12 py-2 px-3">
        <span className="text-xl">SprintRoom {roomId}</span>
        <button onClick={handleDisconnect} className="bg-red-500 py-1 px-2">
          Disconnect
        </button>
      </div>

      <div>
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
      <div>
        <h1>Chatroom area</h1>
      </div>
    </div>
  );
}
