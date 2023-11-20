import styled from "styled-components";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

const StyledErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: #fff;
  font-size: 60px;
  margin-top: 100px;
`;

const Error = () => {
  return (
    <StyledErrorBox>
      <p>Server crashed :( </p>
      <SyncProblemIcon sx={{ fontSize: "150px" }} />
    </StyledErrorBox>
  );
};

export default Error;
