import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { Logotipo } from "../assets/components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../assets/components";
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/register', data)
    toast.success('Usuário registrado com sucesso')
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Register = () => {
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post'className="form">
        <Logotipo />
        <h4>Crie sua conta:</h4>
        <FormRow
          type="text"
          name="name"
          labelText="nome"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="sobrenome"
        />
        <FormRow
          type="email"
          name="email"
          labelText="email"
        />
        <FormRow
          type="password"
          name="password"
          labelText="senha"
        />
        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
        <p>
          Já tem uma conta?
          <Link to="/login"> Entre </Link>
        </p>
      </Form>
    </Wrapper>
  );
};


export default Register;
