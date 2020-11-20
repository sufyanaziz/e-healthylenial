import styled from "styled-components";
import { NavLink } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const SidebarLink = ({ username }) => {
  return (
    <SidebarContainer>
      <NavLink className="link" to="/" exact>
        <HomeIcon className="icon" />
        <p>Home</p>
      </NavLink>
      <NavLink className="link" to="/list" exact>
        <ListAltIcon className="icon" />
        <p>List</p>
      </NavLink>
      <NavLink className="link" to="/report" exact>
        <HistoryIcon className="icon" />
        <p>Report</p>
      </NavLink>
      <NavLink className="link" to={`/u/${username}`} exact>
        <AccountCircleIcon className="icon" />
        <p>Profile</p>
      </NavLink>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  a {
    text-decoration: none;
    color: white;
  }

  .link {
    width: 100%;
    background: #025930;
    padding: 1.6rem 20px;
    display: flex;
    align-items: center;
    border-left: 6px solid transparent;
    margin-bottom: 2px;
  }
  .link.active {
    background: #025930;
    border-left: 6px solid white;
  }
  .link:hover {
    border-left: 6px solid white;
    transition: all 0.5s ease-in;
  }
  .icon {
    color: white;
    margin-right: 10px;
  }
`;

export default SidebarLink;
