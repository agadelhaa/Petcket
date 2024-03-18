import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logotipo } from "../assets/components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../assets/components";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logotipo />
        <h4>Acesse sua conta aqui:</h4>
        <FormRow type="email" name="email" defaultValue="amanda@teste.com" />
        <FormRow
          type="password"
          name="password"
          defaultValue="123456"
          labelText="senha"
        />
        <button type="submit" className="btn"> Entre </button>
        <p>
          Ainda não tem uma conta?
          <Link to="/register"> Sign up</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;