import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";


export const StyledFilterOpen = styled.button`
  border: unset;
  padding: 0px;
  background-color: unset;
  cursor: pointer;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#333333",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    '@media (max-width: 630px)': {width: '90%'}
  };

  export const StyledFilterBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Styledlabel = styled.label`
  font-size: 20px;
  color: #fff;
`;

export const StyledFilterButtons = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 20px;
`;