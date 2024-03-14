import { Link } from "react-router-dom";
import styled from "styled-components";


const Register = () => {
  return (
    <Wrapper>
      <h1> Register Page </h1>
      <Link to="/login"> Login Page</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
h1{
}
`;

export default Register