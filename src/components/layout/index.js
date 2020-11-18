import { useContext } from "react";
import styled from "styled-components";

import SidebarLink from "../sidebarLink";
import { Context } from "../../context/storage";

const Layout = ({ history, children }) => {
  const context = useContext(Context);

  const { username } = context.user.details;
  const { logout } = context;

  const onLogout = () => {
    const confirm = window.confirm(`Apakah ${username} ingin keluar?`);
    return confirm && logout(history);
  };

  return (
    <LayoutContainer>
      <div className="layout-sidebar">
        <div className="layout-sidebar-logo">
          <h1>HealthyLenial</h1>
        </div>
        <div className="layout-sidebar-link">
          <SidebarLink username={username} />
        </div>
        <div className="layout-sidebar-logout">
          <p onClick={onLogout}>Logout</p>
        </div>
      </div>
      <div className="layout-main">{children}</div>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  background: white;

  .layout-sidebar {
    height: 100vh;
    background: #8abf9c;

    width: 18vw;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
  }
  .layout-sidebar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }
  .layout-sidebar-logo h1 {
    font-size: 26px;
    color: white;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }

  .layout-sidebar-logout {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  .layout-sidebar-logout p {
    background: #025930;
    padding: 10px 2rem;
    cursor: pointer;
  }

  .layout-main {
    flex: 1;
    margin: 0 1rem;
    padding-top: 10px;
  }
`;

export default Layout;
