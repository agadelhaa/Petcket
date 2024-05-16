import Wrapper from "../wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logotipo from "./Logotipo/Logotipo.jsx";
import { useDashboardContext } from "../../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="logo-text">
          <Logotipo />
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
