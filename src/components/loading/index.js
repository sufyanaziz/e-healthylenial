import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const Loading = ({ width, height, iconSize, color, type }) => {
  return (
    <LoadingContainer width={width} height={height} color={color}>
      {type === "linear" ? (
        <BorderLinearProgress className="loading-icon" size={iconSize} />
      ) : (
        <CircularProgress className="loading-icon" size={iconSize} />
      )}
    </LoadingContainer>
  );
};

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 8,
    borderRadius: 4,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 4,
    backgroundColor: "var(--mainGreen)",
  },
}))(LinearProgress);

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => (props.width ? props.width : "auto")};
  height: ${props => (props.height ? props.height : "auto")};

  .loading-icon {
    color: ${props => (props.color ? props.color : "var(--mainGreen)")};
    width: 100%;
  }
`;

export default Loading;
