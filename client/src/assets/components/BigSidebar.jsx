import Wrapper from "../wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logotipo from "./Logotipo/Logotipo";
import { useDashboardContext } from "../../pages/DashboardLayout";

const BigSideBar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          {/* <header>
            <Logotipo />
          </header> */}
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
