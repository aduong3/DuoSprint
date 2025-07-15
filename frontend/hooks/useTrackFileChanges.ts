import { useEffect, useRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

export function useTrackFileChanges(onFileChange) {
  const { sandpack } = useSandpack();
  const previousFilesRef = useRef(sandpack.files);

  useEffect(() => {
    const previousFiles = previousFilesRef.current;
    const currentFiles = sandpack.files;

    const prevKeys = Object.keys(previousFiles);
    const currKeys = Object.keys(currentFiles);

    const added = currKeys.filter((key) => !prevKeys.includes(key));
    const removed = prevKeys.filter((key) => !currKeys.includes(key));

    if (added.length || removed.length) {
      onFileChange({ added, removed });
    }

    previousFilesRef.current = currentFiles;
  }, [sandpack.files, onFileChange]);
}
