import styled from "styled-components";
import logo from "../../images/logo.png";
import Container from "./LogotipoStyle";

const Logotipo = () => {
  return (
    <Container>
    <div className="title">
      <img src={logo} alt="Petcket" className="logo" />
      <h3>Petcket</h3>
    </div>
    </Container>
  );
}


export default Logotipo;