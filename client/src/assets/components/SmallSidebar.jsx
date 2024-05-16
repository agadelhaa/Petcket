import Wrapper from "../wrappers/SmallSidebar";
import { useDashboardContext } from "../../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import Logotipo from "./Logotipo/Logotipo";
import links from "../../utils/links";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const SmallSideBar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logotipo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
