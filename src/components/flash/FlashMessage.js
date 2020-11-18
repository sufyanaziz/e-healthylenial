import styled from "styled-components";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";

const FlashMessage = ({ message, status, onClick }) => {
  return (
    <FlashMessageContainer status={status}>
      {status === "success" && <CheckBoxIcon className="icon-success" />}
      {status === "not-success" && <CancelIcon className="icon-notsuccess" />}
      <h6 className="msg">{message}</h6>
      <CloseIcon className="icon-close" onClick={onClick} />
    </FlashMessageContainer>
  );
};

const FlashMessageContainer = styled.div`
  background: ${props => (props.status === "success" ? "#025930" : "#E01933")};
  width: 100%;
  padding: 5px 10px;
  text-align: left;
  display: flex;
  align-items: center;

  .icon-success {
    color: white;
    margin-right: 10px;
  }
  .icon-notsuccess {
    color: white;
    margin-right: 10px;
  }
  .icon-close {
    color: white;
    margin-left: auto;
    font-size: 16px;
    cursor: pointer;
  }
  .msg {
    color: white;
    font-size: 15px;
    font-weight: 400;
  }
`;

export default FlashMessage;
