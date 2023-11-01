import WarningIcon from "@mui/icons-material/Warning";
import styled from "styled-components";

const StyledNotFound = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
`



const NotFound = () => {
  return (
      <StyledNotFound>
        <WarningIcon sx={{fontSize: 250, color: '#fff'}}/>
        <p style={{fontSize: 50, textTransform: "uppercase", fontWeight: 'bold', color: "#fff"}}>Page not found</p>
      </StyledNotFound>
  );
};

export default NotFound;
