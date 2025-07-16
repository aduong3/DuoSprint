import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { socket } from "../services/apiSockets";
import { useEffect, useRef } from "react";
import { useTrackFileChanges } from "../../hooks/useTrackFileChanges";

export default function MonacoEditor({ roomId, setExplorerRefreshKey }) {
  const { code, updateCode } = useActiveCode();

  const { sandpack } = useSandpack();

  const isRemoteChange = useRef(false);

  useTrackFileChanges(({ added, removed }) => {
    if (added.length) {
      added.forEach((filename) => {
        if (
          filename.toLowerCase().includes("untitled") ||
          filename.toLowerCase().includes("file name") ||
          filename === "/addFile"
        ) {
          return;
        }
        socket.emit("new_file", {
          roomId,
          filename,
          content: sandpack.files[filename].code,
        });
      });
    }

    if (removed.length) {
      removed.forEach((filename) => {
        socket.emit("deleted_file", { roomId, filename });
      });
    }
  });

  const handleCodeChange = (value) => {
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      return;
    }
    if (value === undefined || value === null) return;
    updateCode(value);
    socket.emit("code_change", {
      roomId,
      filename: sandpack.activeFile,
      code: value,
    });
  };

  useEffect(() => {
    socket.on("code_change", ({ filename, code: newCode }) => {
      isRemoteChange.current = true;
      // updateCode(newCode);
      sandpack.updateFile(filename, newCode);
    });

    socket.on("new_file", ({ filename, content }) => {
      if (!sandpack.files[filename]) {
        sandpack.updateFile(filename, content); // or use addFile if available
        // sandpack.addFile(filename, { code: content });
        sandpack.setActiveFile(filename);
        setExplorerRefreshKey((v) => v + 1);
      }
    });

    return () => {
      socket.off("code_change");
      socket.off("new_file");
    };
  }, [sandpack, setExplorerRefreshKey]);

  return (
    <SandpackStack>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          language="javascript"
          key={sandpack.activeFile}
          value={code}
          onChange={handleCodeChange}
        />
      </div>
    </SandpackStack>
  );
}
