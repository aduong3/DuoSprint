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
import Chatbox from "../components/Chatbox";

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
    <div className="grid grid-rows-[70vh_30vh] bg-zinc-800">
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
      <div className="flex gap-12">
        <div className="flex flex-col  px-3 py-2">
          <span className="text-xl text-white">SprintRoom {roomId}</span>
          <button
            onClick={handleDisconnect}
            className="bg-red-600 text-white py-1 px-2"
          >
            Disconnect
          </button>
        </div>
        <Chatbox />
      </div>
    </div>
  );
}
