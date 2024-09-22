import { useEffect } from "react";

function useAutosizeInput(ref, value) {
  useEffect(() => {
    if (ref) {
      ref.style.height = "0px"; // Reset height to calculate scrollHeight
      const scrollHeight = ref.scrollHeight; // Get the content height
      ref.style.height = `${scrollHeight}px`; // Set height dynamically
    }
  }, [ref, value]); // Trigger on ref or value change
}

export default useAutosizeInput;
