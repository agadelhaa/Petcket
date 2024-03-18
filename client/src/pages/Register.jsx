import { Link } from "react-router-dom";
import styled from "styled-components";
import { Logotipo } from "../assets/components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../assets/components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logotipo />
        <h4>Registre-se aqui:</h4>
        <FormRow
          type="text"
          name="name"
          defaultValue="Amanda"
          labelText="nome"
        />
        <FormRow
          type="text"
          name="lastName"
          defaultValue="G Amorim"
          labelText="sobrenome"
        />
        <FormRow
          type="email"
          name="email"
          defaultValue="amanda@teste.com"
          labelText="email"
        />
        <FormRow
          type="password"
          name="password"
          labelText="senha"
          defaultValue="123456"
        />
        <button type="submit" className="btn">
          Registrar
        </button>
        <p>
          Já tem uma conta?
          <Link to="/login"> Sign in</Link>
        </p>
      </form>
    </Wrapper>
  );
};

// const Container = styled.div`

// `;

export default Register;
