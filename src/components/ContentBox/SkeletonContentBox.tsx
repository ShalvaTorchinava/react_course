import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const SkeletonBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 90vh;
`;

const SkeletonContentBox = () => {
  return (
    <SkeletonBox>
      <CircularProgress size={400} sx={{ color: 'grey.500' }}/>
    </SkeletonBox>
  );
};

export default SkeletonContentBox;