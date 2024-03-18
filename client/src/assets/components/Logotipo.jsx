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
// .title {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-bottom: 12px;
//   }
//   .logo {
//     width: 50px;
//     height: 50px;
//     margin-right: 8px;
//   }
//   h3 {
//     color: #ff9f1c;
//   }
// `;

export default Logotipo;