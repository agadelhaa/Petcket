import { Link, Form, redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { Logotipo } from "../assets/components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../assets/components";
import customFetch from "../utils/customFetch";
import {toast} from 'react-toastify';

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('auth/login', data)
    toast.success('Login feito com sucesso')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error;
  }
}

const Login = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logotipo />
        <h4>Acesse sua conta:</h4>
        <FormRow type="email" name="email" />
        <FormRow
          type="password"
          name="password"
          labelText="senha"
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Enviando" : "Enviar"}{" "}
        </button>
        <p>
          Esqueceu sua senha?
          <Link to="/request-password-reset"> Redefinir senha</Link>
        </p>
        <p>
          Ainda não tem uma conta?
          <Link to="/register"> Registre-se</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;