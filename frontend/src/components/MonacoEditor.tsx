import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { socket } from "../services/apiSockets";
import { useEffect, useRef, useState } from "react";

export default function MonacoEditor({ roomId }) {
  const [localCode, setLocalCode] = useState(`export default function App() {
  return <h1>Hello world</h1>
}`);
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const isRemoteChange = useRef(false);

  const handleCodeChange = (value) => {
    // if (isRemoteChange.current) {
    //   isRemoteChange.current = false;
    //   return;
    // }
    if (value === undefined || value === null) return;
    updateCode(value);
    setLocalCode(value);
    socket.emit("code_change", { roomId, code: value });
  };

  useEffect(() => {
    socket.on("code_change", (newCode) => {
      console.log(newCode);
      isRemoteChange.current = true;
      updateCode(newCode);
      setLocalCode(newCode);
    });

    return () => {
      socket.off("code_change");
    };
  }, []);

  return (
    <SandpackStack>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          theme="vs-dark"
          language="javascript"
          // key={sandpack.activeFile}
          value={localCode}
          // onChange={(value) => updateCode(value || "")}
          onChange={handleCodeChange}
        />
      </div>
    </SandpackStack>
  );
}
