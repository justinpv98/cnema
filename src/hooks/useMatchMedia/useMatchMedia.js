import { useState, useLayoutEffect } from "react";

function useMatchMedia(query) {
  const [matches, setMatches] = useState(true);
  useLayoutEffect(() => {
    // Checks if media matches query argument
    const media = window.matchMedia(query);

    function mediaMatchListener() {
      setMatches(media.matches);
    }

    mediaMatchListener();

    window.addEventListener("resize", mediaMatchListener);

    // Removes event listener on unmount to cleanup event listeners
    return () => window.removeEventListener("resize", mediaMatchListener);
  }, [query]);

  // Returns if it matches
  return matches;
}

export default useMatchMedia;