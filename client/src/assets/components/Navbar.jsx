import Wrapper from "../wrappers/Navbar"
import { FaAlignLeft } from "react-icons/fa";
import Logotipo from "./Logotipo";
import { useDashboardContext } from "../../pages/DashboardLayout";

const Navbar = () => {
  const {toggleSidebar} = useDashboardContext()
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
          toggle DM/ logout
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar