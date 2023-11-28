import { Box, LinearProgress } from "@mui/material";
import { StyledLoader, StyledLoaderText } from "./Loader.styled";
import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return Math.min(oldProgress + 18, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledLoader>
      <StyledLoaderText>Gacheflix</StyledLoaderText>
      <Box sx={{ width: "497px" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </StyledLoader>
  );
};

export default Loader;
