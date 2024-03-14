import styled from "styled-components";
import logo from "../images/logo.png";

const Logotipo = () => {
  return (
    <div className="title">
      <img src={logo} alt="Petcket" className="logo" />
      <h3>Petcket</h3>
    </div>
  );
}

// const Container = styled.div`
//   .title {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   .logo {
//     width: 42px;
//     height: 42px;
//     margin-right: 8px;
//   }
// `;

export default Logotipo;